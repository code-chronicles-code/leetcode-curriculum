import type { ReadonlyDeep } from "type-fest";

import { replaceInMap } from "@code-chronicles/util/replaceInMap";
import { z } from "zod";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";
import { markFieldsNonNull } from "./markFieldsNonNull.ts";

const FIELDS_TO_MARK_NON_NULL: ReadonlyDeep<Record<string, string[]>> = {
  Query: [
    "activeDailyCodingChallengeQuestion",
    "questionList",
    "recentAcSubmissionList",
  ],
  QuestionNode: [
    "acRate",
    "allowDiscuss",
    "difficulty",
    "isPaidOnly",
    "questionFrontendId",
  ],
  SubmissionDumpNode: ["id", "timestamp", "title", "titleSlug"],
};

export function patchGraphQLSchema(
  scrapedTypeInfos: ReadonlyMap<string, ReadonlyDeep<LeetCodeGraphQLType>>,
): Map<string, ReadonlyDeep<LeetCodeGraphQLType>> {
  const typeInfos = new Map(scrapedTypeInfos);

  for (const [typeName, fieldsToMarkNonNull] of Object.entries(
    FIELDS_TO_MARK_NON_NULL,
  )) {
    replaceInMap(typeInfos, typeName, (typeInfo) =>
      markFieldsNonNull(typeInfo, fieldsToMarkNonNull),
    );
  }

  return typeInfos;
}

const zodType = z.object({
  acRate: z.number().nonnegative(),
  adminUrl: z.null(),
  allowDiscuss: z.literal(true),
  // { id: 1906, url: '/articles/debounce/', topicId: 3536814 }
  article: z
    .string()
    .transform((s) => JSON.parse(s))
    .nullable(),
  articleTopicId: z.null(),
  boundTopicId: z.null(),
  canSeeQuestion: z.boolean(),
  categoryTitle: z.enum([
    "Algorithms",
    "Concurrency",
    "Database",
    "JavaScript",
    "Shell",
    "pandas",
  ]),
  challengeQuestion: z.object({}).nullable(),
  /*
  [
  {
    value: 'cpp',
    text: 'C++',
    defaultCode: 'class Solution {\n' +
      'public:\n' +
      '    long long maximumTotalSum(vector<int>& maximumHeight) {\n' +
      '        \n' +
      '    }\n' +
      '};'
  },
  {
    value: 'java',
    text: 'Java',
    defaultCode: 'class Solution {\n' +
      '    public long maximumTotalSum(int[] maximumHeight) {\n' +
      '        \n' +
      '    }\n' +
      '}'
  },
  */
  codeDefinition: z
    .string()
    .transform((s) => JSON.parse(s))
    .nullable(),
  codeSnippets: z.array(z.object({})).nullable(),
  companyTags: z.null(),
  companyTagStats: z.null(),
  companyTagStatsV2: z.null(),
  content: z.string().nullable(),
  contributors: z.tuple([]),
  dataSchemas: z.array(z.string()),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  discussionCount: z.number().int().nonnegative(),
  dislikes: z.number().int().nonnegative(),
  enableDebugger: z.boolean(),
  enableRunCode: z.boolean(),
  enableSubmit: z.boolean(),
  enableTestMode: z.boolean(),

  /*

  {
  cpp: [
    'C++',
    '<p>Compiled with <code> clang 17 </code> using the latest C++ 23 standard, and <code>libstdc++</code> provided by GCC 13.</p>\r\n' +
      '\r\n' +
      '<p>Your code is compiled with level two optimization (<code>-O2</code>). <a href="https://github.com/google/sanitizers/wiki/AddressSanitizer" target="_blank">AddressSanitizer</a> is also enabled to help detect out-of-bounds and use-after-free bugs.</p>\r\n' +
      '\r\n' +
      '<p>Most standard library headers are already included automatically for your convenience.</p>'
  ],
  java: [
    'Java',
    '<p><code>OpenJDK 21</code>. Using compile arguments: <code>--enable-preview --release 21</code></p>\r\n' +
      '\r\n' +
      '<p>Most standard library headers are already included automatically for your convenience.</p>\r\n' +
      '<p>Includes <code>Pair</code> class from https://docs.oracle.com/javase/8/javafx/api/javafx/util/Pair.html.</p>'
  ],


  */
  envInfo: z.string().transform((s) => JSON.parse(s)),
  exampleTestcaseList: z.array(z.string()),
  exampleTestcases: z.string(),
  freqBar: z.null(),
  frequency: z.literal(0),

  // {}
  frontendPreviews: z
    .literal("{}")
    .transform((s) => JSON.parse(s))
    .nullable(),
  hasFrontendPreview: z.literal(false),
  hasSolution: z.boolean(),
  hasVideoSolution: z.boolean(),
  hide: z.boolean(),
  hideLastTestcases: z.null(),
  hints: z.array(z.string()),
  infoVerified: z.boolean(),
  interpretUrl: z.string(),
  isFavor: z.literal(false),
  isLiked: z.boolean().nullable(),
  isPaidOnly: z.boolean(),
  judgerAvailable: z.literal(true),
  judgeType: z.enum(["large", "small"]),

  // {"cpp": true, "java": true, "python": true, "python3": true, "mysql": false, "mssql": false, "oraclesql": false, "c": false, "csharp": false, "javascript": false, "typescript": false, "bash": false, "php": false, "swift": false, "kotlin": false, "dart": false, "golang": false, "ruby": false, "scala": false, "html": false, "pythonml": false, "rust": false, "racket": false, "erlang": false, "elixir": false, "pythondata": false, "react": false, "vanillajs": false, "postgresql": false, "cangjie": false}
  langToValidPlayground: z
    .string()
    .transform((s) => JSON.parse(s))
    .nullable(),
  libraryUrl: z.null(),
  likes: z.number().int().nonnegative(),

  /*
{"mysql": ["CREATE TABLE If not exists Drivers (\n    driver_id INT ,\n    name VARCHAR(100),\n    age INT,\n    experience INT,\n    accidents INT\n)", "CREATE TABLE If not exists Vehicles (\n    vehicle_id INT ,\n    driver_id INT,\n    model VARCHAR(100),\n    fuel_type VARCHAR(50),\n    mileage INT)", "CREATE TABLE  If not exists Trips (\n    trip_id INT ,\n    vehicle_id INT,\n    distance INT,\n    duration INT,\n    rating INT\n)"], "mssql": ["CREATE TABLE Drivers (\n    driver_id INT,\n    name NVARCHAR(100),\n    age INT,\n    experience INT,\n    accidents INT\n)", "CREATE TABLE Vehicles (\n    vehicle_id INT,\n    driver_id INT,\n    model NVARCHAR(100),\n    fuel_type NVARCHAR(50),\n    mileage INT\n)", "CREATE TABLE Trips (\n    trip_id INT,\n    vehicle_id INT,\n    distance INT,\n    duration INT,\n    rating INT CHECK (rating BETWEEN 1 AND 5)\n)"], "oraclesql": ["CREATE TABLE Drivers (\n    driver_id NUMBER,\n    name VARCHAR2(100),\n    age NUMBER,\n    experience NUMBER,\n    accidents NUMBER\n)", "CREATE TABLE Vehicles (\n    vehicle_id NUMBER,\n    driver_id NUMBER,\n    model VARCHAR2(100),\n    fuel_type VARCHAR2(50),\n    mileage NUMBER\n)", "\nCREATE TABLE Trips (\n    trip_id NUMBER,\n    vehicle_id NUMBER,\n    distance NUMBER,\n    duration NUMBER,\n    rating NUMBER )"], "database": true, "name": "get_top_performing_drivers", "pythondata": ["Drivers = pd.DataFrame({\n    'driver_id': pd.Series(dtype='int'),\n    'name': pd.Series(dtype='str'),\n    'age': pd.Series(dtype='int'),\n    'experience': pd.Series(dtype='int'),\n    'accidents': pd.Series(dtype='int')\n})", "Vehicles = pd.DataFrame({\n    'vehicle_id': pd.Series(dtype='int'),\n    'driver_id': pd.Series(dtype='int'),\n    'model': pd.Series(dtype='str'),\n    'fuel_type': pd.Series(dtype='str'),\n    'mileage': pd.Series(dtype='int')\n})", "Trips = pd.DataFrame({\n    'trip_id': pd.Series(dtype='int'),\n    'vehicle_id': pd.Series(dtype='int'),\n    'distance': pd.Series(dtype='int'),\n    'duration': pd.Series(dtype='int'),\n    'rating': pd.Series(dtype='int')\n})"], "postgresql": ["CREATE TABLE Drivers (\n    driver_id SERIAL PRIMARY KEY,\n    name VARCHAR(100),\n    age INT,\n    experience INT,\n    accidents INT\n);\n", "CREATE TABLE Vehicles (\n    vehicle_id SERIAL PRIMARY KEY,\n    driver_id INT,\n    model VARCHAR(100),\n    fuel_type VARCHAR(50),\n    mileage INT\n);\n", "CREATE TABLE Trips (\n    trip_id SERIAL PRIMARY KEY,\n    vehicle_id INT,\n    distance INT,\n    duration INT,\n    rating INT CHECK (rating BETWEEN 1 AND 5)\n);\n", "TRUNCATE TABLE Vehicles, Drivers;\n"], "database_schema": {"Drivers": {"driver_id": "INT", "name": "VARCHAR(100)", "age": "INT", "experience": "INT", "accidents": "INT"}, "Vehicles": {"vehicle_id": "INT", "driver_id": "INT", "model": "VARCHAR(100)", "fuel_type": "VARCHAR(50)", "mileage": "INT"}, "Trips": {"trip_id": "INT", "vehicle_id": "INT", "distance": "INT", "duration": "INT", "rating": "INT"}}}

{
  "name": "maxGoodNumber",
  "params": [
    {
      "name": "nums",
      "type": "integer[]"
    }
  ],
  "return": {
    "type": "integer"
  }
}

  */

  metaData: z.string().transform((s) => JSON.parse(s)),
  mysqlSchemas: z.array(z.string()),
  nextChallenges: z.array(z.object({})),
  note: z.null(),
  questionDetailUrl: z.string(),
  questionFrontendId: z.string(),
  questionId: z.string(),
  questionTitle: z.string(),
  questionTitleSlug: z.string(),
  questionType: z.literal("Main"),
  randomQuestionUrl: z.literal("/problems/random-one-question/"),
  sampleTestCase: z.string(),
  sessionId: z.literal("0"),

  // [{"title": "Zigzag Iterator", "titleSlug": "zigzag-iterator", "difficulty": "Medium", "translatedTitle": null}, {"title": "Minimum Additions to Make Valid String", "titleSlug": "minimum-additions-to-make-valid-string", "difficulty": "Medium", "translatedTitle": null}]
  similarQuestions: z.string().transform((s) => JSON.parse(s)),
  solution: z.object({}).nullable(),

  solutionNum: z.number().int().nonnegative(),

  // {"totalAccepted": "9K", "totalSubmission": "14.9K", "totalAcceptedRaw": 9003, "totalSubmissionRaw": 14933, "acRate": "60.3%"}
  stats: z.string().transform((s) => JSON.parse(s)),
  submitUrl: z.string(),
  title: z.string(),
  titleSlug: z.string(),
  topicTags: z.array(z.object({})),
  translatedContent: z.null(),
  translatedTitle: z.null(),

  // {"account_login": "/accounts/login/", "maintenance": "/maintenance/", "profile": "/profile/"}
  urlManager: z.string().transform((s) => JSON.parse(s)),
});
