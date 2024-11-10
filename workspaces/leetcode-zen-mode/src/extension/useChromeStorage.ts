import immutableUpdate from "immutability-helper";
import { useSyncExternalStore } from "react";

import { getUniqueId } from "@code-chronicles/util/getUniqueId";

import { getChrome } from "./getChrome.ts";

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
  console.log("subscribing " + id);
  subscribers.set(id, sub);
  return () => {
    subscribers.delete(id);
    console.log("unsubscribing " + id);
  };
}

function notifySubscribers(): void {
  console.log("notifying " + [...subscribers.keys()].join(", "));
  for (const sub of subscribers.values()) {
    sub();
  }
}

export function useChromeStorage(): Record<string, unknown> {
  return useSyncExternalStore(subscribe, getSnapshot, () => ({}));
}
