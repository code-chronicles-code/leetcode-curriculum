import { z } from "zod";

import { fetchGraphQL } from "./fetchGraphQL.generated.ts";

// TODO: see if there are any fun GraphQL ESLint plugins

const communitySolutionTopicZodType = z.object({
  title: z.string().trim(),
  solutionTags: z.array(
    z.object({ slug: z.string() }).transform(({ slug }) => slug),
  ),
  post: z.object({ content: z.string() }).transform(({ content }) => content),
});

export type CommunitySolutionTopic = z.infer<
  typeof communitySolutionTopicZodType
>;

export async function fetchCommunitySolutionTopic(
  topicId: string,
): Promise<CommunitySolutionTopic> {
  const { topic } = await fetchGraphQL({
    // TODO: don't lie about the type
    topicId: topicId as unknown as number,
  });

  return communitySolutionTopicZodType.parse(topic);
}
