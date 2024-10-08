import immutableUpdate from "immutability-helper";
import nullthrows from "nullthrows";
import type { ReadonlyDeep } from "type-fest";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";

export function markFieldsNonNull(
  typeInfo: ReadonlyDeep<LeetCodeGraphQLType>,
  fieldNames: readonly string[],
): ReadonlyDeep<LeetCodeGraphQLType> {
  return immutableUpdate(typeInfo, {
    fields: {
      $apply: (fields: ReadonlyDeep<LeetCodeGraphQLType>["fields"]) => {
        const remainingFieldNames = new Set(fieldNames);

        return nullthrows(fields).map((field) => {
          if (!remainingFieldNames.has(field.name)) {
            return field;
          }

          remainingFieldNames.delete(field.name);

          if (field.type.kind === "NON_NULL") {
            console.error(
              `${typeInfo.name}.${field.name} is already non-null!`,
            );
            return field;
          }

          return immutableUpdate(field, {
            type: { $set: { kind: "NON_NULL", ofType: field.type } },
          });
        });
      },
    },
  });
}
