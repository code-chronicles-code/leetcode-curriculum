import { z } from "zod";

import { fetchGraphQL } from "./fetchGraphQL.generated.ts";

// TODO: see if there are any fun GraphQL ESLint plugins

const communitySolutionTopicZodType = z
  .object({
    topic: z.object({
      title: z.string().trim(),
      solutionTags: z.array(
        z.object({ slug: z.string() }).transform(({ slug }) => slug),
      ),
      post: z
        .object({ content: z.string() })
        .transform(({ content }) => content),
    }),
  })
  .transform((data) => data.topic);

export type CommunitySolutionTopic = z.infer<
  typeof communitySolutionTopicZodType
>;

export async function fetchCommunitySolutionTopic(
  topicId: string,
): Promise<CommunitySolutionTopic> {
  // TODO: don't lie about the type
  const data = await fetchGraphQL({ topicId: topicId as unknown as number });

  return communitySolutionTopicZodType.parse(data);
}
