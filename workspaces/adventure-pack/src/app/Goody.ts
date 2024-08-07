import type { JavaGoody } from "./zod-types/javaGoodyZodType";
import type { JavaScriptGoody } from "./zod-types/javaScriptGoodyZodType";
import type { KotlinGoody } from "./zod-types/kotlinGoodyZodType";
import type { Python3Goody } from "./zod-types/python3GoodyZodType";
import type { TypeScriptGoody } from "./zod-types/typeScriptGoodyZodType";

export type Goody =
  | JavaGoody
  | JavaScriptGoody
  | KotlinGoody
  | Python3Goody
  | TypeScriptGoody;
