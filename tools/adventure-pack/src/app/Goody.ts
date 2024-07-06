import type { JavaGoody } from "./parsers/javaGoodyParser";
import type { JavaScriptGoody } from "./parsers/javaScriptGoodyParser";
import type { Python3Goody } from "./parsers/python3GoodyParser";
import type { TypeScriptGoody } from "./parsers/typeScriptGoodyParser";

export type Goody =
  | JavaGoody
  | JavaScriptGoody
  | Python3Goody
  | TypeScriptGoody;
