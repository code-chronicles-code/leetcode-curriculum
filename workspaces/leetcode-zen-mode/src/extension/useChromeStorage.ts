import immutableUpdate from "immutability-helper";
import { useSyncExternalStore } from "react";

import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";
import { getUniqueId } from "@code-chronicles/util/getUniqueId";

let storage: Record<string, unknown> | null = null;

async function writeChanges(): Promise<void> {
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
    throw (promise ??= writeChanges().finally(() => {
      promise = null;

      // We never clear the listener but that seems ok.
      getChrome()?.storage.sync.onChanged.addListener((changes) => {
        if (!storage) {
          writeChanges();
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

export function useChromeStorage(): Record<string, unknown> {
  return useSyncExternalStore(subscribe, getSnapshot, () => ({}));
}
