import type {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
} from "graphql";

import { markFieldNonNull as markNonNull } from "./markFieldNonNull.ts";
import { addDirectiveToField as addDirective } from "./addDirectiveToField.ts";
import { addEnumDirectiveToField as addEnumDirective } from "./addEnumDirectiveToField.ts";

type SafeObjectMap<T> = Partial<Readonly<Record<string, NonNullable<T>>>>;

export const FIELD_MODIFICATIONS: SafeObjectMap<
  SafeObjectMap<
    ((
      fieldDef: FieldDefinitionNode,
      objectOrInterface: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
    ) => FieldDefinitionNode)[]
  >
> = {
  ChallengeQuestionNode: {
    type: [markNonNull],
  },
  PagifiedQuestionNode: {
    totalNum: [addDirective("nonnegative")],
  },
  Query: {
    activeDailyCodingChallengeQuestion: [markNonNull],
    questionList: [markNonNull],
    recentAcSubmissionList: [markNonNull],
  },
  QuestionNode: {
    acRate: [markNonNull, addDirective("nonnegative")],
    allowDiscuss: [markNonNull],
    categoryTitle: [markNonNull],
    contributors: [markNonNull],
    dataSchemas: [markNonNull],
    difficulty: [markNonNull, addEnumDirective(["Easy", "Medium", "Hard"])],
    discussionCount: [markNonNull, addDirective("nonnegative")],
    dislikes: [markNonNull, addDirective("nonnegative")],
    enableDebugger: [markNonNull],
    enableRunCode: [markNonNull],
    enableSubmit: [markNonNull],
    enableTestMode: [markNonNull],
    envInfo: [markNonNull],
    exampleTestcases: [markNonNull],
    hide: [markNonNull],
    hints: [markNonNull],
    infoVerified: [markNonNull],
    interpretUrl: [markNonNull],
    isPaidOnly: [markNonNull],
    judgerAvailable: [markNonNull],
    judgeType: [markNonNull],
    likes: [markNonNull, addDirective("nonnegative")],
    metaData: [markNonNull],
    mysqlSchemas: [markNonNull],
    nextChallenges: [markNonNull],
    questionDetailUrl: [markNonNull],
    questionFrontendId: [markNonNull],
    questionId: [markNonNull],
    questionTitle: [markNonNull],
    questionTitleSlug: [markNonNull, addDirective("slug")],
    questionType: [markNonNull],
    randomQuestionUrl: [markNonNull],
    sampleTestCase: [markNonNull],
    sessionId: [markNonNull],
    similarQuestions: [markNonNull],
    solutionNum: [markNonNull, addDirective("nonnegative")],
    stats: [markNonNull],
    submitUrl: [markNonNull],
    titleSlug: [addDirective("slug")],
    topicTags: [markNonNull],
    urlManager: [markNonNull],
  },
  SubmissionDumpNode: {
    id: [markNonNull],
    timestamp: [markNonNull],
    title: [markNonNull],
    titleSlug: [markNonNull, addDirective("slug")],
  },
};
