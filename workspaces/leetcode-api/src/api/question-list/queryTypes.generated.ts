// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

import type * as Types from "../../graphqlTypes.generated.ts";

export type QuestionListQueryVariables = Types.Exact<{
  categorySlug: Types.Scalars["String"]["input"];
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  filters: Types.QuestionListFilterInput;
}>;

export type QuestionListQuery = {
  questionList: {
    totalNum: number;
    data: Array<{
      acRate: number;
      adminUrl?: string | null;
      allowDiscuss: boolean;
      article?: string | null;
      articleTopicId?: string | null;
      boundTopicId?: number | null;
      canSeeQuestion: boolean;
      categoryTitle: string;
      codeDefinition?: string | null;
      companyTagStats?: string | null;
      companyTagStatsV2?: string | null;
      content?: string | null;
      dataSchemas: Array<string | null>;
      difficulty: string;
      discussionCount: number;
      dislikes: number;
      enableDebugger: boolean;
      enableRunCode: boolean;
      enableSubmit: boolean;
      enableTestMode: boolean;
      envInfo: string;
      exampleTestcaseList: Array<string | null>;
      exampleTestcases: string;
      freqBar?: number | null;
      frequency: number;
      frontendPreviews?: string | null;
      hasFrontendPreview: boolean;
      hasSolution: boolean;
      hasVideoSolution: boolean;
      hide: boolean;
      hints: Array<string | null>;
      infoVerified: boolean;
      interpretUrl: string;
      isFavor: boolean;
      isLiked?: boolean | null;
      isPaidOnly: boolean;
      judgerAvailable: boolean;
      judgeType: string;
      langToValidPlayground?: string | null;
      libraryUrl?: string | null;
      likes: number;
      metaData: string;
      mysqlSchemas: Array<string | null>;
      note?: string | null;
      questionDetailUrl: string;
      questionFrontendId: string;
      questionId: string;
      questionTitle: string;
      questionTitleSlug: string;
      questionType: string;
      randomQuestionUrl: string;
      sampleTestCase: string;
      sessionId: string;
      similarQuestions: string;
      solutionNum: number;
      stats: string;
      status: string;
      submitUrl: string;
      title: string;
      titleSlug: string;
      translatedContent?: string | null;
      translatedTitle?: string | null;
      urlManager: string;
      challengeQuestion?: { __typename: "ChallengeQuestionNode" } | null;
      challengeQuestionsV2: Array<{ __typename: "ChallengeQuestionNode" }>;
      codeSnippets?: Array<{ __typename: "CodeSnippetNode" } | null> | null;
      companyTags?: Array<{ __typename: "CompanyTagNode" }> | null;
      contributors: Array<{ __typename: "ContributorNode" } | null>;
      hideLastTestcases?: { __typename: "HideLastTestcasesNode" } | null;
      nextChallenges: Array<{ __typename: "QuestionNode" }>;
      solution?: { __typename: "ArticleNode" } | null;
      topicTags: Array<{ __typename: "TopicTagNode" }>;
    }>;
  };
};
