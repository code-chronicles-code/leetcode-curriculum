// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import { z } from "zod";

import { getGraphQLClient } from "../../getGraphQLClient.ts";
import type {
  QuestionListQuery as OriginalQueryResult,
  QuestionListQueryVariables as OriginalQueryVariables,
} from "./queryTypes.generated.ts";

export const QUERY =
  "query($categorySlug:String!,$limit:Int,$skip:Int,$filters:QuestionListFilterInput!){questionList(categorySlug:$categorySlug limit:$limit skip:$skip filters:$filters){data{acRate adminUrl allowDiscuss article articleTopicId boundTopicId canSeeQuestion categoryTitle challengeQuestion{__typename}challengeQuestionsV2{__typename}codeDefinition codeSnippets{__typename}companyTags{__typename}companyTagStats companyTagStatsV2 content contributors{__typename}dataSchemas difficulty discussionCount dislikes enableDebugger enableRunCode enableSubmit enableTestMode envInfo exampleTestcaseList exampleTestcases freqBar frequency frontendPreviews hasFrontendPreview hasSolution hasVideoSolution hide hideLastTestcases{__typename}hints infoVerified interpretUrl isFavor isLiked isPaidOnly judgerAvailable judgeType langToValidPlayground libraryUrl likes metaData mysqlSchemas nextChallenges{__typename}note questionDetailUrl questionFrontendId questionId questionTitle questionTitleSlug questionType randomQuestionUrl sampleTestCase sessionId similarQuestions solution{__typename}solutionNum stats status submitUrl title titleSlug topicTags{__typename}translatedContent translatedTitle urlManager}totalNum}}";

export const queryResultZodType = z.object({
  questionList: z.object({
    totalNum: z.number(),
    data: z.array(
      z.object({
        acRate: z.number(),
        adminUrl: z.string().optional().nullable(),
        allowDiscuss: z.boolean(),
        article: z.string().optional().nullable(),
        articleTopicId: z.string().optional().nullable(),
        boundTopicId: z.number().optional().nullable(),
        canSeeQuestion: z.boolean(),
        categoryTitle: z.string(),
        codeDefinition: z.string().optional().nullable(),
        companyTagStats: z.string().optional().nullable(),
        companyTagStatsV2: z.string().optional().nullable(),
        content: z.string().optional().nullable(),
        dataSchemas: z.array(z.string().nullable()),
        difficulty: z.string(),
        discussionCount: z.number(),
        dislikes: z.number(),
        enableDebugger: z.boolean(),
        enableRunCode: z.boolean(),
        enableSubmit: z.boolean(),
        enableTestMode: z.boolean(),
        envInfo: z.string(),
        exampleTestcaseList: z.array(z.string().nullable()),
        exampleTestcases: z.string(),
        freqBar: z.number().optional().nullable(),
        frequency: z.number(),
        frontendPreviews: z.string().optional().nullable(),
        hasFrontendPreview: z.boolean(),
        hasSolution: z.boolean(),
        hasVideoSolution: z.boolean(),
        hide: z.boolean(),
        hints: z.array(z.string().nullable()),
        infoVerified: z.boolean(),
        interpretUrl: z.string(),
        isFavor: z.boolean(),
        isLiked: z.boolean().optional().nullable(),
        isPaidOnly: z.boolean(),
        judgerAvailable: z.boolean(),
        judgeType: z.string(),
        langToValidPlayground: z.string().optional().nullable(),
        libraryUrl: z.string().optional().nullable(),
        likes: z.number(),
        metaData: z.string(),
        mysqlSchemas: z.array(z.string().nullable()),
        note: z.string().optional().nullable(),
        questionDetailUrl: z.string(),
        questionFrontendId: z.string(),
        questionId: z.string(),
        questionTitle: z.string(),
        questionTitleSlug: z.string(),
        questionType: z.string(),
        randomQuestionUrl: z.string(),
        sampleTestCase: z.string(),
        sessionId: z.string(),
        similarQuestions: z.string(),
        solutionNum: z.number(),
        stats: z.string(),
        status: z.string(),
        submitUrl: z.string(),
        title: z.string(),
        titleSlug: z.string(),
        translatedContent: z.string().optional().nullable(),
        translatedTitle: z.string().optional().nullable(),
        urlManager: z.string(),
        challengeQuestion: z
          .object({
            __typename: z.literal("ChallengeQuestionNode"),
          })
          .optional()
          .nullable(),
        challengeQuestionsV2: z.array(
          z.object({
            __typename: z.literal("ChallengeQuestionNode"),
          }),
        ),
        codeSnippets: z
          .array(
            z
              .object({
                __typename: z.literal("CodeSnippetNode"),
              })
              .nullable(),
          )
          .optional()
          .nullable(),
        companyTags: z
          .array(
            z.object({
              __typename: z.literal("CompanyTagNode"),
            }),
          )
          .optional()
          .nullable(),
        contributors: z.array(
          z
            .object({
              __typename: z.literal("ContributorNode"),
            })
            .nullable(),
        ),
        hideLastTestcases: z
          .object({
            __typename: z.literal("HideLastTestcasesNode"),
          })
          .optional()
          .nullable(),
        nextChallenges: z.array(
          z.object({
            __typename: z.literal("QuestionNode"),
          }),
        ),
        solution: z
          .object({
            __typename: z.literal("ArticleNode"),
          })
          .optional()
          .nullable(),
        topicTags: z.array(
          z.object({
            __typename: z.literal("TopicTagNode"),
          }),
        ),
      }),
    ),
  }),
});

export type QueryResult = z.infer<typeof queryResultZodType>;
export type QueryVariables = OriginalQueryVariables;

export async function fetchGraphQL(
  variables: QueryVariables,
): Promise<QueryResult> {
  const untrustedData = await getGraphQLClient().request(QUERY, variables);

  // The type annotation serves as a TypeScript assert that the generated
  // Zod type is compatible with the types generated by GraphQL Codegen.
  const validatedData: OriginalQueryResult =
    queryResultZodType.parse(untrustedData);

  return validatedData;
}
