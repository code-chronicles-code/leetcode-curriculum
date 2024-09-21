import type { JavaGoody } from "./zod-types/javaGoodyZodType.ts";
import type { JavaScriptGoody } from "./zod-types/javaScriptGoodyZodType.ts";
import type { KotlinGoody } from "./zod-types/kotlinGoodyZodType.ts";
import type { Python3Goody } from "./zod-types/python3GoodyZodType.ts";
import type { TypeScriptGoody } from "./zod-types/typeScriptGoodyZodType.ts";

export type Goody =
  | JavaGoody
  | JavaScriptGoody
  | KotlinGoody
  | Python3Goody
  | TypeScriptGoody;
