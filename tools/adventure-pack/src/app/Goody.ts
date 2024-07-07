import type { JavaGoody } from "./parsers/javaGoodyParser";
import type { JavaScriptGoody } from "./parsers/javaScriptGoodyParser";
import type { KotlinGoody } from "./parsers/kotlinGoodyParser";
import type { Python3Goody } from "./parsers/python3GoodyParser";
import type { TypeScriptGoody } from "./parsers/typeScriptGoodyParser";

export type Goody =
  | JavaGoody
  | JavaScriptGoody
  | KotlinGoody
  | Python3Goody
  | TypeScriptGoody;
