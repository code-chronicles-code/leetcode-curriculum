import { isStringTitleCase } from "@code-chronicles/util/isStringTitleCase";
import { isStringUpperCase } from "@code-chronicles/util/isStringUpperCase";
import { isStringLowerCase } from "@code-chronicles/util/isStringLowerCase";

// Note: The order is significant, earlier entries will take precedence in our
// checks.
export const STRING_CASE_CHECKERS = [
  ["title", isStringTitleCase],
  ["upper", isStringUpperCase],
  ["lower", isStringLowerCase],
] as const;

export const PREFERRED_STRING_CASE = STRING_CASE_CHECKERS[0][0];
