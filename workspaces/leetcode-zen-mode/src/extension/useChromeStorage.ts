import immutableUpdate from "immutability-helper";
import { useSyncExternalStore } from "react";

import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";
import { getUniqueId } from "@code-chronicles/util/getUniqueId";

let storage: Record<string, unknown> | null = null;

async function readLatestStorageAndNotify(): Promise<void> {
  const chrome = getChrome();
  if (!chrome) {
    return;
  }

  storage = await chrome.storage.sync.get();
  notifySubscribers();
}

let promise: Promise<void> | null = null;

function getSnapshot(): Record<string, unknown> {
  if (!storage) {
    throw (promise ??= readLatestStorageAndNotify().finally(() => {
      promise = null;

      // We never clear the listener but that seems ok.
      getChrome()?.storage.sync.onChanged.addListener((changes) => {
        if (!storage) {
          // We weren't able to read the storage for some reason... let's try
          // again?
          readLatestStorageAndNotify();
          return;
        }

        // TODO: combine all the changes into one update
        for (const [key, change] of Object.entries(changes)) {
          if (Object.hasOwn(change, "newValue")) {
            storage = immutableUpdate(storage, {
              [key]: { $set: change.newValue },
            });
          } else {
            storage = immutableUpdate(storage, { $unset: [key] });
          }
        }

        notifySubscribers();
      });
    }));
  }

  return storage;
}

// TODO: use a proper event emitter
const subscribers = new Map<string, () => void>();

function subscribe(sub: () => void): () => void {
  const id = getUniqueId();
  subscribers.set(id, sub);
  return () => subscribers.delete(id);
}

function notifySubscribers(): void {
  for (const sub of subscribers.values()) {
    sub();
  }
}

// TODO: move this hook to the util package
export function useChromeStorage(): Record<string, unknown> {
  return useSyncExternalStore(subscribe, getSnapshot, () => ({}));
}
