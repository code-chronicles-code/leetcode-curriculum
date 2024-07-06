import immutableUpdate from "immutability-helper";
import React, { useReducer } from "react";

import type { GoodiesByLanguage } from "./fetchGoodies";
import type { Language } from "./Language";

type Action =
  | {
      type: "load-goodies-success";
      goodiesByLanguage: GoodiesByLanguage;
    }
  | {
      type: "load-goodies-error";
      error: Error;
    }
  | {
      type: "select-language";
      language: Language;
    }
  | {
      type: "equip-goody";
      name: string;
    }
  | {
      type: "unequip-goody";
      name: string;
    };

export type AppState = Readonly<{
  goodiesByLanguage: GoodiesByLanguage | null;
  goodiesByLanguageError: Error | null;

  equippedGoodiesByLanguage: Readonly<Record<Language, ReadonlySet<string>>>;

  activeLanguage: Language;
}>;

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "load-goodies-success": {
      return immutableUpdate(state, {
        goodiesByLanguage: { $set: action.goodiesByLanguage },
      });
    }
    case "load-goodies-error": {
      return immutableUpdate(state, {
        goodiesByLanguageError: { $set: action.error },
      });
    }
    case "select-language": {
      return immutableUpdate(state, {
        activeLanguage: { $set: action.language },
      });
    }
    case "equip-goody": {
      return immutableUpdate(state, {
        equippedGoodiesByLanguage: {
          [state.activeLanguage]: { $add: [action.name] },
        },
      });
    }
    case "unequip-goody": {
      return immutableUpdate(state, {
        equippedGoodiesByLanguage: {
          [state.activeLanguage]: { $remove: [action.name] },
        },
      });
    }
  }

  // @ts-expect-error Switch should be exhaustive.
  console.error("Unhandled action type:", action);
  // @ts-expect-error Switch should be exhaustive.
  return state;
}

export function useAppState(): [AppState, React.Dispatch<Action>] {
  return useReducer(
    reducer,
    undefined,
    (): AppState => ({
      goodiesByLanguage: null,
      goodiesByLanguageError: null,

      equippedGoodiesByLanguage: {
        java: new Set(),
        javascript: new Set(),
        python3: new Set(),
        typescript: new Set(),
      },

      activeLanguage: "typescript",
    }),
  );
}
