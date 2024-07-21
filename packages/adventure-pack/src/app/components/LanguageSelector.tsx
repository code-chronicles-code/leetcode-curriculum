import React from "react";

import { LANGUAGE_NAMES } from "../constants";
import type { Language } from "../Language";

type Props = {
  selectedLanguage: Language;
  onChange: (language: Language) => void;
};

export function LanguageSelector({ selectedLanguage, onChange }: Props) {
  return (
    <select
      value={selectedLanguage}
      onChange={(ev) => onChange(ev.target.value as Language)}
    >
      {(Object.entries(LANGUAGE_NAMES) as [Language, string][]).map(
        ([language, languageName]) => (
          <option key={language} value={language}>
            {languageName}
          </option>
        ),
      )}
    </select>
  );
}
