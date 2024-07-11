import type { Submission } from "@code-chronicles/leetcode-api";

import { sha512 } from "@code-chronicles/util";

export type TransformedSubmission = Omit<
  Submission,
  // Separate the code from the submission, since we're saving it in separate
  // files. We will instead include a hash of the code in the submission
  // object.
  | "code"

  // Stringifying the compare_result was taking up too much space so
  // representing it as a string of 0s and 1s instead of an array of
  // booleans. This is actually the same format that the API originally
  // returns.
  | "compare_result"

  // The time field is a relative time string, so it's not as useful
  // considering we also have an absolute timestamp field.
  | "time"
> & {
  // Transformed compare_result data as mentioned above.
  compare_result: string | null;

  // SHA-512 hash of the submission's code text.
  sha512: string;
};

export function transformSubmission({
  code,
  // eslint-disable-next-line camelcase
  compare_result,
  time: _,
  ...rest
}: Submission): {
  code: string;
  submission: TransformedSubmission;
} {
  return {
    code,
    submission: {
      ...rest,
      sha512: sha512(code),
      // eslint-disable-next-line camelcase
      compare_result: compare_result?.map(Number).join("") ?? null,
    },
  };
}
