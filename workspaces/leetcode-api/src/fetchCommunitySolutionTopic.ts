import { gql } from "graphql-request";
import { z } from "zod";

import { getGraphQLClient } from "./getGraphQLClient.ts";

// TODO: see if there are any fun GraphQL ESLint plugins

const QUERY = gql`
  query ($topicId: Int!) {
    topic(id: $topicId) {
      title
      solutionTags {
        slug
      }
      post {
        content
      }
    }
  }
`;

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
  const data = await getGraphQLClient().request(QUERY, { topicId });

  return communitySolutionTopicZodType.parse(data);
}
