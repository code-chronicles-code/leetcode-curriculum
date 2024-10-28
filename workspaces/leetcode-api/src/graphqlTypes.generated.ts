// THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
// Instead, update the generation process or inputs and run `yarn codegen`.

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: unknown; output: string };
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: unknown; output: string };
  /** The `Decimal` scalar type represents a python Decimal. */
  Decimal: { input: unknown; output: string };
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: { input: unknown; output: string };
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: { input: string; output: string };
};

export type AcStatsNode = {
  acQuestionCount?: Maybe<Scalars["Int"]["output"]>;
  acRate?: Maybe<Scalars["Int"]["output"]>;
  acSubmissionCount?: Maybe<Scalars["Int"]["output"]>;
  totalSubmissionCount?: Maybe<Scalars["Int"]["output"]>;
};

export type AcceptAchievementReward = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type AcceptContribution = {
  contribution?: Maybe<ContributionNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type AcceptContributionContributionArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

/** An enumeration. */
export type AccessDeniedReasonEnum =
  /** company list not available */
  | "COMPANY_LIST_NOT_AVAILABLE"
  /** list is private */
  | "LIST_IS_PRIVATE"
  /** no such list */
  | "NO_SUCH_LIST";

export type AccessToFavoriteNode = {
  hasAccess: Scalars["Boolean"]["output"];
  questionCount?: Maybe<Scalars["Int"]["output"]>;
  rejectReason?: Maybe<AccessDeniedReasonEnum>;
};

/** An enumeration. */
export type AccountFrozenStatus =
  /** already frozen */
  | "ALREADY_FROZEN"
  /** inactive */
  | "INACTIVE"
  /** not qualified to frozen */
  | "NOT_QUALIFIED_TO_FROZEN"
  /** qualified to frozen */
  | "QUALIFIED_TO_FROZEN";

/** An enumeration. */
export type AccountStatus =
  /** deleted */
  | "DELETED"
  /** frozen */
  | "FROZEN";

export type AchievementNode = {
  achievementDescription?: Maybe<Scalars["String"]["output"]>;
  achievementName?: Maybe<Scalars["String"]["output"]>;
  created: Scalars["DateTime"]["output"];
  idHash?: Maybe<Scalars["String"]["output"]>;
  isRewardAccepted: Scalars["Boolean"]["output"];
};

/** advertisement location enums */
export type AdLocationEnum =
  /** Discuss Ad */
  | "DISCUSS_AD"
  /** discuss detail */
  | "DISCUSS_DETAIL"
  /** discuss list */
  | "DISCUSS_LIST"
  /** Home Ad */
  | "HOME_AD"
  /** home feed */
  | "HOME_FEED"
  /** Problemset Ad Sidebar */
  | "PROBLEMSET_AD"
  /** Problemset Ad Primary */
  | "PROBLEMSET_AD_PRIMARY"
  /** Problemset Ad Secondary */
  | "PROBLEMSET_AD_SECONDARY"
  /** qd description */
  | "QD_DESCRIPTION"
  /** qd solution detail */
  | "QD_SOLUTION_DETAIL"
  /** qd solution list */
  | "QD_SOLUTION_LIST"
  /** Study Plan Ad */
  | "STUDY_PLAN_AD";

/** advertisement source enums */
export type AdSourceEnum =
  /** AdSense */
  | "ADSENSE"
  /** Internal Ad */
  | "INTERNAL_AD";

export type AddFavoriteToMyCollectionV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type AddOrUpdateCodeInPlayground = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type AddQuestionToDefaultFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type AddQuestionToFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  favoriteIdHash?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type AddQuestionToFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type AddQuestionToNewFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  favoriteIdHash?: Maybe<Scalars["String"]["output"]>;
  isPublicFavorite?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type AddQuestionToNewFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type AddUserToInternalContest = {
  error?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<UserNode>;
};

export type AdvertisementNode = {
  /** the ad slot of google adsense, None for internal ads */
  adSlot?: Maybe<Scalars["String"]["output"]>;
  adSource: AdSourceEnum;
  bannerUrl?: Maybe<Scalars["String"]["output"]>;
  displayTitle?: Maybe<Scalars["String"]["output"]>;
  /** the height of google adsense, None for internal ads */
  height?: Maybe<Scalars["Int"]["output"]>;
  targetUrl?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  /** the width of google adsense, None for internal ads */
  width?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type AllPermission =
  | "authentication_account_recovery"
  | "authentication_ignore_beta_user_flow"
  | "authentication_mock_user"
  | "authentication_mutate_archive_user"
  | "authentication_mutate_ip_management"
  | "authentication_mutate_team_member"
  | "authentication_mutate_user_management"
  | "authentication_query_archived_users"
  | "authentication_query_ip_management"
  | "authentication_query_team_member"
  | "authentication_query_user_info"
  | "authentication_see_user_email"
  | "authentication_see_user_id"
  | "authentication_see_user_management"
  | "authentication_update_school_info"
  | "common_change_tag"
  | "contest_private_access_dashboard"
  | "contest_see_all"
  | "contest_see_private"
  | "contest_see_private_ranking"
  | "contest_see_private_without_registration"
  | "contribution_accept_reject"
  | "contribution_see_dashboard"
  | "danger_zone_view_admin"
  | "debugger_beta_access"
  | "discuss_change_contest_post"
  | "discuss_change_post"
  | "discuss_delete_contest_post"
  | "discuss_delete_post"
  | "discuss_get_all_posts"
  | "discuss_hide_post"
  | "discuss_mark_spammer"
  | "discuss_pin_contest_topic"
  | "discuss_pin_topic"
  | "discuss_review_contest_post"
  | "discuss_review_post"
  | "discuss_see_contest_unpublished_post"
  | "discuss_see_hidden_post"
  | "discuss_see_unpublished_post"
  | "email_batch"
  | "email_batch_create_event"
  | "email_batch_send_custom"
  | "library_change_question"
  | "library_change_question_category"
  | "library_content_access"
  | "library_content_editor"
  | "library_see_all_fields"
  | "library_see_all_problems"
  | "manage"
  | "manage_blacklisted_words"
  | "manage_company_questions"
  | "manage_company_tags"
  | "manage_discuss"
  | "manage_official_solution_feedback"
  | "manage_tag_categories"
  | "manage_tag_groups"
  | "manage_tags"
  | "problemset_use_test_mode"
  | "problemset_view_draft_category"
  | "score_mutate_give_leetcoin"
  | "score_see_admin_panel"
  | "submission_access_diff_tool"
  | "submission_see_details";

export type AnnualReportNode = {
  badge: UserBadgeNode;
  content: Array<Maybe<Scalars["String"]["output"]>>;
  showPopup: Scalars["Boolean"]["output"];
};

export type ApiTokenNode = {
  isCreated: Scalars["Boolean"]["output"];
  token?: Maybe<Scalars["String"]["output"]>;
};

export type ApplicationNode = {
  anonymous: Scalars["Boolean"]["output"];
  background?: Maybe<Scalars["String"]["output"]>;
  date?: Maybe<Scalars["Int"]["output"]>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  solutions?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  testcases?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  topic?: Maybe<TopicNode>;
  type?: Maybe<Scalars["String"]["output"]>;
  user: PrivateContestUserNode;
};

export type ApplyTimeTravelTicket = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ApplyTimeTravelTicketV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  streakCounter?: Maybe<StreakCounterNode>;
};

export type ApproveComment = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  post?: Maybe<PostNode>;
};

export type ApproveComments = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ApproveContestReports = {
  approvedReports: Array<ContestReportNode>;
};

export type ApproveReportedPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ApproveTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ApproveTopics = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ArchiveUser = {
  allArchivedUsers: Array<ArchivedUserNode>;
};

export type ArchivedUserNode = {
  archiveDate?: Maybe<Scalars["String"]["output"]>;
  archiveReason?: Maybe<Scalars["String"]["output"]>;
  createDate: Scalars["DateTime"]["output"];
  extraInfo: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  originalPrimaryEmail: Scalars["String"]["output"];
  originalUsername: Scalars["String"]["output"];
  user?: Maybe<PrivateContestUserNode>;
};

export type ArticleNode = {
  body?: Maybe<Scalars["String"]["output"]>;
  canSeeDetail?: Maybe<Scalars["Boolean"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  contentTypeId?: Maybe<Scalars["ID"]["output"]>;
  hasVideoSolution?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  paidOnly?: Maybe<Scalars["Boolean"]["output"]>;
  paidOnlyVideo?: Maybe<Scalars["Boolean"]["output"]>;
  rating?: Maybe<RatingNode>;
  /** The name of the page as it will appear in URLs e.g http://domain.com/blog/[my-slug]/ */
  slug: Scalars["String"]["output"];
  /** The page title as you'd like it to be seen by the public */
  title: Scalars["String"]["output"];
  titleSlug?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
  topicId?: Maybe<Scalars["Int"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** 取消注销账户请求 */
export type AuthCancelDeleteAccount = {
  ok: Scalars["Boolean"]["output"];
};

export type AvatarStatusEnum = "ALL" | "UNVIEWED" | "VIEWED";

export type AwardInternalContestCoin = {
  internalContestAwardedUsers?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BtsEventNotification = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BtsReferralNode = {
  link: Scalars["String"]["output"];
  referredCount: Scalars["Int"]["output"];
};

export type BtsReferralRegister = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type BadgeBadge =
  /** Guardian */
  | "A_1"
  /** Knight */
  | "A_2"
  /** Daily Coding Challenge */
  | "A_3"
  /** Annual Daily Coding Challenge */
  | "A_4"
  /** Study Plan Award */
  | "A_5"
  /** Annual Badge */
  | "A_6"
  /** Study Plan V2 Award */
  | "A_7";

export type BadgeCategoryEnum = "ANNUAL" | "COMPETITION" | "DCC" | "STUDY_PLAN";

export type BanIp = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BanInfoNode = {
  banTypeName?: Maybe<Scalars["String"]["output"]>;
  banTypeSlug?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["DateTime"]["output"]>;
  reason?: Maybe<Scalars["String"]["output"]>;
  startDate?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BanUser = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  user: UserNodeAdminOnly;
};

export type BatchReviewFlaggedObjects = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type BatchReviewFlaggedObjectsInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  flagResultIds: Array<Scalars["ID"]["input"]>;
  operation: FlagStatus;
  reasonId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type BlacklistNode = {
  words: Scalars["String"]["output"];
};

export type CalendarBadgeNode = {
  badge: UserBadgeNode;
  timestamp: Scalars["Int"]["output"];
};

export type CardNode = {
  banner?: Maybe<Scalars["String"]["output"]>;
  bannerBackground?: Maybe<Scalars["String"]["output"]>;
  categorySlug?: Maybe<Scalars["String"]["output"]>;
  categoryTitle?: Maybe<Scalars["String"]["output"]>;
  chapters: Array<ChapterNode>;
  codingChallengeInfo?: Maybe<CodingChallengeNode>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  discussCategory?: Maybe<DiscussCategoryNode>;
  id: Scalars["ID"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  introText?: Maybe<Scalars["String"]["output"]>;
  introduction?: Maybe<Scalars["String"]["output"]>;
  isFavorite?: Maybe<Scalars["Boolean"]["output"]>;
  isFeatured?: Maybe<Scalars["Boolean"]["output"]>;
  isPreview?: Maybe<Scalars["Boolean"]["output"]>;
  items?: Maybe<Array<Maybe<ItemNode>>>;
  lastModified: Scalars["DateTime"]["output"];
  numChapters?: Maybe<Scalars["Int"]["output"]>;
  numItems?: Maybe<Scalars["Int"]["output"]>;
  numUsersCompleted?: Maybe<Scalars["Int"]["output"]>;
  numUsersStarted?: Maybe<Scalars["Int"]["output"]>;
  paidOnly: Scalars["Boolean"]["output"];
  popularity?: Maybe<Scalars["Int"]["output"]>;
  prevCompleteLinkInfo?: Maybe<Scalars["JSONString"]["output"]>;
  progress?: Maybe<Scalars["JSONString"]["output"]>;
  published: Scalars["Boolean"]["output"];
  sequentialOnly: Scalars["Boolean"]["output"];
  shareEvent?: Maybe<ShareEventNode>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  users?: Maybe<Scalars["JSONString"]["output"]>;
  valueAddedContent?: Maybe<ValueAddedContentNode>;
};

/** An enumeration. */
export type Category = "BASIC" | "EDGE" | "PERFORMANCE";

export type CategoryNode = {
  cards?: Maybe<Array<Maybe<CardNode>>>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  order: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type CategoryNodeCardsArgs = {
  num?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CategoryToSlugNode = {
  categoryName: Scalars["String"]["output"];
  displayName: Scalars["String"]["output"];
  favoriteSlug: Scalars["String"]["output"];
};

export type CategoryType = {
  id: Scalars["ID"]["output"];
  isDebuggable: Scalars["Boolean"]["output"];
  questionSet: Array<QuestionNode>;
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
};

export type ChallengeQuestionNode = {
  date: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  incompleteChallengeCount: Scalars["Int"]["output"];
  status: ChallengeQuestionStatusEnum;
  streakCount: Scalars["Int"]["output"];
  type: ChallengeQuestionTypeEnum;
};

/** challenge question status enums */
export type ChallengeQuestionStatusEnum =
  /** finished */
  | "FINISHED"
  /** not started */
  | "NOT_STARTED";

export type ChallengeQuestionTypeEnum = "DAILY" | "WEEKLY";

export type ChannelNode = {
  identifier?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  shortName?: Maybe<Scalars["String"]["output"]>;
};

export type ChapterNode = {
  description?: Maybe<Scalars["String"]["output"]>;
  descriptionText?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isLocked?: Maybe<Scalars["Boolean"]["output"]>;
  items?: Maybe<Array<Maybe<ItemNode>>>;
  paidOnly: Scalars["Boolean"]["output"];
  shareEvent?: Maybe<ShareEventNode>;
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Checkin = {
  checkedIn?: Maybe<Scalars["Boolean"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CodeSnippetNode = {
  code?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  langSlug?: Maybe<Scalars["String"]["output"]>;
};

export type CodingChallengeNode = {
  canApplyTimeTravelTicket: Scalars["Boolean"]["output"];
  card?: Maybe<CardNode>;
  challenges: Array<DailyChallengeNode>;
  containsPremium: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  questionOfToday?: Maybe<DailyChallengeNode>;
  startDate: Scalars["DateTime"]["output"];
};

export type CodingChallengeNodeV2 = {
  challenges: Array<DailyChallengeNodeV2>;
  id: Scalars["ID"]["output"];
  startDate: Scalars["Date"]["output"];
  weeklyChallenges: Array<DailyChallengeNodeV2>;
};

export type CodingChallengePollingNode = {
  dccSubmissionInfo?: Maybe<CodingChallengeSubmissionNode>;
  keepPolling: Scalars["Boolean"]["output"];
};

export type CodingChallengeSubmissionNode = {
  dailyChallengeMedal?: Maybe<MedalNode>;
  discussLink?: Maybe<Scalars["String"]["output"]>;
  showCompleteModal: Scalars["Boolean"]["output"];
  showTttModal: Scalars["Boolean"]["output"];
  streakCounter?: Maybe<StreakCounterNode>;
};

export type CollectContestEasterEgg = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CommentContribution = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CommentNode = {
  children: Array<CommentNode>;
  id: Scalars["Int"]["output"];
  index?: Maybe<Scalars["Int"]["output"]>;
  intentionTag?: Maybe<IntentionTagNode>;
  lastComment?: Maybe<TopicNode>;
  nodebbPid: Scalars["Int"]["output"];
  numChildren: Scalars["Int"]["output"];
  /** Ineffective field: Don't query this field in a list */
  pageNum?: Maybe<Scalars["Int"]["output"]>;
  parent?: Maybe<CommentNode>;
  parentId?: Maybe<Scalars["ID"]["output"]>;
  pinned?: Maybe<Scalars["Boolean"]["output"]>;
  pinnedAt?: Maybe<Scalars["DateTime"]["output"]>;
  pinnedBy?: Maybe<UserNode>;
  post: PostNode;
  topic: TopicNode;
};

export type CommentNodePageNumArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Scalars["String"]["input"]>;
};

/** An enumeration. */
export type CommentSortingOption =
  | "best"
  | "hot"
  | "most_relevant"
  | "most_votes"
  | "newest_to_oldest"
  | "oldest_to_newest";

export type CommonKeywordNode = {
  content: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
};

export type CommonTagNode = {
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  nameTranslated?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  tagType?: Maybe<TagTypeEnum>;
};

export type CompanyNode = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type CompanyQuestionDetailNode = {
  companyQuestion?: Maybe<CompanyQuestionNode>;
  frequency: Scalars["Float"]["output"];
  incVotedTotalNum?: Maybe<Scalars["Int"]["output"]>;
  latestIncVote?: Maybe<LatestIncVoteNode>;
  periodVotedNum?: Maybe<Scalars["Int"]["output"]>;
};

export type CompanyQuestionKeywordType = "ID" | "NAME";

export type CompanyQuestionListNode = {
  questions: Array<CompanyQuestionNodeV2>;
  total: Scalars["Int"]["output"];
};

export type CompanyQuestionNode = {
  frontendId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
};

export type CompanyQuestionNodeV2 = {
  adminVotedNum?: Maybe<Scalars["Int"]["output"]>;
  frequency: Scalars["Float"]["output"];
  frontendQuestionId: Scalars["String"]["output"];
  id?: Maybe<Scalars["Int"]["output"]>;
  title: Scalars["String"]["output"];
  titleCn?: Maybe<Scalars["String"]["output"]>;
  titleSlug: Scalars["String"]["output"];
  userVotedNum?: Maybe<Scalars["Int"]["output"]>;
};

export type CompanyQuestionOptionsNode = {
  positionOptions?: Maybe<Array<Maybe<CommonTagNode>>>;
  timeOptions?: Maybe<Array<Maybe<CompanyQuestionTimeOptionsNode>>>;
};

/** An enumeration. */
export type CompanyQuestionTimeOptionEnum =
  /** All */
  | "ALL"
  /** One Year */
  | "ONE_YEAR"
  /** Six Month */
  | "SIX_MONTH"
  /** Two Year */
  | "TWO_YEAR";

/** An enumeration. */
export type CompanyQuestionTimeOptionEnumV2 =
  /** All */
  | "ALL"
  /** More than 6 months */
  | "MORE_THAN_SIX_MONTH"
  /** Recent 6 months */
  | "SIX_MONTH"
  /** Recent 30 days */
  | "THIRTY_DAY"
  /** Recent 3 months */
  | "THREE_MONTH";

export type CompanyQuestionTimeOptionsNode = {
  name?: Maybe<Scalars["String"]["output"]>;
  /** 时间选项 */
  option: CompanyQuestionTimeOptionEnumV2;
};

/** An enumeration. */
export type CompanyStage =
  | "ONLINE_ASSESSMENT"
  | "ONSITE_INTERVIEW"
  | "PHONE_INTERVIEW";

export type CompanyTagConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CompanyTagEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `CompanyTag` and its cursor. */
export type CompanyTagEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<CompanyTagNode>;
};

export type CompanyTagNode = {
  companySet: Array<InterviewCompanyNode>;
  createdAt: Scalars["DateTime"]["output"];
  discussTopicTag: Array<DiscussTopicTagNode>;
  favoriteSet: Array<FeaturedQuestionListNode>;
  favorites: Array<FeaturedQuestionListNode>;
  frequencies?: Maybe<Scalars["String"]["output"]>;
  hotScore?: Maybe<Scalars["Int"]["output"]>;
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  interviewTagsCategories: Array<InterviewTagsCategoryNode>;
  /** Deprecated in Tag System. Still used by old products. */
  isEnabled: Scalars["Boolean"]["output"];
  /** Whether this is a standard tag or not */
  isStandard: Scalars["Boolean"]["output"];
  /** Whether this tag is enabled or not. If not enabled, we NEVER show it to our users. */
  isTagEnabled: Scalars["Boolean"]["output"];
  /** Whether user can select this tag or not */
  isUserSelectable: Scalars["Boolean"]["output"];
  keywords: Scalars["JSONString"]["output"];
  name: Scalars["String"]["output"];
  order?: Maybe<Scalars["Int"]["output"]>;
  questionCount?: Maybe<Scalars["Int"]["output"]>;
  questionIds?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  questionapplicationSet: Array<ApplicationNode>;
  questions?: Maybe<Array<QuestionNode>>;
  slug: Scalars["String"]["output"];
  tagCategories: Array<TagCategoryNode>;
  tagId: Scalars["Int"]["output"];
  /** Deprecated in Tag System. Still used by old products. */
  tagType?: Maybe<TagTypeNode>;
  translatedName?: Maybe<Scalars["String"]["output"]>;
};

export type CompleteFeatureGuide = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  userStatus?: Maybe<MeNode>;
};

export type CompleteSurvey = {
  error?: Maybe<Scalars["String"]["output"]>;
};

export type CompletionLikeNode = {
  completion?: Maybe<CompletionNode>;
  creationDate: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isLike: Scalars["Boolean"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

export type CompletionNode = {
  aiResponse: Scalars["String"]["output"];
  completionlikeSet: Array<CompletionLikeNode>;
  creationDate: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

export type ComplexityInfoNode = {
  complexity: Scalars["String"]["output"];
  displayName?: Maybe<Scalars["String"]["output"]>;
  funcStr?: Maybe<Scalars["String"]["output"]>;
  vote?: Maybe<ComplexityVoteEnum>;
};

/** An enumeration. */
export type ComplexityTypeEnum =
  /** memory_complexity */
  | "MEMORY_COMPLEXITY"
  /** time_complexity */
  | "TIME_COMPLEXITY";

/** An enumeration. */
export type ComplexityVoteEnum =
  /** Thumbs Down */
  | "THUMBS_DOWN"
  /** Upvote */
  | "UPVOTE";

export type ConfirmSchoolLogo = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ContestAnnouncementNode = {
  content: Scalars["String"]["output"];
  currentlyVisible?: Maybe<Scalars["Boolean"]["output"]>;
  expiryTime: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  pubDate: Scalars["DateTime"]["output"];
};

export type ContestDetailNode = {
  duration?: Maybe<Scalars["Int"]["output"]>;
  enableContestDynamicLayout?: Maybe<Scalars["Boolean"]["output"]>;
  failCount?: Maybe<Scalars["Int"]["output"]>;
  hasCompletedContest?: Maybe<Scalars["Boolean"]["output"]>;
  isDynamicLayout?: Maybe<Scalars["Boolean"]["output"]>;
  isVirtualContest?: Maybe<Scalars["Boolean"]["output"]>;
  startTime?: Maybe<Scalars["DateTime"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
};

export type ContestNode = {
  cardImg?: Maybe<Scalars["String"]["output"]>;
  company?: Maybe<SponsorNode>;
  containsPremium?: Maybe<Scalars["Boolean"]["output"]>;
  description: Scalars["String"]["output"];
  /** in seconds */
  duration: Scalars["Int"]["output"];
  isVirtual?: Maybe<Scalars["Boolean"]["output"]>;
  originStartTime?: Maybe<Scalars["Int"]["output"]>;
  questions?: Maybe<Array<Maybe<ContestQuestionNode>>>;
  rankingUpdated: Scalars["Boolean"]["output"];
  sponsors: Array<Maybe<SponsorNode>>;
  startTime: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  titleSlug?: Maybe<Scalars["String"]["output"]>;
  unrated: Scalars["Boolean"]["output"];
};

export type ContestQuestionDetailNode = {
  languageList?: Maybe<Array<Maybe<LanguageNode>>>;
  question?: Maybe<ContestQuestionNodeV2>;
  statusList?: Maybe<Array<Maybe<SubmissionStatusNode>>>;
  submittableLanguageList?: Maybe<Array<Maybe<LanguageNode>>>;
  totalAc?: Maybe<Scalars["Int"]["output"]>;
  totalAcUser?: Maybe<Scalars["Int"]["output"]>;
  totalSubmission?: Maybe<Scalars["Int"]["output"]>;
  totalTriedUser?: Maybe<Scalars["Int"]["output"]>;
};

export type ContestQuestionNode = {
  credit: Scalars["Int"]["output"];
  questionId?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
};

export type ContestQuestionNodeV2 = {
  canSeeQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  categoryTitle?: Maybe<Scalars["String"]["output"]>;
  codeSnippets?: Maybe<Array<Maybe<CodeSnippetNode>>>;
  content?: Maybe<Scalars["String"]["output"]>;
  contentType: QuestionEditorTypeEnum;
  contestQuestionNumber?: Maybe<Scalars["Int"]["output"]>;
  difficulty?: Maybe<Scalars["String"]["output"]>;
  enableRunCode?: Maybe<Scalars["Boolean"]["output"]>;
  enableSubmit?: Maybe<Scalars["Boolean"]["output"]>;
  enableTestMode?: Maybe<Scalars["Boolean"]["output"]>;
  envInfo?: Maybe<Scalars["String"]["output"]>;
  exampleTestcaseList: Array<Scalars["String"]["output"]>;
  metaData?: Maybe<Scalars["String"]["output"]>;
  questionFrontendId?: Maybe<Scalars["String"]["output"]>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  score?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
  translatedContent?: Maybe<Scalars["String"]["output"]>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

export type ContestRatingHistogramBarNode = {
  ratingEnd: Scalars["Int"]["output"];
  ratingStart: Scalars["Int"]["output"];
  topPercentage: Scalars["Float"]["output"];
  userCount: Scalars["Int"]["output"];
};

export type ContestReportBannedNode = {
  banDuration?: Maybe<Scalars["Int"]["output"]>;
  user: UserNode;
};

export type ContestReportLccnNode = {
  contest: ContestNode;
  date: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  reportingUser: UserNode;
  submissionId: Scalars["Int"]["output"];
};

export type ContestReportNode = {
  contest: ContestNode;
  date: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  reportedUser: UserNode;
  reportingUser: UserNode;
  status: ContestReportStatus;
  submissionId: Scalars["Int"]["output"];
};

export type ContestReportRewardNode = {
  rewardAmount: Scalars["Int"]["output"];
  user: UserNode;
};

/** An enumeration. */
export type ContestReportStatus =
  /** UNPROCESSED */
  | "A_0"
  /** CANCELED */
  | "A_1"
  /** ACCEPTED */
  | "A_2";

export type ContestReportSummaryNode = {
  bannedUsers: Array<ContestReportBannedNode>;
  contest: ContestNode;
  rewardedUsers: Array<ContestReportRewardNode>;
};

/** An enumeration. */
export type ContestRootBannerAspectRatioType =
  /** SM Breakpoint Image */
  | "A_0"
  /** MD Breakpoint Image */
  | "A_1"
  /** LG Breakpoint Image */
  | "A_2";

export type ContestRootBannerNode = {
  aspectRatioType: ContestRootBannerAspectRatioType;
  backgroundColor: Scalars["String"]["output"];
  banner: Scalars["String"]["output"];
  targetUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ContestSubmissionListNode = {
  hasNext?: Maybe<Scalars["Boolean"]["output"]>;
  lastKey?: Maybe<Scalars["String"]["output"]>;
  submissions?: Maybe<Array<Maybe<ContestSubmissionNodeV2>>>;
};

export type ContestSubmissionNodeV2 = {
  flagType?: Maybe<SubmissionFlagTypeEnum>;
  hasNotes?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  isPending?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  langName?: Maybe<Scalars["String"]["output"]>;
  langVerboseName?: Maybe<Scalars["String"]["output"]>;
  memory?: Maybe<Scalars["String"]["output"]>;
  notes?: Maybe<Scalars["String"]["output"]>;
  penalty?: Maybe<Scalars["Int"]["output"]>;
  runtime?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  statusDisplay?: Maybe<Scalars["String"]["output"]>;
  time?: Maybe<Scalars["String"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
  topicTags?: Maybe<Array<Maybe<TopicTagNode>>>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type ContributionNode = {
  application?: Maybe<ApplicationNode>;
  applyDate: Scalars["DateTime"]["output"];
  category?: Maybe<Scalars["String"]["output"]>;
  date?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  lastModified: Scalars["DateTime"]["output"];
  library?: Maybe<Scalars["Int"]["output"]>;
  payload?: Maybe<Scalars["JSONString"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
  user: PrivateContestUserNode;
};

export type ContributorNode = {
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  profileUrl?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type CreateCodeErrorHint = {
  completion?: Maybe<CompletionNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateComment = {
  comment?: Maybe<CommentNode>;
  commentId?: Maybe<Scalars["Int"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateCompletionLike = {
  completionLike?: Maybe<CompletionLikeNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateContribution = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateEmail = {
  email?: Maybe<EmailNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateIdeDynamicLayout = {
  error?: Maybe<Scalars["String"]["output"]>;
  layout?: Maybe<IdeDynamicLayoutNode>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateOrUpdateEditorialFeedback = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateOrUpdateEmailEvent = {
  emailEvent?: Maybe<EmailEventNode>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  wasCreated?: Maybe<Scalars["Boolean"]["output"]>;
};

/** obtain the new annual medals */
export type CreateOrUpdateUserYearlyMedals = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreatePlayground = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  uuid?: Maybe<Scalars["String"]["output"]>;
};

export type CreatePlaygroundFolder = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateTopicForContest = {
  error?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type CreateTopicForQuestion = {
  error?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type CreateTopicWithCategory = {
  error?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type CreditCardLogNode = {
  action: Scalars["String"]["output"];
  operator: ManagementUserSimpleNode;
  /** In seconds */
  timestamp: Scalars["Int"]["output"];
};

/** An enumeration. */
export type CreditCardStatus =
  /** alive */
  | "ALIVE"
  /** deleted */
  | "DELETED";

export type CurrentSubscriptionInfo = {
  billingEmail?: Maybe<Scalars["String"]["output"]>;
  cardCountryCode?: Maybe<Scalars["String"]["output"]>;
  creditAmount?: Maybe<Scalars["Float"]["output"]>;
  currentPeriodEnd?: Maybe<Scalars["String"]["output"]>;
  currentPlan?: Maybe<Scalars["String"]["output"]>;
  hasStudentPlan?: Maybe<Scalars["Boolean"]["output"]>;
  paymentMethod?: Maybe<Scalars["String"]["output"]>;
};

export type DailyChallengeNode = {
  date: Scalars["DateTime"]["output"];
  item: ItemNode;
  link: Scalars["String"]["output"];
  question: QuestionNode;
  userStatus: UserDailyQuestionStatus;
};

export type DailyChallengeNodeV2 = {
  date: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  link: Scalars["String"]["output"];
  question: QuestionNode;
  userStatus: UserDailyQuestionStatusV2;
};

export type DebugSessionNode = {
  crashed: Scalars["Boolean"]["output"];
  endTime: Scalars["DateTime"]["output"];
  isActive: Scalars["Boolean"]["output"];
  startTime: Scalars["DateTime"]["output"];
  updateTime: Scalars["DateTime"]["output"];
  user: PrivateContestUserNode;
  uuid: Scalars["String"]["output"];
};

export type DebuggerLanguageFeatureNode = {
  id: Scalars["ID"]["output"];
  lang: LibraryLanguage;
  supportsDebugging: Scalars["Boolean"]["output"];
  supportsDisablingBreakpoints: Scalars["Boolean"]["output"];
  supportsExpressions: Scalars["Boolean"]["output"];
};

/** user apply to delete account, account gets frozen after success */
export type DeleteAccount = {
  ok: Scalars["Boolean"]["output"];
  planDeleteDate?: Maybe<Scalars["Date"]["output"]>;
};

export type DeleteAccountInput = {
  otherReason?: InputMaybe<Scalars["String"]["input"]>;
  reason: DeleteAccountReason;
  usernameOrEmail: Scalars["String"]["input"];
};

export type DeleteAccountInputV2 = {
  otherReason?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  reason: DeleteAccountReason;
};

/** An enumeration. */
export type DeleteAccountReason =
  /** Moving to another LeetCode account */
  | "EXTRA_ACCOUNT"
  /** Not using LeetCode anymore */
  | "NO_LONGER_NEEDED"
  /** Other */
  | "OTHER"
  /** Security and privacy concerns */
  | "SECURITY_CONCERN"
  /** Want to start over with a new account */
  | "START_OVER";

/** user apply to delete account, account gets frozen after success */
export type DeleteAccountV2 = {
  ok: Scalars["Boolean"]["output"];
  planDeleteDate?: Maybe<Scalars["Date"]["output"]>;
};

export type DeleteCodeFromPlayground = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteComment = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  post?: Maybe<PostNode>;
};

export type DeleteComments = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteEducation = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteEmail = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteIdeDynamicLayout = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteNote = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteOccupation = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeletePlayground = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeletePlaygroundFolder = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteReportedPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteSocial = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteTeamMember = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteTopics = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeleteUserRequestInput = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  limit?: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  userEmail?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeleteUserRequestListNode = {
  deletedUsers: Array<DeleteUserRequestNode>;
  hasMore: Scalars["Boolean"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type DeleteUserRequestNode = {
  avatar?: Maybe<Scalars["String"]["output"]>;
  deactivatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  frozenAt?: Maybe<Scalars["DateTime"]["output"]>;
  otherReason?: Maybe<Scalars["String"]["output"]>;
  primaryEmail: Scalars["String"]["output"];
  realName?: Maybe<Scalars["String"]["output"]>;
  reason?: Maybe<DeleteAccountReason>;
  status?: Maybe<AccountStatus>;
  userId: Scalars["ID"]["output"];
  username: Scalars["String"]["output"];
};

/** An enumeration. */
export type DifficultyDescribedEnum =
  /** Easy */
  | "EASY"
  /** Hard */
  | "HARD"
  /** Medium */
  | "MEDIUM";

export type DifficultyEnum = "EASY" | "HARD" | "MEDIUM";

/** An enumeration. */
export type DiscountEventBannerAspectRatioType =
  /** SM Breakpoint Image */
  | "A_0"
  /** MD Breakpoint Image */
  | "A_1"
  /** LG Breakpoint Image */
  | "A_2";

export type DiscountEventBannerNode = {
  aspectRatioType: DiscountEventBannerAspectRatioType;
  backgroundColor: Scalars["String"]["output"];
  banner: Scalars["String"]["output"];
  creationDate: Scalars["DateTime"]["output"];
  event: DiscountEventNode;
  id: Scalars["ID"]["output"];
  targetUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

export type DiscountEventNode = {
  banners?: Maybe<Array<Maybe<DiscountEventBannerNode>>>;
  couponCode?: Maybe<Scalars["String"]["output"]>;
  creationDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  discounteventbannerSet: Array<DiscountEventBannerNode>;
  duration: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  ogImage?: Maybe<Scalars["String"]["output"]>;
  seoDescription: Scalars["String"]["output"];
  seoTitle: Scalars["String"]["output"];
  startTime: Scalars["DateTime"]["output"];
  superuserPreview: Scalars["Boolean"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

export type DiscountEventRegister = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DiscussAnnouncementNode = {
  content: Scalars["String"]["output"];
  dateCreated: Scalars["DateTime"]["output"];
  dateUpdated: Scalars["DateTime"]["output"];
  display: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
};

export type DiscussCategoryNode = {
  announcement?: Maybe<Scalars["String"]["output"]>;
  anonymousEnabled: Scalars["Boolean"]["output"];
  canModerate: Scalars["Boolean"]["output"];
  canRewardPosts: Scalars["Boolean"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  numTopics: Scalars["Int"]["output"];
  path: Scalars["String"]["output"];
  rootCategory: DiscussCategoryNode;
  slug: Scalars["String"]["output"];
  subcategories: Array<DiscussCategoryNode>;
  title: Scalars["String"]["output"];
  titleLink?: Maybe<Scalars["String"]["output"]>;
};

export type DiscussTopicTagNode = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  numTopics: Scalars["Int"]["output"];
  order: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
  tagFk?: Maybe<TagNode>;
  tagType?: Maybe<TopicTagTagType>;
  topicSet: Array<TopicNode>;
};

export type DiscussTopicTagNodeNumTopicsArgs = {
  otherTag?: InputMaybe<Scalars["Int"]["input"]>;
};

export type EducationRecordNode = {
  degree?: Maybe<Scalars["String"]["output"]>;
  endTime?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  startTime?: Maybe<Scalars["String"]["output"]>;
  toPresent: Scalars["Boolean"]["output"];
  unverifiedOrganizationName?: Maybe<Scalars["String"]["output"]>;
  user: PrivateContestUserNode;
};

export type EmailEventNode = {
  emailsendsessionSet: Array<EmailSendSessionNode>;
  id: Scalars["ID"]["output"];
  minInterval?: Maybe<Scalars["Int"]["output"]>;
  notificationIdentifier?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  sqlQuery?: Maybe<Scalars["String"]["output"]>;
  template?: Maybe<EmailTemplateNode>;
  templateId?: Maybe<Scalars["Int"]["output"]>;
  title: Scalars["String"]["output"];
  truncatedUsers?: Maybe<Array<Maybe<UserNode>>>;
  userFilter?: Maybe<Scalars["JSONString"]["output"]>;
};

export type EmailNode = {
  email: Scalars["String"]["output"];
  primary: Scalars["Boolean"]["output"];
  verified: Scalars["Boolean"]["output"];
};

export type EmailOpenNode = {
  email: Scalars["String"]["output"];
  extraInfo?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  session?: Maybe<EmailSendSessionNode>;
  time?: Maybe<Scalars["DateTime"]["output"]>;
};

export type EmailSendSessionNode = {
  clicksPerLink?: Maybe<Scalars["JSONString"]["output"]>;
  conversionData?: Maybe<Scalars["JSONString"]["output"]>;
  emailsLeft?: Maybe<Scalars["Int"]["output"]>;
  event: EmailEventNode;
  eventTitle?: Maybe<Scalars["String"]["output"]>;
  groupName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  numClicks?: Maybe<Scalars["Int"]["output"]>;
  numOpens?: Maybe<Scalars["Int"]["output"]>;
  numOpensPerHour?: Maybe<Scalars["JSONString"]["output"]>;
  numSent: Scalars["Int"]["output"];
  opens: Array<EmailOpenNode>;
  overallClickThroughRate?: Maybe<Scalars["Int"]["output"]>;
  startTime?: Maybe<Scalars["String"]["output"]>;
  template: EmailTemplateNode;
  totalSent?: Maybe<Scalars["Int"]["output"]>;
};

export type EmailTemplateNode = {
  /** Resolves the following template variables automatically:<ul><li>blocks</li><li>current_year</li><li>next_biweekly_contest_formatted_date</li><li>next_biweekly_contest_time_by_timezone</li><li>next_biweekly_contest_time_url</li><li>next_biweekly_contest_title</li><li>next_biweekly_contest_title_slug</li><li>next_biweekly_contest_url</li><li>next_contest_formatted_date</li><li>next_contest_time_by_timezone</li><li>next_contest_time_url</li><li>next_contest_title</li><li>next_contest_title_slug</li><li>next_contest_url</li><li>next_javascript_dcc_day</li><li>next_javascript_dcc_editorial_link</li><li>next_javascript_dcc_link</li><li>q_description</li><li>q_difficulty_mandarin</li><li>q_difficulty_w_article</li><li>q_num_ac_subs</li><li>real_name</li><li>site_base_url</li><li>storage_base_url</li><li>suggested_q_slug</li><li>suggested_q_title</li><li>unsubscribe_url</li><li>username</li></ul> */
  content: Scalars["String"]["output"];
  conversionTargetUrlTemplates?: Maybe<Scalars["String"]["output"]>;
  emailSubject: Scalars["String"]["output"];
  emaileventSet: Array<EmailEventNode>;
  emailsendsessionSet: Array<EmailSendSessionNode>;
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type EndSession = {
  session?: Maybe<DebugSessionNode>;
};

/** An enumeration. */
export type EntityType = "DUMMY";

export type ExecuteScript = {
  taskId: Scalars["String"]["output"];
};

export type FavoriteBriefListNode = {
  favorites: Array<FavoriteBriefNode>;
  hasMore: Scalars["Boolean"]["output"];
  totalLength: Scalars["Int"]["output"];
};

export type FavoriteBriefNode = {
  coverBackgroundColor?: Maybe<Scalars["String"]["output"]>;
  coverEmoji?: Maybe<Scalars["String"]["output"]>;
  coverUrl?: Maybe<Scalars["String"]["output"]>;
  favoriteType?: Maybe<FavoriteTypeEnum>;
  generateFromFavoriteSlug?: Maybe<Scalars["String"]["output"]>;
  generatedFavoritesInfo?: Maybe<GeneratedFavoritesInfoNode>;
  hasCurrentQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  isPublicFavorite: Scalars["Boolean"]["output"];
  lastQuestionAddedAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  viewCount?: Maybe<Scalars["Int"]["output"]>;
};

export type FavoriteBriefUserNode = {
  realName: Scalars["String"]["output"];
  userAvatar: Scalars["String"]["output"];
  userName?: Maybe<Scalars["String"]["output"]>;
  userSlug: Scalars["String"]["output"];
};

export type FavoriteDetailListNode = {
  favorites: Array<FavoriteDetailNode>;
  hasMore: Scalars["Boolean"]["output"];
  totalLength: Scalars["Int"]["output"];
};

export type FavoriteDetailNode = {
  collectCount: Scalars["Int"]["output"];
  /** only for C.N. side */
  companyLegalName?: Maybe<Scalars["String"]["output"]>;
  companyVerified: Scalars["Boolean"]["output"];
  coverBackgroundColor?: Maybe<Scalars["String"]["output"]>;
  coverEmoji?: Maybe<Scalars["String"]["output"]>;
  coverUrl?: Maybe<Scalars["String"]["output"]>;
  creator: FavoriteBriefUserNode;
  description: Scalars["String"]["output"];
  /** user unlock favorite status */
  favoriteLockStatus?: Maybe<FavoriteLockStatusEnum>;
  favoriteType?: Maybe<FavoriteTypeEnum>;
  /** only for C.N. side */
  financingStageDisplay?: Maybe<Scalars["String"]["output"]>;
  generateFromFavoriteSlug?: Maybe<Scalars["String"]["output"]>;
  generatedFavoritesInfo?: Maybe<GeneratedFavoritesInfoNode>;
  hasCurrentQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  /** only for C.N. side */
  industryDisplay?: Maybe<Scalars["String"]["output"]>;
  isDefaultList: Scalars["Boolean"]["output"];
  isPublicFavorite: Scalars["Boolean"]["output"];
  /** for smart list */
  languageTagSlug?: Maybe<Scalars["String"]["output"]>;
  lastModified: Scalars["DateTime"]["output"];
  lastQuestionAddedAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  positionRoleTags?: Maybe<Array<CommonTagNode>>;
  questionNumber: Scalars["Int"]["output"];
  /** only for C.N. side */
  scaleDisplay?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  viewCount?: Maybe<Scalars["Int"]["output"]>;
  /** only for C.N. side */
  website?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type FavoriteFavoriteType =
  /** normal */
  | "A_1"
  /** company favorite */
  | "A_2"
  /** smart list */
  | "A_3";

/** An enumeration. */
export type FavoriteLockStatusEnum =
  /** no need to unlock */
  | "NO_NEED_TO_UNLOCK"
  /** user already unlocked */
  | "USER_ALREADY_UNLOCKED"
  /** user cannot unlock */
  | "USER_CANNOT_UNLOCK"
  /** user can unlock */
  | "USER_CAN_UNLOCK";

export type FavoriteNode = {
  acStats: Array<QuestionCountByDifficultyNode>;
  children: Array<FeaturedQuestionListNode>;
  companyTag?: Maybe<TagNode>;
  coverUrl?: Maybe<Scalars["String"]["output"]>;
  created: Scalars["DateTime"]["output"];
  creator: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  extraInfo?: Maybe<Scalars["String"]["output"]>;
  favoriteType?: Maybe<FavoriteFavoriteType>;
  forkFrom?: Maybe<FeaturedQuestionListNode>;
  generatedFavorites: Array<FeaturedQuestionListNode>;
  generatedFrom?: Maybe<FeaturedQuestionListNode>;
  id: Scalars["ID"]["output"];
  idHash: Scalars["String"]["output"];
  isPublicFavorite: Scalars["Boolean"]["output"];
  isWatched: Scalars["Boolean"]["output"];
  lastModified: Scalars["DateTime"]["output"];
  lastQuestionAddedAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  publicId: Scalars["String"]["output"];
  questionCount: Scalars["Int"]["output"];
  questions: Array<QuestionNode>;
  slug?: Maybe<Scalars["String"]["output"]>;
  tags: Array<Maybe<CommonTagNode>>;
  uuid: Scalars["UUID"]["output"];
  viewCount: Scalars["Int"]["output"];
};

export type FavoriteQuestionFilterInput = {
  difficultyList?: InputMaybe<Array<InputMaybe<DifficultyDescribedEnum>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  positionRoleTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  questionStatusList?: InputMaybe<
    Array<InputMaybe<FavoriteQuestionStatusEnum>>
  >;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type FavoriteQuestionListNode = {
  hasMore?: Maybe<Scalars["Boolean"]["output"]>;
  questions: Array<FavoriteQuestionNode>;
  totalLength?: Maybe<Scalars["Int"]["output"]>;
};

export type FavoriteQuestionNode = {
  difficulty: DifficultyDescribedEnum;
  /** 出题频率，企业题单专用字段 */
  frequency?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  /** whether the question is in the user's favorites */
  isInMyFavorites: Scalars["Boolean"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  status?: Maybe<FavoriteQuestionStatusEnum>;
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags?: Maybe<Array<CommonTagNode>>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type FavoriteQuestionStatusEnum =
  /** attempted */
  | "ATTEMPTED"
  /** solved */
  | "SOLVED"
  /** to do */
  | "TO_DO";

export type FavoriteSubmitAcProgressNode = {
  totalAcCount: Scalars["Int"]["output"];
  totalSubmitCount: Scalars["Int"]["output"];
};

/** An enumeration. */
export type FavoriteTypeEnum =
  /** company favorite */
  | "COMPANY_FAVORITE"
  /** normal */
  | "NORMAL"
  /** smart list */
  | "SMART_LIST";

export type FavoritesNode = {
  allFavorites?: Maybe<Array<Maybe<FavoriteNode>>>;
  officialFavorites?: Maybe<Array<Maybe<FavoriteNode>>>;
  privateFavorites?: Maybe<Array<Maybe<FavoriteNode>>>;
  publicFavorites?: Maybe<Array<Maybe<FavoriteNode>>>;
  watchedFavorites?: Maybe<Array<Maybe<FavoriteNode>>>;
};

/** An enumeration. */
export type FeatureGuideType =
  | "CODE_AUTOCOMPLETE_TOUR"
  | "NEW_IDE_DYNAMIC_LAYOUT"
  | "NEW_IDE_DYNAMIC_LAYOUT_V2"
  | "NEW_QD_DETAIL_TOUR"
  | "OTHER"
  | "QUESTION_DETAIL_TOUR"
  | "QUESTION_DETAIL_TOUR_WITH_AUTOCOMPLETE";

export type FeatureNode = {
  autocompleteLanguages?: Maybe<Scalars["JSONString"]["output"]>;
  chinaProblemDiscuss?: Maybe<Scalars["Boolean"]["output"]>;
  cnJobs?: Maybe<Scalars["Boolean"]["output"]>;
  contest?: Maybe<Scalars["Boolean"]["output"]>;
  dangerZone?: Maybe<Scalars["Boolean"]["output"]>;
  discuss?: Maybe<Scalars["Boolean"]["output"]>;
  enableAiHelper?: Maybe<Scalars["Boolean"]["output"]>;
  enableAllQuestionsRaw?: Maybe<Scalars["Boolean"]["output"]>;
  enableAutocomplete?: Maybe<Scalars["Boolean"]["output"]>;
  enableAutocompletePremium?: Maybe<Scalars["Boolean"]["output"]>;
  enableCfTurnstile?: Maybe<Scalars["Boolean"]["output"]>;
  enableChannels?: Maybe<Scalars["Boolean"]["output"]>;
  enableCodingChallengeV2?: Maybe<Scalars["Boolean"]["output"]>;
  enableDebugger?: Maybe<Scalars["Boolean"]["output"]>;
  enableDebuggerPremium?: Maybe<Scalars["Boolean"]["output"]>;
  enableFrontendCategory?: Maybe<Scalars["Boolean"]["output"]>;
  enableIndiaPricing?: Maybe<Scalars["Boolean"]["output"]>;
  enableLcIde?: Maybe<Scalars["Boolean"]["output"]>;
  enableLegacyStudyPlanEntry?: Maybe<Scalars["Boolean"]["output"]>;
  enableNewPlanRankBoardAccess?: Maybe<Scalars["Boolean"]["output"]>;
  enableNewProfile?: Maybe<Scalars["Boolean"]["output"]>;
  enableNewQdPage?: Maybe<Scalars["Boolean"]["output"]>;
  enableNewStudyPlan?: Maybe<Scalars["Boolean"]["output"]>;
  enableRecaptchaV3?: Maybe<Scalars["Boolean"]["output"]>;
  enableReferralDiscount?: Maybe<Scalars["Boolean"]["output"]>;
  enableSharedWorker?: Maybe<Scalars["Boolean"]["output"]>;
  enableStoreShippingForm?: Maybe<Scalars["Boolean"]["output"]>;
  interview?: Maybe<Scalars["Boolean"]["output"]>;
  maxTimeTravelTicketCount?: Maybe<Scalars["Int"]["output"]>;
  mockInterview?: Maybe<Scalars["Boolean"]["output"]>;
  questionTranslation?: Maybe<Scalars["Boolean"]["output"]>;
  signUp?: Maybe<Scalars["Boolean"]["output"]>;
  socialProviders?: Maybe<Scalars["JSONString"]["output"]>;
  store?: Maybe<Scalars["Boolean"]["output"]>;
  studentFooter?: Maybe<Scalars["Boolean"]["output"]>;
  subscription?: Maybe<Scalars["Boolean"]["output"]>;
};

export type FeaturedQuestionListNode = {
  acStats: Array<QuestionCountByDifficultyNode>;
  children: Array<FeaturedQuestionListNode>;
  companyTag?: Maybe<TagNode>;
  coverUrl?: Maybe<Scalars["String"]["output"]>;
  created: Scalars["DateTime"]["output"];
  creator: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  extraInfo?: Maybe<Scalars["String"]["output"]>;
  favoriteType?: Maybe<FavoriteFavoriteType>;
  forkFrom?: Maybe<FeaturedQuestionListNode>;
  generatedFavorites: Array<FeaturedQuestionListNode>;
  generatedFrom?: Maybe<FeaturedQuestionListNode>;
  id: Scalars["ID"]["output"];
  idHash: Scalars["String"]["output"];
  isPaidOnly: Scalars["Boolean"]["output"];
  isPublicFavorite: Scalars["Boolean"]["output"];
  isWatched: Scalars["Boolean"]["output"];
  lastModified: Scalars["DateTime"]["output"];
  lastQuestionAddedAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  publicId: Scalars["String"]["output"];
  questionCount: Scalars["Int"]["output"];
  questions: Array<QuestionNode>;
  slug?: Maybe<Scalars["String"]["output"]>;
  tags: Array<Maybe<CommonTagNode>>;
  uuid: Scalars["UUID"]["output"];
  viewCount: Scalars["Int"]["output"];
};

export type FeedBackMetaNode = {
  maxScore: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  options?: Maybe<Array<FeedBackOptionNode>>;
  questionContent?: Maybe<Scalars["String"]["output"]>;
};

export type FeedBackOptionNode = {
  optionId: Scalars["Int"]["output"];
  optionName: Scalars["String"]["output"];
  optionSlug: Scalars["String"]["output"];
};

/** An enumeration. */
export type FeedbackOrderByEnum =
  /** creation_date */
  | "CREATION_DATE"
  /** rate */
  | "RATE";

export type FilteredSubmissionNode = {
  code: Scalars["String"]["output"];
  codeOutput?: Maybe<Scalars["String"]["output"]>;
  compareResult?: Maybe<Scalars["String"]["output"]>;
  contest?: Maybe<ContestNode>;
  date: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  lang?: Maybe<Scalars["String"]["output"]>;
  memoryComplexity?: Maybe<SubmissionMemoryComplexity>;
  question: QuestionNode;
  runtime?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  timeComplexity?: Maybe<SubmissionTimeComplexity>;
  totalCorrect?: Maybe<Scalars["Int"]["output"]>;
  user: PrivateContestUserNode;
};

export type FilteredSubmissionOverviewNode = {
  pages?: Maybe<Scalars["Int"]["output"]>;
  submissions?: Maybe<Array<Maybe<FilteredSubmissionNode>>>;
};

export type FilteredSubmissionOverviewNodeSubmissionsArgs = {
  inputFilters?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type FlagInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  reasonId?: InputMaybe<Scalars["ID"]["input"]>;
  resourceId: Scalars["String"]["input"];
  resourceType: ResourceTypeEnum;
};

export type FlagNode = {
  description: Scalars["String"]["output"];
  reason?: Maybe<FlagReasonNode>;
  reporter: PrivateContestUserNode;
};

export type FlagPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type FlagReasonNode = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type FlagResultNode = {
  created: Scalars["DateTime"]["output"];
  modified: Scalars["DateTime"]["output"];
  reviewer?: Maybe<PrivateContestUserNode>;
  status: FlagResultStatus;
};

/** An enumeration. */
export type FlagResultStatus =
  /** flagged */
  | "A_0"
  /** approved */
  | "A_1"
  /** edit requested */
  | "A_2"
  /** removed */
  | "A_3";

export type FlagSetContentStatus = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type FlagSomething = {
  error?: Maybe<Scalars["String"]["output"]>;
  flag?: Maybe<FlagNode>;
  ok: Scalars["Boolean"]["output"];
};

/** An enumeration. */
export type FlagStatus =
  /** approved */
  | "APPROVED"
  /** edit requested */
  | "EDIT_REQUESTED"
  /** flagged */
  | "FLAGGED"
  /** removed */
  | "REMOVED";

export type FlaggedObjectConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FlaggedObjectEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `FlaggedObject` and its cursor. */
export type FlaggedObjectEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<FlaggedObjectNode>;
};

export type FlaggedObjectListOrderByEnum =
  | "FIRST_FLAGGED_TIME"
  | "FLAGGED_COUNT";

export type FlaggedObjectNode = {
  firstFlaggedTime: Scalars["DateTime"]["output"];
  flagResult: FlagResultNode;
  flaggedCount: Scalars["Int"]["output"];
  reasons?: Maybe<Array<FlagReasonNode>>;
  summary: Scalars["String"]["output"];
};

export type ForkFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type FrontendQuestionResultNode = {
  actual?: Maybe<Scalars["String"]["output"]>;
  codePreview?: Maybe<Scalars["String"]["output"]>;
  errorMessage?: Maybe<Scalars["String"]["output"]>;
  expected?: Maybe<Scalars["String"]["output"]>;
  failingLine?: Maybe<Scalars["Int"]["output"]>;
  passed: Scalars["Boolean"]["output"];
  shortError?: Maybe<Scalars["String"]["output"]>;
  showDiff?: Maybe<Scalars["Boolean"]["output"]>;
  stdout?: Maybe<Scalars["String"]["output"]>;
  testFn?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type GeneratedFavoritesInfoNode = {
  categoriesToSlugs?: Maybe<Array<CategoryToSlugNode>>;
  defaultFavoriteSlug?: Maybe<Scalars["String"]["output"]>;
};

export type GetOrCreateExploreSession = {
  cardId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  progress?: Maybe<Scalars["JSONString"]["output"]>;
};

export type GlobalRankingNode = {
  myRank?: Maybe<RankingNode>;
  page?: Maybe<Scalars["Int"]["output"]>;
  rankingNodes?: Maybe<Array<Maybe<RankingNode>>>;
  totalUsers?: Maybe<Scalars["Int"]["output"]>;
  userPerPage?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type Group =
  | "contest_discuss_admin"
  | "discuss_admin"
  | "everyone"
  | "internal_contest_organizer"
  | "internal_contest_participant"
  | "library_admin";

export type HandleUserReports = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type HideComments = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type HideLastTestcasesNode = {
  count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  question: QuestionNode;
};

export type HidePost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  post?: Maybe<PostNode>;
};

export type HideTopicFromTrending = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type HideTopics = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type HitResource = {
  count?: Maybe<Scalars["Int"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type HtmlArticleNode = {
  editLink?: Maybe<Scalars["String"]["output"]>;
  html: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  originalLink?: Maybe<Scalars["String"]["output"]>;
  paidOnly: Scalars["Boolean"]["output"];
};

export type IdeDynamicLayoutNode = {
  layoutId: Scalars["String"]["output"];
  layoutJson: Scalars["JSONString"]["output"];
  layoutName: Scalars["String"]["output"];
};

export type IpManagementLogNode = {
  operation: Scalars["String"]["output"];
  operationTime: Scalars["DateTime"]["output"];
  operator: ManagementUserSimpleNode;
};

/** An enumeration. */
export type IpStatusEnum =
  /** Banned */
  | "Banned"
  /** Monitored */
  | "Monitored"
  /** Normal */
  | "Normal";

export type IntentionTagNode = {
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type InterviewAnalysisStatus =
  | "COMPLETED"
  | "DELAYED"
  | "NEEDS_DATA"
  | "PROCESSING"
  | "SKIPPED";

export type InterviewCardNode = {
  company?: Maybe<InterviewCompanyNode>;
  hasNewInterview?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  numInterview?: Maybe<Scalars["Int"]["output"]>;
  numParticipants?: Maybe<Scalars["Int"]["output"]>;
  numPass?: Maybe<Scalars["Int"]["output"]>;
  stage?: Maybe<CompanyStage>;
};

export type InterviewCompanyGlobalScoreNode = {
  companyName: Scalars["String"]["output"];
  score: Scalars["Float"]["output"];
};

export type InterviewCompanyNode = {
  id: Scalars["ID"]["output"];
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  stage: CompanyStage;
};

export type InterviewCompanyOption = {
  id?: Maybe<Scalars["Int"]["output"]>;
  keywords: Array<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type InterviewEnd = {
  session?: Maybe<InterviewSessionNode>;
};

export type InterviewGlobalStatsNode = {
  averageCompanyScores: Array<InterviewCompanyGlobalScoreNode>;
  categories: Array<InterviewTagsCategoryNode>;
};

export type InterviewNode = {
  company: InterviewCompanyNode;
  createTime?: Maybe<Scalars["DateTime"]["output"]>;
  disabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  questions: Array<QuestionNode>;
  sessionSet: InterviewSessionNodeConnection;
  /** in seconds */
  timeConstraint?: Maybe<Scalars["Int"]["output"]>;
  updateTime?: Maybe<Scalars["DateTime"]["output"]>;
};

export type InterviewNodeSessionSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type InterviewProgressNode = {
  id: Scalars["ID"]["output"];
  lastSavedCode?: Maybe<Scalars["String"]["output"]>;
  questionId: Scalars["ID"]["output"];
  status: ProgressStatus;
};

export type InterviewQuestionReportNode = {
  content: Scalars["String"]["output"];
  questionId: Scalars["String"]["output"];
  submission?: Maybe<InterviewSubmissionNode>;
  submissionHistory: InterviewSubmissionConnection;
};

export type InterviewQuestionReportNodeSubmissionHistoryArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type InterviewReportNode = {
  analysisStatus: InterviewAnalysisStatus;
  distribution?: Maybe<Array<Array<Maybe<Scalars["Int"]["output"]>>>>;
  hasRequestedEmail: Scalars["Boolean"]["output"];
  isDuplicateAttempt: Scalars["Boolean"]["output"];
  percentile?: Maybe<Scalars["Float"]["output"]>;
  questions: Array<InterviewQuestionReportNode>;
  score?: Maybe<Scalars["Float"]["output"]>;
};

export type InterviewScoreProgressNode = {
  score: Scalars["Float"]["output"];
  session: InterviewSessionNode;
};

export type InterviewSessionConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InterviewSessionEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `InterviewSession` and its cursor. */
export type InterviewSessionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<InterviewSessionNode>;
};

export type InterviewSessionNode = {
  card: InterviewCardNode;
  endTime: Scalars["Int"]["output"];
  expiredTime: Scalars["Int"]["output"];
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  interview: InterviewNode;
  progress: Array<InterviewProgressNode>;
  remainingTime: Scalars["Int"]["output"];
  report: InterviewReportNode;
  startTime: Scalars["Int"]["output"];
  status: SessionStatus;
};

export type InterviewSessionNodeConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InterviewSessionNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `InterviewSessionNode` and its cursor. */
export type InterviewSessionNodeEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<InterviewSessionNode>;
};

export type InterviewStageOption = {
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type InterviewStart = {
  session?: Maybe<InterviewSessionNode>;
};

export type InterviewSubmissionConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InterviewSubmissionEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `InterviewSubmission` and its cursor. */
export type InterviewSubmissionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<InterviewSubmissionNode>;
};

export type InterviewSubmissionNode = {
  code?: Maybe<Scalars["String"]["output"]>;
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  isPending?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  memory?: Maybe<Scalars["String"]["output"]>;
  numCorrect?: Maybe<Scalars["Int"]["output"]>;
  runtime?: Maybe<Scalars["String"]["output"]>;
  statusDisplay?: Maybe<Scalars["String"]["output"]>;
  timestamp?: Maybe<Scalars["Int"]["output"]>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

export type InterviewSurveyNode = {
  companies?: Maybe<Array<Maybe<InterviewCompanyOption>>>;
  interviewedUrl?: Maybe<Scalars["String"]["output"]>;
  popularCompanies?: Maybe<Array<Maybe<InterviewCompanyOption>>>;
  positions?: Maybe<Array<CommonTagNode>>;
  stageOptions?: Maybe<Array<Maybe<InterviewStageOption>>>;
  timeOptions?: Maybe<Array<Maybe<InterviewTimeOption>>>;
};

export type InterviewTagsCategoryNode = {
  description?: Maybe<Scalars["String"]["output"]>;
  exploreCards: Array<CardNode>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  score?: Maybe<InterviewTagsCategoryScoreNode>;
  suggestedQuestions: Array<QuestionNode>;
};

export type InterviewTagsCategoryScoreNode = {
  category: InterviewTagsCategoryNode;
  creationDate: Scalars["DateTime"]["output"];
  distribution?: Maybe<Array<Array<Maybe<Scalars["Int"]["output"]>>>>;
  id: Scalars["ID"]["output"];
  percentile: Scalars["Float"]["output"];
  score: Scalars["Float"]["output"];
  updationDate: Scalars["DateTime"]["output"];
  user: PrivateContestUserNode;
};

export type InterviewTimeOption = {
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type InterviewedStatsInput = {
  companyId?: InputMaybe<Scalars["Int"]["input"]>;
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  interviewedStatsId: Scalars["Int"]["input"];
  isInterviewed?: InputMaybe<Scalars["Boolean"]["input"]>;
  positionTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  questionId: Scalars["String"]["input"];
  stageOption?: InputMaybe<Scalars["Int"]["input"]>;
  timeOption?: InputMaybe<Scalars["Int"]["input"]>;
};

export type InterviewedStatsPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  interviewedStatsId?: Maybe<Scalars["Int"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ItemBaseNode = {
  article?: Maybe<ArticleNode>;
  cardTitle?: Maybe<Scalars["String"]["output"]>;
  chapter: ChapterNode;
  chapterId?: Maybe<Scalars["Int"]["output"]>;
  chapterTitle?: Maybe<Scalars["String"]["output"]>;
  completedWithTimeTravelTicket?: Maybe<Scalars["Boolean"]["output"]>;
  hasAppliedTimeTravelTicket?: Maybe<Scalars["Boolean"]["output"]>;
  htmlArticle?: Maybe<HtmlArticleNode>;
  id: Scalars["ID"]["output"];
  info?: Maybe<Scalars["String"]["output"]>;
  isComplete?: Maybe<Scalars["Boolean"]["output"]>;
  isEligibleForCompletion: Scalars["Boolean"]["output"];
  lang?: Maybe<Scalars["String"]["output"]>;
  numUsersCompleted?: Maybe<Scalars["Int"]["output"]>;
  numUsersStarted?: Maybe<Scalars["Int"]["output"]>;
  paidOnly?: Maybe<Scalars["Boolean"]["output"]>;
  question?: Maybe<QuestionNode>;
  type?: Maybe<Scalars["Int"]["output"]>;
  users?: Maybe<Scalars["JSONString"]["output"]>;
  verboseLang?: Maybe<Scalars["String"]["output"]>;
  video?: Maybe<VideoNode>;
  webPage?: Maybe<WebPageNode>;
};

export type ItemNode = {
  article?: Maybe<ArticleNode>;
  cardTitle?: Maybe<Scalars["String"]["output"]>;
  chapter: ChapterNode;
  chapterId?: Maybe<Scalars["Int"]["output"]>;
  chapterTitle?: Maybe<Scalars["String"]["output"]>;
  completedWithTimeTravelTicket?: Maybe<Scalars["Boolean"]["output"]>;
  hasAppliedTimeTravelTicket?: Maybe<Scalars["Boolean"]["output"]>;
  htmlArticle?: Maybe<HtmlArticleNode>;
  id: Scalars["ID"]["output"];
  info?: Maybe<Scalars["String"]["output"]>;
  isComplete?: Maybe<Scalars["Boolean"]["output"]>;
  isEligibleForCompletion: Scalars["Boolean"]["output"];
  isLocked: Scalars["Boolean"]["output"];
  lang?: Maybe<Scalars["String"]["output"]>;
  numUsersCompleted?: Maybe<Scalars["Int"]["output"]>;
  numUsersStarted?: Maybe<Scalars["Int"]["output"]>;
  paidOnly?: Maybe<Scalars["Boolean"]["output"]>;
  prerequisites?: Maybe<Array<ItemBaseNode>>;
  question?: Maybe<QuestionNode>;
  title: Scalars["String"]["output"];
  type?: Maybe<Scalars["Int"]["output"]>;
  users?: Maybe<Scalars["JSONString"]["output"]>;
  verboseLang?: Maybe<Scalars["String"]["output"]>;
  video?: Maybe<VideoNode>;
  webPage?: Maybe<WebPageNode>;
};

/** join a study plan */
export type JoinStudyPlan = {
  ok: Scalars["Boolean"]["output"];
  progressId: Scalars["String"]["output"];
};

export type LanguageNode = {
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  verboseName?: Maybe<Scalars["String"]["output"]>;
};

export type LanguageProblemCountNode = {
  languageName: Scalars["String"]["output"];
  problemsSolved: Scalars["Int"]["output"];
};

export type LatestIncVoteNode = {
  incVotedAt: Scalars["DateTime"]["output"];
  incVotedNum: Scalars["Int"]["output"];
};

export type LearningContextNode = {
  backLink: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  nextQuestion?: Maybe<QuestionNode>;
  previousQuestion?: Maybe<QuestionNode>;
};

export type LearningContextNodeV2 = {
  name: Scalars["String"]["output"];
  nextQuestion?: Maybe<QuestionNode>;
  previousQuestion?: Maybe<QuestionNode>;
};

export type LearningContextNodeV3 = {
  backLink: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  nextQuestion?: Maybe<PanelQuestionNode>;
  previousQuestion?: Maybe<PanelQuestionNode>;
};

export type LevelBeatPercentageMixin = {
  difficulty: DifficultyDescribedEnum;
  percentage?: Maybe<Scalars["Float"]["output"]>;
};

export type LibraryActivityConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LibraryActivityEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `LibraryActivity` and its cursor. */
export type LibraryActivityEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<QuestionActivityNode>;
};

export type LibraryActivityType = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryCodeDefinition = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lang: LibraryLanguage;
  question: LibraryQuestionNode;
};

export type LibraryDefinitionSave = {
  question: LibraryQuestionNode;
};

export type LibraryDifficulty = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryDraftDelete = {
  deleted: Scalars["Boolean"]["output"];
};

export type LibraryDriver = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lang: LibraryLanguage;
  question: LibraryQuestionNode;
};

export type LibraryFrontendPreview = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lang: LibraryLanguage;
  question: LibraryQuestionNode;
};

export type LibraryFrontendQuestionIdChange = {
  question: LibraryQuestionNode;
};

export type LibraryGenerateSampleTestcase = {
  content: Scalars["String"]["output"];
};

export type LibraryHideLastTestcases = {
  count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  question: LibraryQuestionNode;
};

export type LibraryLanguage = {
  displayName: Scalars["String"]["output"];
  environmentInfo: Scalars["String"]["output"];
  fileExtension: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryMatchType = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryMultiTestcase = {
  category: Category;
  expectedOutput: Scalars["String"]["output"];
  inputRaw: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  question: LibraryQuestionNode;
};

export type LibraryMultiTestcaseInput = {
  category: Category;
  expectedOutput: Scalars["String"]["input"];
  inputRaw: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type LibraryMultiTestcaseSave = {
  question: LibraryQuestionNode;
};

export type LibraryQuestionAttachmentNode = {
  content: Scalars["String"]["output"];
  extension: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryQuestionConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LibraryQuestionEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `LibraryQuestion` and its cursor. */
export type LibraryQuestionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<LibraryQuestionNode>;
};

export type LibraryQuestionNode = {
  activities: LibraryActivityConnection;
  attachments?: Maybe<Array<LibraryQuestionAttachmentNode>>;
  canEdit: Scalars["Boolean"]["output"];
  codeDefinitions: Array<Maybe<LibraryCodeDefinition>>;
  codedefinitionSet: Array<LibraryCodeDefinition>;
  content: Scalars["String"]["output"];
  contribution?: Maybe<ContributionNode>;
  contributorSet: Array<ContributorNode>;
  contributors: Array<PrivateContestUserNode>;
  createDate: Scalars["DateTime"]["output"];
  createdBy?: Maybe<PrivateContestUserNode>;
  customLimits?: Maybe<Scalars["JSONString"]["output"]>;
  customMatcher: Scalars["String"]["output"];
  defaultCustomMatchers: Scalars["JSONString"]["output"];
  defaultValidator: LibraryValidator;
  difficulty: LibraryDifficulty;
  driverSet: Array<LibraryDriver>;
  drivers: Array<LibraryDriver>;
  followup: Scalars["String"]["output"];
  frontendPreviews: Array<LibraryFrontendPreview>;
  frontendQuestionId?: Maybe<Scalars["ID"]["output"]>;
  frontendpreviewSet: Array<LibraryFrontendPreview>;
  hasFrontendPreview?: Maybe<Scalars["Boolean"]["output"]>;
  hideLastTestcases?: Maybe<LibraryHideLastTestcases>;
  hidelasttestcases?: Maybe<LibraryHideLastTestcases>;
  id: Scalars["ID"]["output"];
  includeHeaders: Scalars["String"]["output"];
  inputCpp: Scalars["String"]["output"];
  isCustom?: Maybe<Scalars["Boolean"]["output"]>;
  isMultitestsQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  isPrivate: Scalars["Boolean"]["output"];
  isSystemDesign?: Maybe<Scalars["Boolean"]["output"]>;
  lastModified: Scalars["DateTime"]["output"];
  latestActivity?: Maybe<QuestionActivityNode>;
  libraryactivitySet: QuestionActivityNodeConnection;
  matchType: LibraryMatchType;
  mergedContent: Scalars["String"]["output"];
  metadata: Scalars["String"]["output"];
  multiTestcases: Array<LibraryMultiTestcase>;
  multitestcaseSet: Array<LibraryMultiTestcase>;
  note: Scalars["String"]["output"];
  prodQuestion?: Maybe<QuestionNode>;
  prodTestcase?: Maybe<ProdTestcase>;
  publishError: Scalars["Boolean"]["output"];
  publishStatus: PublishStatus;
  publishedRevisionId: Scalars["Int"]["output"];
  questionTypes: Array<LibraryQuestionType>;
  questionapplicationSet: Array<ApplicationNode>;
  questionattachmentSet: Array<LibraryQuestionAttachmentNode>;
  revisionId: Scalars["Int"]["output"];
  sampleTestcase: Scalars["String"]["output"];
  solutionSet: Array<LibrarySolution>;
  solutions: Array<LibrarySolution>;
  syncCategories: Array<Scalars["String"]["output"]>;
  testcase: LibraryTestcase;
  title: Scalars["String"]["output"];
  validator: LibraryValidator;
};

export type LibraryQuestionNodeActivitiesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LibraryQuestionNodeLibraryactivitySetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type LibraryQuestionNodeConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LibraryQuestionNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LibraryQuestionNode` and its cursor. */
export type LibraryQuestionNodeEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<LibraryQuestionNode>;
};

export type LibraryQuestionType = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type LibraryQuestionsInput = {
  canEdit?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCustom?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNew?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSystemDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  isUnpublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Search Keyword */
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  /** Question Type */
  quesType?: InputMaybe<Scalars["String"]["input"]>;
  sortField: QuestionSortFieldEnum;
};

export type LibrarySetHide = {
  question: LibraryQuestionNode;
};

export type LibrarySetPerm = {
  question: LibraryQuestionNode;
};

export type LibrarySolution = {
  code: Scalars["String"]["output"];
  complexity: Scalars["String"]["output"];
  expectedStatus: LibrarySolutionStatus;
  fileName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isModelSolution: Scalars["Boolean"]["output"];
  lang: LibraryLanguage;
  name?: Maybe<Scalars["String"]["output"]>;
  order: Scalars["Int"]["output"];
  question: LibraryQuestionNode;
};

export type LibrarySolutionDelete = {
  question: LibraryQuestionNode;
};

export type LibrarySolutionSave = {
  question: LibraryQuestionNode;
  solutionId: Scalars["ID"]["output"];
};

export type LibrarySolutionStatus = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type LibrarySolutionsInput = {
  code: Scalars["String"]["input"];
  lang: Scalars["String"]["input"];
  solutionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type LibrarySolutionsOrderSave = {
  question: LibraryQuestionNode;
};

export type LibrarySolutionsOutput = {
  lang: Scalars["String"]["output"];
  solutionId: Scalars["ID"]["output"];
};

export type LibrarySolutionsSave = {
  question: LibraryQuestionNode;
  solutions?: Maybe<Array<Maybe<LibrarySolutionsOutput>>>;
};

export type LibraryStatementSave = {
  question: LibraryQuestionNode;
};

export type LibraryTemplate = {
  codeDefinitions: Scalars["JSONString"]["output"];
  drivers: Scalars["JSONString"]["output"];
  frontendPreviews: Scalars["JSONString"]["output"];
};

export type LibraryTestcase = {
  expectedOutput: Scalars["String"]["output"];
  inputFormatted: Scalars["String"]["output"];
  inputRaw: Scalars["String"]["output"];
  jsonBlob: Scalars["JSONString"]["output"];
  question: LibraryQuestionNode;
};

export type LibraryTestcaseSave = {
  question: LibraryQuestionNode;
};

export type LibraryValidator = {
  code: Scalars["String"]["output"];
  driver: Scalars["String"]["output"];
};

export type LibraryValidatorSave = {
  question: LibraryQuestionNode;
};

export type Like = {
  error?: Maybe<Scalars["String"]["output"]>;
  likeResult?: Maybe<Scalars["Boolean"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type LocalRankingNode = {
  myRank?: Maybe<RankingNode>;
  page?: Maybe<Scalars["Int"]["output"]>;
  rankingNodes?: Maybe<Array<Maybe<RankingNode>>>;
  totalUsers?: Maybe<Scalars["Int"]["output"]>;
  userPerPage?: Maybe<Scalars["Int"]["output"]>;
};

export type LocationAutocomplete = {
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type ManagementAddInterviewedStatVote = {
  ok: Scalars["Boolean"]["output"];
};

export type ManagementAddInterviewedStatVoteInput = {
  /** position tag id */
  positionTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  questionId: Scalars["ID"]["input"];
  /** company tag id */
  tagId: Scalars["ID"]["input"];
  timeOption?: InputMaybe<Scalars["Int"]["input"]>;
  votedNum: Scalars["Int"]["input"];
};

export type ManagementAddOrEditTag = {
  ok: Scalars["Boolean"]["output"];
};

export type ManagementAddOrEditTagCategory = {
  ok: Scalars["Boolean"]["output"];
};

export type ManagementAddOrEditTagCategoryInput = {
  /** Group ID for this category */
  groupId: Scalars["ID"]["input"];
  /** Category is enabled or not */
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Category Name */
  name: Scalars["String"]["input"];
};

export type ManagementAddOrEditTagInput = {
  /** Tag Image URL */
  imgUrl?: InputMaybe<Scalars["String"]["input"]>;
  isStandard?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Whether the tag is enabled (if not enabled, it's not shown to the users */
  isTagEnabled: Scalars["Boolean"]["input"];
  isUserSelectable?: InputMaybe<Scalars["Boolean"]["input"]>;
  keywords?: InputMaybe<Scalars["JSONString"]["input"]>;
  /** Tag Name */
  name: Scalars["String"]["input"];
  /** 排序 */
  order?: InputMaybe<Scalars["Int"]["input"]>;
  /** Tag Slug */
  slug: Scalars["String"]["input"];
  /** Category List IDs */
  tagCategoryIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ManagementCompanyQuestionListNode = {
  maxFreq: Scalars["Float"]["output"];
  questions: Array<CompanyQuestionDetailNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementCompanyTagNode = {
  tags: Array<Maybe<CompanyTagNode>>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
};

export type ManagementCompanyTagsInput = {
  /** Filter by Standard Tags */
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Search Keyword */
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  /** Tag Slug */
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManagementCreditCardNode = {
  cardLast4: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  operationLog: Array<CreditCardLogNode>;
  status: CreditCardStatus;
};

export type ManagementIncVoteLogListNone = {
  nodes: Array<Maybe<ManagementIncVoteLogNode>>;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

export type ManagementIncVoteLogNode = {
  createdAt: Scalars["DateTime"]["output"];
  createdBy?: Maybe<UserNode>;
  positionTag?: Maybe<CommonTagNode>;
  votedDate: Scalars["DateTime"]["output"];
  votedNum: Scalars["Int"]["output"];
};

export type ManagementIpListNode = {
  nodes: Array<ManagementIpNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementIpNode = {
  address: Scalars["String"]["output"];
  firstAccessed: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  ip: Scalars["String"]["output"];
  lastAccessed: Scalars["DateTime"]["output"];
  sharingUsers: Array<Maybe<ManagementUserSimpleNode>>;
  status: IpStatusEnum;
};

export type ManagementOperationHistoryNode = {
  nodes: Array<ManagementOperationLogNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementOperationLogNode = {
  address: Scalars["String"]["output"];
  browser: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  ip: Scalars["String"]["output"];
  operation: UserOperationEnum;
  operationTime: Scalars["DateTime"]["output"];
  os: Scalars["String"]["output"];
};

export type ManagementRemoveTagCategoryToTag = {
  ok: Scalars["Boolean"]["output"];
};

/** An enumeration. */
export type ManagementRoleEnum =
  /** Admin */
  | "ADMIN"
  /** Author */
  | "AUTHOR"
  /** Content */
  | "CONTENT_OPERATION"
  /** Support */
  | "CUSTOMER_SUPPORT"
  /** Email */
  | "EMAIL_BATCH_SENDER"
  /** Contest */
  | "INTERNAL_CONTEST_ORGANIZER"
  /** Moderator */
  | "MODERATORS"
  /** Redeem */
  | "REDEEM_ORDER_MANAGEMENT";

export type ManagementRoleNode = {
  permissions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  roleName?: Maybe<Scalars["String"]["output"]>;
};

export type ManagementScoreListNode = {
  nodes: Array<ManagementScoreNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementScoreNode = {
  category: UmScoreCategoryEnum;
  date: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  extraInfo?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  score: Scalars["Int"]["output"];
  scoreType: ScoreTypeEnum;
};

export type ManagementSetNonofficialTagSimilar = {
  ok: Scalars["Boolean"]["output"];
};

export type ManagementStoreOrderListNode = {
  nodes: Array<ManagementStoreOrderNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementStoreOrderNode = {
  address?: Maybe<StoreAddressNode>;
  buckydropPackageCode?: Maybe<Scalars["String"]["output"]>;
  buckydropShopOrderId?: Maybe<Scalars["String"]["output"]>;
  createDate: Scalars["DateTime"]["output"];
  details?: Maybe<Scalars["JSONString"]["output"]>;
  id: Scalars["ID"]["output"];
  items?: Maybe<Scalars["String"]["output"]>;
  note?: Maybe<Scalars["String"]["output"]>;
  noteByStaff?: Maybe<Scalars["String"]["output"]>;
  orderId: Scalars["String"]["output"];
  status: UmStoreOrderStatusEnum;
  trackingId?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<ManagementUserSimpleNode>;
};

export type ManagementStripeChargeListNode = {
  nodes: Array<ManagementStripeChargeNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementStripeChargeNode = {
  amount: Scalars["Int"]["output"];
  created: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  invoiceId?: Maybe<Scalars["ID"]["output"]>;
  status: StripeChargeStatusEnum;
};

export type ManagementTagAdminLogListNode = {
  nodes: Array<Maybe<ManagementTagAdminLogNode>>;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

export type ManagementTagAdminLogNode = {
  creationDate: Scalars["DateTime"]["output"];
  operateUser: UserNode;
  operationContent?: Maybe<Scalars["String"]["output"]>;
  operationType: TagAdminOperationType;
};

export type ManagementTagCategoriesInput = {
  /** Filter by Category Enabled */
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Search Keyword */
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  /** Category Slug */
  slug?: InputMaybe<Scalars["String"]["input"]>;
  /** Group ID */
  tagGroupId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ManagementTagNode = {
  tags: Array<Maybe<TagNode>>;
  totalCount?: Maybe<Scalars["Int"]["output"]>;
};

export type ManagementTagsInput = {
  excludeTagCategoryIds?: InputMaybe<
    Array<InputMaybe<Scalars["Int"]["input"]>>
  >;
  isSimilarTag?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Filter by Standard Tags */
  isStandardTag?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Filter by Enabled Tags */
  isTagEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Filter by User Selectable Tags */
  isUserSelectable?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Search Keyword */
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  /** Filter by Tag Slug startswith */
  slug?: InputMaybe<Scalars["String"]["input"]>;
  /** Category ID */
  tagCategoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** Group ID */
  tagGroupId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ManagementTeamMemberListNode = {
  nodes: Array<ManagementTeamMemberNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementTeamMemberNode = {
  avatar?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  lastLoginTime?: Maybe<Scalars["DateTime"]["output"]>;
  managementRoles: Array<Maybe<Scalars["String"]["output"]>>;
  note?: Maybe<Scalars["String"]["output"]>;
  realName?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

export type ManagementTeamMembersInput = {
  limit?: Scalars["Int"]["input"];
  roleGroup?: InputMaybe<ManagementRoleEnum>;
  skip: Scalars["Int"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type ManagementUserDetailNode = {
  avatar?: Maybe<Scalars["String"]["output"]>;
  banInfo?: Maybe<BanInfoNode>;
  contestBan?: Maybe<BanInfoNode>;
  dateJoined: Scalars["DateTime"]["output"];
  discussBanned?: Maybe<Scalars["Boolean"]["output"]>;
  emails?: Maybe<Array<Maybe<EmailNode>>>;
  id: Scalars["ID"]["output"];
  isBanned?: Maybe<Scalars["Boolean"]["output"]>;
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  isInactive?: Maybe<Scalars["Boolean"]["output"]>;
  isSpammer?: Maybe<Scalars["Boolean"]["output"]>;
  isStaff?: Maybe<Scalars["Boolean"]["output"]>;
  isSuperuser?: Maybe<Scalars["Boolean"]["output"]>;
  lastLoginTime?: Maybe<Scalars["DateTime"]["output"]>;
  managementRoles: Array<Maybe<Scalars["String"]["output"]>>;
  otherRoles: Array<Maybe<Scalars["String"]["output"]>>;
  premiumInfos?: Maybe<Array<Maybe<PremiumInfoNode>>>;
  realName?: Maybe<Scalars["String"]["output"]>;
  socialAccounts: Array<SocialAccountNode>;
  stripeCredit?: Maybe<Scalars["Int"]["output"]>;
  stripeCustomeId?: Maybe<Scalars["ID"]["output"]>;
  totalScore: Scalars["Int"]["output"];
  username: Scalars["String"]["output"];
};

export type ManagementUserListNode = {
  nodes: Array<ManagementUserNode>;
  totalNum: Scalars["Int"]["output"];
};

export type ManagementUserNode = {
  avatar?: Maybe<Scalars["String"]["output"]>;
  dateJoined: Scalars["DateTime"]["output"];
  emails?: Maybe<Array<Maybe<EmailNode>>>;
  id: Scalars["ID"]["output"];
  lastLoginTime?: Maybe<Scalars["DateTime"]["output"]>;
  premiumInfos?: Maybe<Array<Maybe<PremiumInfoNode>>>;
  realName?: Maybe<Scalars["String"]["output"]>;
  stripeCustomeId?: Maybe<Scalars["ID"]["output"]>;
  username: Scalars["String"]["output"];
};

export type ManagementUserSimpleNode = {
  avatar?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  realName?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

export type MarkItemComplete = {
  cardId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  newProgress?: Maybe<Scalars["JSONString"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MarkItemIncomplete = {
  cardId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  newProgress?: Maybe<Scalars["JSONString"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MarkSolvedQuestion = {
  ok: Scalars["Boolean"]["output"];
  progressDetail: PlanUserProgressDetailNode;
};

export type MarkSpammers = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MeNode = {
  activeSessionId?: Maybe<Scalars["Int"]["output"]>;
  annualReport?: Maybe<AnnualReportNode>;
  avatar?: Maybe<Scalars["String"]["output"]>;
  checkedInToday?: Maybe<Scalars["Boolean"]["output"]>;
  completedFeatureGuides?: Maybe<Array<Maybe<FeatureGuideType>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  isAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isMockUser: Scalars["Boolean"]["output"];
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isSignedIn?: Maybe<Scalars["Boolean"]["output"]>;
  isStaff?: Maybe<Scalars["Boolean"]["output"]>;
  isSuperuser?: Maybe<Scalars["Boolean"]["output"]>;
  isTranslator?: Maybe<Scalars["Boolean"]["output"]>;
  isVerified?: Maybe<Scalars["Boolean"]["output"]>;
  notificationStatus?: Maybe<UserNotificationNode>;
  optedIn?: Maybe<Scalars["Boolean"]["output"]>;
  permissions?: Maybe<Array<Maybe<AllPermission>>>;
  realName?: Maybe<Scalars["String"]["output"]>;
  region?: Maybe<Scalars["String"]["output"]>;
  requestRegion?: Maybe<Scalars["String"]["output"]>;
  socketToken?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["Int"]["output"]>;
  userSlug?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type MedalBriefNode = {
  awardDescription: Scalars["String"]["output"];
  config: MedalConfigNode;
  name: Scalars["String"]["output"];
  obtainDescription: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type MedalConfigNode = {
  /** The original image URL of the medal */
  icon?: Maybe<Scalars["String"]["output"]>;
  /** GIF URL of the medal */
  iconGif?: Maybe<Scalars["String"]["output"]>;
  /** GIF background URL of the medal */
  iconGifBackground?: Maybe<Scalars["String"]["output"]>;
  /** URL of the medal wearing picture */
  iconWearing?: Maybe<Scalars["String"]["output"]>;
};

export type MedalNode = {
  awardDescription: Scalars["String"]["output"];
  config: MedalConfigNode;
  name: Scalars["String"]["output"];
  obtainDescription: Scalars["String"]["output"];
  shortName?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
};

export type MigrateDiscussionToSolution = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type MigrateSolutionToDiscussion = {
  comment?: Maybe<CommentNode>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MockUser = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ModifyIdeDynamicLayout = {
  error?: Maybe<Scalars["String"]["output"]>;
  layout?: Maybe<IdeDynamicLayoutNode>;
  ok: Scalars["Boolean"]["output"];
};

export type MoveTopic = {
  categorySlugs?: Maybe<Array<Scalars["String"]["output"]>>;
  topic?: Maybe<TopicNode>;
};

export type Mutation = {
  acceptAchievementReward?: Maybe<AcceptAchievementReward>;
  acceptContribution?: Maybe<AcceptContribution>;
  addFavoriteToMyCollectionV2?: Maybe<AddFavoriteToMyCollectionV2>;
  addOrUpdateCodeInPlayground?: Maybe<AddOrUpdateCodeInPlayground>;
  addQuestionToDefaultFavoriteV2?: Maybe<AddQuestionToDefaultFavoriteV2>;
  addQuestionToFavorite?: Maybe<AddQuestionToFavorite>;
  addQuestionToFavoriteV2?: Maybe<AddQuestionToFavoriteV2>;
  addQuestionToNewFavorite?: Maybe<AddQuestionToNewFavorite>;
  addQuestionToNewFavoriteV2?: Maybe<AddQuestionToNewFavoriteV2>;
  addUserToInternalContest?: Maybe<AddUserToInternalContest>;
  applyTimeTravelTicket?: Maybe<ApplyTimeTravelTicket>;
  applyTimeTravelTicketV2?: Maybe<ApplyTimeTravelTicketV2>;
  approveComment?: Maybe<ApproveComment>;
  approveComments?: Maybe<ApproveComments>;
  approveContestReports?: Maybe<ApproveContestReports>;
  approveReportedPosts?: Maybe<ApproveReportedPost>;
  approveTopic?: Maybe<ApproveTopic>;
  approveTopics?: Maybe<ApproveTopics>;
  archiveUser?: Maybe<ArchiveUser>;
  awardInternalContestCoin?: Maybe<AwardInternalContestCoin>;
  banIp?: Maybe<BanIp>;
  banUser?: Maybe<BanUser>;
  batchReviewFlaggedObjects?: Maybe<BatchReviewFlaggedObjects>;
  btsEventNotification?: Maybe<BtsEventNotification>;
  btsReferralRegister?: Maybe<BtsReferralRegister>;
  /** 取消注销账户请求 */
  cancelDeleteAccount?: Maybe<AuthCancelDeleteAccount>;
  checkin?: Maybe<Checkin>;
  collectContestEasterEgg?: Maybe<CollectContestEasterEgg>;
  commentContribution?: Maybe<CommentContribution>;
  completeFeatureGuide?: Maybe<CompleteFeatureGuide>;
  completeSurvey?: Maybe<CompleteSurvey>;
  confirmSchoolLogo?: Maybe<ConfirmSchoolLogo>;
  createCodeErrorHint?: Maybe<CreateCodeErrorHint>;
  createComment?: Maybe<CreateComment>;
  createCompletionLike?: Maybe<CreateCompletionLike>;
  createContribution?: Maybe<CreateContribution>;
  createEmail?: Maybe<CreateEmail>;
  createIdeDynamicLayout?: Maybe<CreateIdeDynamicLayout>;
  createOrUpdateEmailEvent?: Maybe<CreateOrUpdateEmailEvent>;
  createOrUpdateOfficialSolutionFeedback?: Maybe<CreateOrUpdateEditorialFeedback>;
  /** obtain the new annual medals */
  createOrUpdateUserYearlyMedals?: Maybe<CreateOrUpdateUserYearlyMedals>;
  createPlayground?: Maybe<CreatePlayground>;
  createPlaygroundFolder?: Maybe<CreatePlaygroundFolder>;
  createTopic?: Maybe<CreateTopic>;
  createTopicForContest?: Maybe<CreateTopicForContest>;
  createTopicForQuestion?: Maybe<CreateTopicForQuestion>;
  createTopicWithCategory?: Maybe<CreateTopicWithCategory>;
  /** user apply to delete account, account gets frozen after success */
  deleteAccount?: Maybe<DeleteAccount>;
  /** user apply to delete account, account gets frozen after success */
  deleteAccountV2?: Maybe<DeleteAccountV2>;
  deleteCodeFromPlayground?: Maybe<DeleteCodeFromPlayground>;
  deleteComment?: Maybe<DeleteComment>;
  deleteComments?: Maybe<DeleteComments>;
  deleteEducation?: Maybe<DeleteEducation>;
  deleteEmail?: Maybe<DeleteEmail>;
  deleteFavoriteV2?: Maybe<DeleteFavoriteV2>;
  deleteIdeDynamicLayout?: Maybe<DeleteIdeDynamicLayout>;
  deleteNote?: Maybe<DeleteNote>;
  deleteOccupation?: Maybe<DeleteOccupation>;
  deletePlayground?: Maybe<DeletePlayground>;
  deletePlaygroundFolder?: Maybe<DeletePlaygroundFolder>;
  deleteReportedPosts?: Maybe<DeleteReportedPost>;
  deleteSocial?: Maybe<DeleteSocial>;
  deleteTeamMember?: Maybe<DeleteTeamMember>;
  deleteTopic?: Maybe<DeleteTopic>;
  deleteTopics?: Maybe<DeleteTopics>;
  discountEventRegister?: Maybe<DiscountEventRegister>;
  endDebuggerSession?: Maybe<EndSession>;
  executeScript?: Maybe<ExecuteScript>;
  flagPost?: Maybe<FlagPost>;
  flagSetContentStatus?: Maybe<FlagSetContentStatus>;
  flagSomething?: Maybe<FlagSomething>;
  forkFavoriteV2?: Maybe<ForkFavoriteV2>;
  getOrCreateExploreSession?: Maybe<GetOrCreateExploreSession>;
  handleUserReports?: Maybe<HandleUserReports>;
  hideComments?: Maybe<HideComments>;
  hidePost?: Maybe<HidePost>;
  hideTopicFromTrending?: Maybe<HideTopicFromTrending>;
  hideTopics?: Maybe<HideTopics>;
  hitResource?: Maybe<HitResource>;
  interviewEnd?: Maybe<InterviewEnd>;
  interviewStart?: Maybe<InterviewStart>;
  interviewedStatsPost?: Maybe<InterviewedStatsPost>;
  /** join a study plan */
  joinStudyPlan?: Maybe<JoinStudyPlan>;
  libraryDefinitionSave?: Maybe<LibraryDefinitionSave>;
  libraryDraftDelete?: Maybe<LibraryDraftDelete>;
  libraryFrontendQuestionIdChange?: Maybe<LibraryFrontendQuestionIdChange>;
  libraryGenerateSampleTestcase?: Maybe<LibraryGenerateSampleTestcase>;
  libraryMultiTestcaseSave?: Maybe<LibraryMultiTestcaseSave>;
  librarySetHide?: Maybe<LibrarySetHide>;
  librarySetPerm?: Maybe<LibrarySetPerm>;
  librarySolutionDelete?: Maybe<LibrarySolutionDelete>;
  librarySolutionSave?: Maybe<LibrarySolutionSave>;
  librarySolutionsOrderSave?: Maybe<LibrarySolutionsOrderSave>;
  librarySolutionsSave?: Maybe<LibrarySolutionsSave>;
  libraryStatementSave?: Maybe<LibraryStatementSave>;
  libraryTestcaseSave?: Maybe<LibraryTestcaseSave>;
  libraryValidatorSave?: Maybe<LibraryValidatorSave>;
  like?: Maybe<Like>;
  managementAddInterviewedStatVote?: Maybe<ManagementAddInterviewedStatVote>;
  managementAddOrEditTag?: Maybe<ManagementAddOrEditTag>;
  managementAddOrEditTagCategory?: Maybe<ManagementAddOrEditTagCategory>;
  managementRemoveTagCategoryToTag?: Maybe<ManagementRemoveTagCategoryToTag>;
  managementSetNonofficialTagSimilar?: Maybe<ManagementSetNonofficialTagSimilar>;
  markItemComplete?: Maybe<MarkItemComplete>;
  markItemIncomplete?: Maybe<MarkItemIncomplete>;
  markSolvedQuestion?: Maybe<MarkSolvedQuestion>;
  markSpammers?: Maybe<MarkSpammers>;
  migrateDiscussionToSolution?: Maybe<MigrateDiscussionToSolution>;
  migrateSolutionToDiscussion?: Maybe<MigrateSolutionToDiscussion>;
  mockUser?: Maybe<MockUser>;
  modifyIdeDynamicLayout?: Maybe<ModifyIdeDynamicLayout>;
  moveTopic?: Maybe<MoveTopic>;
  /** online management generate favorite */
  omGenerateFavorite?: Maybe<OmGenerateFavorite>;
  /** online management remove question from favorite */
  omRemoveQuestionFromFavorite?: Maybe<OmRemoveQuestionFromFavorite>;
  /** online management update favorite */
  omUpdateFavorite?: Maybe<OmUpdateFavorite>;
  openNotifications?: Maybe<OpenNotifications>;
  optInOrOutDynamicLayoutFeature?: Maybe<OptInOrOutDynamicLayoutFeature>;
  optInOrOutOfPremiumFeature?: Maybe<OptInOrOutPremiumFeature>;
  performNotificationAction?: Maybe<PerformNotificationAction>;
  planStartProgress?: Maybe<StartProgress>;
  publishContestAnnouncement?: Maybe<PublishContestAnnouncement>;
  publishSolution?: Maybe<PublishSolution>;
  /** quit a study plan */
  quitStudyPlan?: Maybe<QuitStudyPlan>;
  rateArticle?: Maybe<RateArticle>;
  recordAbExperimentEvent?: Maybe<RecordAbExperimentEvent>;
  rejectContestReports?: Maybe<RejectContestReports>;
  rejectContribution?: Maybe<RejectContribution>;
  removeFavoriteFromMyCollectionV2?: Maybe<RemoveFavoriteFromMyCollectionV2>;
  removeQuestionFromFavorite?: Maybe<RemoveQuestionFromFavorite>;
  removeQuestionFromFavoriteV2?: Maybe<RemoveQuestionFromFavoriteV2>;
  removeUsersFromInternalContest?: Maybe<RemoveUsersFromInternalContest>;
  reorderFavoriteQuestionV2?: Maybe<ReorderFavoriteQuestionV2>;
  reportUser?: Maybe<ReportUser>;
  requestAnalysisEmail?: Maybe<RequestAnalysisEmail>;
  requestUpdateToReportedPosts?: Maybe<RequestUpdateToReportedPost>;
  resetFavoriteSessionV2?: Maybe<ResetFavoriteSessionV2>;
  resetWeeklyTaskSchedule?: Maybe<ResetWeeklyTaskSchedule>;
  rewardPostCoins?: Maybe<RewardPost>;
  runDebuggerCommand?: Maybe<RunDebuggerCommand>;
  saveSessionCode?: Maybe<SaveSessionCode>;
  sendAccountRecoveryEmail?: Maybe<SendAccountRecoveryEmail>;
  sendInternalContestEmail?: Maybe<SendInternalContestEmail>;
  sendVerificationEmail?: Maybe<SendVerificationEmail>;
  setBlacklist?: Maybe<SetBlacklistWords>;
  setItemStartTime?: Maybe<SetItemStartTime>;
  setNotificationSetting?: Maybe<SetNotificationSetting>;
  /** whether hide current user rank info on rank boards */
  setVisibleOnPlanRank?: Maybe<SetVisibleOnPlanRank>;
  startDebuggerSession?: Maybe<StartSession>;
  storeAdminCreateOrder?: Maybe<StoreAdminCreateOrder>;
  storeOrderEdit?: Maybe<StoreOrderEdit>;
  storeOrderSave?: Maybe<StoreOrderSave>;
  /** comment submission complexity */
  submissionNoteComplexity?: Maybe<SubmissionNoteComplexity>;
  /** vote submission complexity */
  submissionVoteComplexity?: Maybe<SubmissionVoteComplexity>;
  submitCancelSurvey?: Maybe<SubmitCancelSurvey>;
  submitQuestionSatisfactionSurvey?: Maybe<SubmitQuestionSatisfactionSurvey>;
  submitQuestionSuggestion?: Maybe<SubmitQuestionSuggestion>;
  submitSubscriptionSurvey?: Maybe<SubmitSubscriptionSurvey>;
  submitSurveyV2?: Maybe<SubmitSurveyV2>;
  subscribeTopic?: Maybe<SubscribeTopic>;
  subscriptionViewCountIncrement?: Maybe<SubscriptionViewCountIncrement>;
  tagSearchHit?: Maybe<TagSearchHit>;
  toggleContestDynamicLayout?: Maybe<ToggleContestDynamicLayout>;
  toggleContestRankingDynamicLayout?: Maybe<ToggleContestRankingDynamicLayout>;
  toggleFavorite?: Maybe<ToggleFavorite>;
  toggleFavoriteSolution?: Maybe<ToggleFavoriteSolution>;
  togglePinComment?: Maybe<TogglePinComment>;
  togglePinTopic?: Maybe<TogglePinTopic>;
  unlockFavorite?: Maybe<UnlockFavorite>;
  unlockShareEvent?: Maybe<UnlockShareEvent>;
  unpublishContestAnnouncement?: Maybe<UnpublishContestAnnouncement>;
  upcSubmitResponse?: Maybe<UpcSubmitResponse>;
  upcV2SubmitSurvey?: Maybe<UpcV2SubmitSurvey>;
  updateAnnualReportViewStatus?: Maybe<UpdateAnnualReportViewStatus>;
  updateAvatarStatus?: Maybe<UpdateUserAvatarStatus>;
  updateBetaParticipation?: Maybe<UpdateBetaParticipation>;
  updateComment?: Maybe<UpdateComment>;
  updateContribution?: Maybe<UpdateContribution>;
  updateEducation?: Maybe<UpdateEducation>;
  updateEmailPrimary?: Maybe<UpdateEmailPrimary>;
  updateFavoriteEmojiBackgroundV2?: Maybe<UpdateFavoriteEmojiBackgroundV2>;
  updateFavoriteIsPublicV2?: Maybe<UpdateFavoriteIsPublicV2>;
  updateFavoriteNameDescriptionV2?: Maybe<UpdateFavoriteNameDescriptionV2>;
  updateInvalidUsername?: Maybe<UpdateInvalidUsername>;
  updateNote?: Maybe<UpdateNote>;
  updateOccupation?: Maybe<UpdateOccupation>;
  updatePassword?: Maybe<UpdatePassword>;
  updatePlayground?: Maybe<UpdatePlayground>;
  updatePlaygroundFolder?: Maybe<UpdatePlaygroundFolder>;
  updateProblematicPost?: Maybe<UpdateProblematicPost>;
  updateProfile?: Maybe<UpdateProfile>;
  updateProfileV3?: Maybe<UpdateProfileV3>;
  updatePublicBadge?: Maybe<UpdatePublicBadge>;
  updateSolution?: Maybe<UpdateSolution>;
  updateSubmissionNote?: Maybe<UpdateSubmissionNote>;
  updateSyncedCode?: Maybe<UpdateSyncedCode>;
  updateTeamMember?: Maybe<UpdateTeamMember>;
  updateTopic?: Maybe<UpdateTopic>;
  updateTopicWithCategory?: Maybe<UpdateTopicWithCategory>;
  updateUsername?: Maybe<UpdateUsername>;
  userManagementApplyForPremiumTrial?: Maybe<UmApplyForPremiumTrial>;
  userManagementBanIp?: Maybe<UmBanIp>;
  userManagementBanUser?: Maybe<UmBanUser>;
  userManagementCreateScore?: Maybe<UmCreateScore>;
  userManagementDeleteUserCreditCard?: Maybe<UmDeleteUserCreditCard>;
  userManagementEditIpStatus?: Maybe<UmEditIpStatus>;
  userManagementSendVerificationEmail?: Maybe<UmSendVerificationEmail>;
  userManagementSetEmailPrimary?: Maybe<UmSetEmailPrimary>;
  userUploadSchoolLogo?: Maybe<UserUploadSchoolLogo>;
  votePost?: Maybe<VotePost>;
};

export type MutationAcceptAchievementRewardArgs = {
  achievementName: Scalars["String"]["input"];
};

export type MutationAcceptContributionArgs = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  contributionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationAddFavoriteToMyCollectionV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationAddOrUpdateCodeInPlaygroundArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddQuestionToDefaultFavoriteV2Args = {
  questionSlug: Scalars["String"]["input"];
};

export type MutationAddQuestionToFavoriteArgs = {
  favoriteIdHash?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddQuestionToFavoriteV2Args = {
  favoriteSlug: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
};

export type MutationAddQuestionToNewFavoriteArgs = {
  isPublicFavorite?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationAddQuestionToNewFavoriteV2Args = {
  isPublicFavorite: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
};

export type MutationAddUserToInternalContestArgs = {
  userInput?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationApplyTimeTravelTicketArgs = {
  itemId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationApplyTimeTravelTicketV2Args = {
  challengeQuestionId: Scalars["ID"]["input"];
  submissionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationApproveCommentArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationApproveCommentsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationApproveContestReportsArgs = {
  reportIds: Array<InputMaybe<Scalars["String"]["input"]>>;
};

export type MutationApproveReportedPostsArgs = {
  postIds: Array<InputMaybe<Scalars["Int"]["input"]>>;
};

export type MutationApproveTopicArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationApproveTopicsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationArchiveUserArgs = {
  reason?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type MutationAwardInternalContestCoinArgs = {
  coins?: InputMaybe<Scalars["Int"]["input"]>;
  contestSlug?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationBanIpArgs = {
  banTypeSlug: Scalars["String"]["input"];
  ipAddress: Scalars["String"]["input"];
};

export type MutationBanUserArgs = {
  banTypeSlug: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationBatchReviewFlaggedObjectsArgs = {
  data: BatchReviewFlaggedObjectsInput;
};

export type MutationBtsEventNotificationArgs = {
  enable: Scalars["Boolean"]["input"];
};

export type MutationBtsReferralRegisterArgs = {
  refer: Scalars["String"]["input"];
};

export type MutationCommentContributionArgs = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  contributionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationCompleteFeatureGuideArgs = {
  guideType: FeatureGuideType;
};

export type MutationCompleteSurveyArgs = {
  response?: InputMaybe<Scalars["JSONString"]["input"]>;
  surveyType: SurveyType;
};

export type MutationConfirmSchoolLogoArgs = {
  schoolId: Scalars["Int"]["input"];
};

export type MutationCreateCodeErrorHintArgs = {
  code: Scalars["String"]["input"];
  codeOutput: Scalars["String"]["input"];
  lang: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
  status: Scalars["Int"]["input"];
};

export type MutationCreateCommentArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  intentionTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  mentionedUserSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  parentCommentId?: InputMaybe<Scalars["Int"]["input"]>;
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationCreateCompletionLikeArgs = {
  completionId: Scalars["ID"]["input"];
  isLike: Scalars["Boolean"]["input"];
};

export type MutationCreateContributionArgs = {
  contributionType?: InputMaybe<Scalars["String"]["input"]>;
  payload?: InputMaybe<Scalars["JSONString"]["input"]>;
};

export type MutationCreateEmailArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateIdeDynamicLayoutArgs = {
  layoutJson: Scalars["String"]["input"];
  layoutName: Scalars["String"]["input"];
};

export type MutationCreateOrUpdateEmailEventArgs = {
  data?: InputMaybe<Scalars["String"]["input"]>;
  eventId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationCreateOrUpdateOfficialSolutionFeedbackArgs = {
  additionalComment?: InputMaybe<Scalars["String"]["input"]>;
  optionIds: Array<InputMaybe<Scalars["Int"]["input"]>>;
  questionSlug: Scalars["String"]["input"];
  score: Scalars["Int"]["input"];
};

export type MutationCreateOrUpdateUserYearlyMedalsArgs = {
  medalSlugs: Array<InputMaybe<Scalars["String"]["input"]>>;
};

export type MutationCreatePlaygroundArgs = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  selectedLang?: InputMaybe<Scalars["String"]["input"]>;
  testcaseInput?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreatePlaygroundFolderArgs = {
  folderName?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateTopicArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateTopicForContestArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  contestTitleSlug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateTopicForQuestionArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateTopicWithCategoryArgs = {
  anonymous?: InputMaybe<Scalars["Boolean"]["input"]>;
  categorySlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteAccountArgs = {
  data: DeleteAccountInput;
};

export type MutationDeleteAccountV2Args = {
  data: DeleteAccountInputV2;
};

export type MutationDeleteCodeFromPlaygroundArgs = {
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteCommentArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeleteCommentsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationDeleteEducationArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeleteEmailArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteFavoriteV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationDeleteIdeDynamicLayoutArgs = {
  layoutId: Scalars["String"]["input"];
};

export type MutationDeleteNoteArgs = {
  titleSlug: Scalars["String"]["input"];
};

export type MutationDeleteOccupationArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeletePlaygroundArgs = {
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeletePlaygroundFolderArgs = {
  folder?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteReportedPostsArgs = {
  postIds: Array<InputMaybe<Scalars["Int"]["input"]>>;
};

export type MutationDeleteSocialArgs = {
  provider?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeleteTeamMemberArgs = {
  username: Scalars["String"]["input"];
};

export type MutationDeleteTopicArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeleteTopicsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationDiscountEventRegisterArgs = {
  discountEventReferral: Scalars["String"]["input"];
};

export type MutationEndDebuggerSessionArgs = {
  sessionUuid: Scalars["String"]["input"];
};

export type MutationExecuteScriptArgs = {
  id: Scalars["Int"]["input"];
  inputJson: Scalars["String"]["input"];
};

export type MutationFlagPostArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  flagType: ReportTypeEnum;
  postId: Scalars["Int"]["input"];
};

export type MutationFlagSetContentStatusArgs = {
  data: ReviewFlaggedObjectInput;
};

export type MutationFlagSomethingArgs = {
  data: FlagInput;
};

export type MutationForkFavoriteV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationGetOrCreateExploreSessionArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationHandleUserReportsArgs = {
  resetAvatar?: InputMaybe<Scalars["Boolean"]["input"]>;
  resetUsername?: InputMaybe<Scalars["Boolean"]["input"]>;
  userSlug?: InputMaybe<Scalars["String"]["input"]>;
  userSlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationHideCommentsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationHidePostArgs = {
  hide: Scalars["Boolean"]["input"];
  postId: Scalars["Int"]["input"];
};

export type MutationHideTopicFromTrendingArgs = {
  hide: Scalars["Boolean"]["input"];
  topicId: Scalars["Int"]["input"];
};

export type MutationHideTopicsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationHitResourceArgs = {
  entityId: Scalars["ID"]["input"];
  entityType: EntityType;
};

export type MutationInterviewStartArgs = {
  cardId: Scalars["ID"]["input"];
};

export type MutationInterviewedStatsPostArgs = {
  interviewedStats: InterviewedStatsInput;
};

export type MutationJoinStudyPlanArgs = {
  planSlug: Scalars["String"]["input"];
  weeklyTaskSchedule?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type MutationLibraryDefinitionSaveArgs = {
  codeDefinitions?: InputMaybe<Scalars["JSONString"]["input"]>;
  customLimits?: InputMaybe<Scalars["JSONString"]["input"]>;
  customMatcher?: InputMaybe<Scalars["String"]["input"]>;
  drivers?: InputMaybe<Scalars["JSONString"]["input"]>;
  frontendPreviews?: InputMaybe<Scalars["JSONString"]["input"]>;
  hasFrontendPreview?: InputMaybe<Scalars["Boolean"]["input"]>;
  matchType?: InputMaybe<Scalars["Int"]["input"]>;
  metadata?: InputMaybe<Scalars["String"]["input"]>;
  questionId: Scalars["ID"]["input"];
};

export type MutationLibraryDraftDeleteArgs = {
  questionId: Scalars["ID"]["input"];
};

export type MutationLibraryFrontendQuestionIdChangeArgs = {
  frontendQuestionId: Scalars["ID"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationLibraryGenerateSampleTestcaseArgs = {
  count: Scalars["Int"]["input"];
  expectedOutput: Scalars["String"]["input"];
  inputRaw: Scalars["String"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationLibraryMultiTestcaseSaveArgs = {
  questionId: Scalars["ID"]["input"];
  sampleTestcase: Scalars["String"]["input"];
  testcaseList: Array<LibraryMultiTestcaseInput>;
};

export type MutationLibrarySetHideArgs = {
  hide: Scalars["Boolean"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationLibrarySetPermArgs = {
  canEdit: Scalars["Boolean"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationLibrarySolutionDeleteArgs = {
  questionId: Scalars["ID"]["input"];
  solutionId: Scalars["ID"]["input"];
};

export type MutationLibrarySolutionSaveArgs = {
  code: Scalars["String"]["input"];
  complexity: Scalars["String"]["input"];
  expectedStatus: Scalars["Int"]["input"];
  isModelSolution?: InputMaybe<Scalars["Boolean"]["input"]>;
  lang: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  questionId: Scalars["ID"]["input"];
  solutionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationLibrarySolutionsOrderSaveArgs = {
  questionId: Scalars["ID"]["input"];
  solutions?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type MutationLibrarySolutionsSaveArgs = {
  questionId: Scalars["ID"]["input"];
  solutionsInput?: InputMaybe<Array<InputMaybe<LibrarySolutionsInput>>>;
};

export type MutationLibraryStatementSaveArgs = {
  attachments?: InputMaybe<Array<QuestionAttachmentInput>>;
  content: Scalars["String"]["input"];
  difficulty: Scalars["Int"]["input"];
  followup: Scalars["String"]["input"];
  questionId?: InputMaybe<Scalars["ID"]["input"]>;
  questionTypes?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type MutationLibraryTestcaseSaveArgs = {
  expectedOutput: Scalars["String"]["input"];
  inputRaw: Scalars["String"]["input"];
  questionId: Scalars["ID"]["input"];
  sampleTestcase: Scalars["String"]["input"];
};

export type MutationLibraryValidatorSaveArgs = {
  code: Scalars["String"]["input"];
  driver: Scalars["String"]["input"];
  note: Scalars["String"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationLikeArgs = {
  isLike?: InputMaybe<Scalars["Boolean"]["input"]>;
  titleSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationManagementAddInterviewedStatVoteArgs = {
  data: ManagementAddInterviewedStatVoteInput;
};

export type MutationManagementAddOrEditTagArgs = {
  data: ManagementAddOrEditTagInput;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationManagementAddOrEditTagCategoryArgs = {
  data: ManagementAddOrEditTagCategoryInput;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationManagementRemoveTagCategoryToTagArgs = {
  tagCategoryId: Scalars["ID"]["input"];
  tagId: Scalars["ID"]["input"];
};

export type MutationManagementSetNonofficialTagSimilarArgs = {
  childId: Scalars["ID"]["input"];
  parentId: Scalars["ID"]["input"];
};

export type MutationMarkItemCompleteArgs = {
  itemId?: InputMaybe<Scalars["String"]["input"]>;
  submissionId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationMarkItemIncompleteArgs = {
  itemId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationMarkSolvedQuestionArgs = {
  planSlug: Scalars["String"]["input"];
  titleSlug: Scalars["String"]["input"];
};

export type MutationMarkSpammersArgs = {
  isSpammer: Scalars["Boolean"]["input"];
  usernames: Array<InputMaybe<Scalars["String"]["input"]>>;
};

export type MutationMigrateDiscussionToSolutionArgs = {
  commentId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationMigrateSolutionToDiscussionArgs = {
  topicId: Scalars["Int"]["input"];
};

export type MutationMockUserArgs = {
  usernameToMock?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationModifyIdeDynamicLayoutArgs = {
  layoutId: Scalars["String"]["input"];
  layoutJson?: InputMaybe<Scalars["String"]["input"]>;
  layoutName?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationMoveTopicArgs = {
  categoryId: Scalars["Int"]["input"];
  topicId: Scalars["Int"]["input"];
};

export type MutationOmGenerateFavoriteArgs = {
  difficultyTagSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  favoriteDescription?: InputMaybe<Scalars["String"]["input"]>;
  favoriteName: Scalars["String"]["input"];
  favoriteSlug: Scalars["String"]["input"];
  favoriteType: FavoriteTypeEnum;
  isPublic: Scalars["Boolean"]["input"];
  knowledgeTagSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  languageTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  questionIdListStr?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationOmRemoveQuestionFromFavoriteArgs = {
  favoriteSlug: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
};

export type MutationOmUpdateFavoriteArgs = {
  favoriteDescription?: InputMaybe<Scalars["String"]["input"]>;
  favoriteName?: InputMaybe<Scalars["String"]["input"]>;
  favoriteSlug?: InputMaybe<Scalars["String"]["input"]>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  questionIdListStr?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationOptInOrOutDynamicLayoutFeatureArgs = {
  optIn: Scalars["Boolean"]["input"];
};

export type MutationOptInOrOutOfPremiumFeatureArgs = {
  featureId: Scalars["Int"]["input"];
  optIn: Scalars["Boolean"]["input"];
};

export type MutationPerformNotificationActionArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationPlanStartProgressArgs = {
  planSlug: Scalars["String"]["input"];
};

export type MutationPublishContestAnnouncementArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationPublishSolutionArgs = {
  content: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
  tags: Array<InputMaybe<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type MutationQuitStudyPlanArgs = {
  planSlug: Scalars["String"]["input"];
};

export type MutationRateArticleArgs = {
  contentTypeId: Scalars["ID"]["input"];
  objectId: Scalars["ID"]["input"];
  score: Scalars["Int"]["input"];
};

export type MutationRecordAbExperimentEventArgs = {
  experimentKey: Scalars["String"]["input"];
  featureId: Scalars["String"]["input"];
  identifierType: Scalars["String"]["input"];
  identifierValue?: InputMaybe<Scalars["String"]["input"]>;
  variationId: Scalars["Int"]["input"];
  variationValue: Scalars["String"]["input"];
};

export type MutationRejectContestReportsArgs = {
  reportIds: Array<InputMaybe<Scalars["String"]["input"]>>;
};

export type MutationRejectContributionArgs = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  contributionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRemoveFavoriteFromMyCollectionV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationRemoveQuestionFromFavoriteArgs = {
  favoriteIdHash?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRemoveQuestionFromFavoriteV2Args = {
  favoriteSlug: Scalars["String"]["input"];
  questionSlug: Scalars["String"]["input"];
};

export type MutationRemoveUsersFromInternalContestArgs = {
  userIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type MutationReorderFavoriteQuestionV2Args = {
  favoriteSlug: Scalars["String"]["input"];
  moveToBottom?: InputMaybe<Scalars["Boolean"]["input"]>;
  moveToTop?: InputMaybe<Scalars["Boolean"]["input"]>;
  questionSlug: Scalars["String"]["input"];
  reorderNewIndex?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationReportUserArgs = {
  message?: InputMaybe<Scalars["String"]["input"]>;
  userSlug: Scalars["String"]["input"];
};

export type MutationRequestAnalysisEmailArgs = {
  sessionId: Scalars["ID"]["input"];
};

export type MutationRequestUpdateToReportedPostsArgs = {
  postIds: Array<InputMaybe<Scalars["Int"]["input"]>>;
};

export type MutationResetFavoriteSessionV2Args = {
  deleteSyncedCode?: InputMaybe<Scalars["Boolean"]["input"]>;
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationResetWeeklyTaskScheduleArgs = {
  planSlug: Scalars["String"]["input"];
  weeklyTaskSchedule: Array<Scalars["Int"]["input"]>;
};

export type MutationRewardPostCoinsArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
  numCoins?: InputMaybe<Scalars["Int"]["input"]>;
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRunDebuggerCommandArgs = {
  command: Scalars["JSONString"]["input"];
  sessionUuid: Scalars["String"]["input"];
};

export type MutationSaveSessionCodeArgs = {
  code: Scalars["String"]["input"];
  questionId: Scalars["ID"]["input"];
};

export type MutationSendAccountRecoveryEmailArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSendInternalContestEmailArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type MutationSendVerificationEmailArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSetBlacklistArgs = {
  words?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSetItemStartTimeArgs = {
  itemId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSetNotificationSettingArgs = {
  channelIdentifier?: InputMaybe<Scalars["String"]["input"]>;
  notificationIdentifier?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationSetVisibleOnPlanRankArgs = {
  hideOnBoard: Scalars["Boolean"]["input"];
};

export type MutationStartDebuggerSessionArgs = {
  commands: Array<InputMaybe<Scalars["JSONString"]["input"]>>;
  language: Scalars["String"]["input"];
  questionId: Scalars["String"]["input"];
  queueName?: InputMaybe<Scalars["String"]["input"]>;
  testMode?: InputMaybe<Scalars["Boolean"]["input"]>;
  testcaseInput: Scalars["String"]["input"];
  typedCode: Scalars["String"]["input"];
};

export type MutationStoreAdminCreateOrderArgs = {
  input: StoreAdminCreateOrderInput;
};

export type MutationStoreOrderEditArgs = {
  id: Scalars["ID"]["input"];
  noteByStaff?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<UmStoreOrderStatusEnum>;
  trackingId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationStoreOrderSaveArgs = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  details?: InputMaybe<Scalars["JSONString"]["input"]>;
  fullName?: InputMaybe<Scalars["String"]["input"]>;
  item: Scalars["String"]["input"];
  note?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  province?: InputMaybe<Scalars["String"]["input"]>;
  shirtSize?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSubmissionNoteComplexityArgs = {
  complexityType: ComplexityTypeEnum;
  note: Scalars["String"]["input"];
  submissionId: Scalars["ID"]["input"];
};

export type MutationSubmissionVoteComplexityArgs = {
  complexityType: ComplexityTypeEnum;
  submissionId: Scalars["ID"]["input"];
  vote: ComplexityVoteEnum;
};

export type MutationSubmitCancelSurveyArgs = {
  answers?: InputMaybe<Array<Scalars["JSONString"]["input"]>>;
};

export type MutationSubmitQuestionSatisfactionSurveyArgs = {
  cancelled: Scalars["Boolean"]["input"];
  completedAllQuestions: Scalars["Boolean"]["input"];
  completedRequiredQuestions: Scalars["Boolean"]["input"];
  surveyResponse: Scalars["JSONString"]["input"];
};

export type MutationSubmitQuestionSuggestionArgs = {
  checkedDictStr: Scalars["String"]["input"];
  comment?: InputMaybe<Scalars["String"]["input"]>;
  questionId: Scalars["Int"]["input"];
};

export type MutationSubmitSubscriptionSurveyArgs = {
  answers?: InputMaybe<Array<Scalars["JSONString"]["input"]>>;
};

export type MutationSubmitSurveyV2Args = {
  cancelled: Scalars["Boolean"]["input"];
  completedAllQuestions: Scalars["Boolean"]["input"];
  completedRequiredQuestions: Scalars["Boolean"]["input"];
  surveyResponse: Scalars["JSONString"]["input"];
  surveySlug: Scalars["String"]["input"];
};

export type MutationSubscribeTopicArgs = {
  subscribe?: InputMaybe<Scalars["Boolean"]["input"]>;
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationSubscriptionViewCountIncrementArgs = {
  ref?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationTagSearchHitArgs = {
  tagSlug: Scalars["String"]["input"];
};

export type MutationToggleContestDynamicLayoutArgs = {
  enable?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationToggleContestRankingDynamicLayoutArgs = {
  enable?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationToggleFavoriteArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationToggleFavoriteSolutionArgs = {
  isFavorite: Scalars["Boolean"]["input"];
  topicId: Scalars["Int"]["input"];
};

export type MutationTogglePinCommentArgs = {
  commentId?: InputMaybe<Scalars["Int"]["input"]>;
  pinned?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationTogglePinTopicArgs = {
  pinned?: InputMaybe<Scalars["Boolean"]["input"]>;
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationUnlockFavoriteArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationUnlockShareEventArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUnpublishContestAnnouncementArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationUpcSubmitResponseArgs = {
  response?: InputMaybe<Scalars["JSONString"]["input"]>;
  type: UpcResponseType;
};

export type MutationUpcV2SubmitSurveyArgs = {
  data: UpcV2SubmitSurveyInput;
};

export type MutationUpdateAnnualReportViewStatusArgs = {
  viewed: Scalars["Boolean"]["input"];
};

export type MutationUpdateAvatarStatusArgs = {
  viewedSlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdateBetaParticipationArgs = {
  optIn: Scalars["Boolean"]["input"];
  participationType?: InputMaybe<Type>;
};

export type MutationUpdateCommentArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationUpdateContributionArgs = {
  applicationId?: InputMaybe<Scalars["ID"]["input"]>;
  contributionId?: InputMaybe<Scalars["ID"]["input"]>;
  contributionType?: InputMaybe<Scalars["String"]["input"]>;
  payload?: InputMaybe<Scalars["JSONString"]["input"]>;
};

export type MutationUpdateEducationArgs = {
  degree?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  schoolName?: InputMaybe<Scalars["String"]["input"]>;
  startTime?: InputMaybe<Scalars["String"]["input"]>;
  toPresent?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationUpdateEmailPrimaryArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateFavoriteEmojiBackgroundV2Args = {
  backgroundColor?: InputMaybe<Scalars["String"]["input"]>;
  emoji?: InputMaybe<Scalars["String"]["input"]>;
  favoriteSlug: Scalars["String"]["input"];
};

export type MutationUpdateFavoriteIsPublicV2Args = {
  favoriteSlug: Scalars["String"]["input"];
  isPublic: Scalars["Boolean"]["input"];
};

export type MutationUpdateFavoriteNameDescriptionV2Args = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  favoriteSlug: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUpdateInvalidUsernameArgs = {
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateNoteArgs = {
  content: Scalars["String"]["input"];
  titleSlug: Scalars["String"]["input"];
};

export type MutationUpdateOccupationArgs = {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  jobTitle?: InputMaybe<Scalars["String"]["input"]>;
  startTime?: InputMaybe<Scalars["String"]["input"]>;
  toPresent?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationUpdatePasswordArgs = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type MutationUpdatePlaygroundArgs = {
  codeSnippetMode?: InputMaybe<Scalars["Boolean"]["input"]>;
  folder?: InputMaybe<Scalars["String"]["input"]>;
  isLive?: InputMaybe<Scalars["Boolean"]["input"]>;
  isShared?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  selectedLang?: InputMaybe<Scalars["String"]["input"]>;
  testcaseInput?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdatePlaygroundFolderArgs = {
  newFolderName?: InputMaybe<Scalars["String"]["input"]>;
  oldFolderName?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateProblematicPostArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateProfileArgs = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateProfileV3Args = {
  aboutMe?: InputMaybe<Scalars["String"]["input"]>;
  birthday?: InputMaybe<Scalars["String"]["input"]>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  githubUrl?: InputMaybe<Scalars["String"]["input"]>;
  jobTitle?: InputMaybe<Scalars["String"]["input"]>;
  linkedinUrl?: InputMaybe<Scalars["String"]["input"]>;
  locationId?: InputMaybe<Scalars["String"]["input"]>;
  locationName?: InputMaybe<Scalars["String"]["input"]>;
  realName?: InputMaybe<Scalars["String"]["input"]>;
  school?: InputMaybe<Scalars["String"]["input"]>;
  skillTags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdatePublicBadgeArgs = {
  badgeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationUpdateSolutionArgs = {
  content: Scalars["String"]["input"];
  tags: Array<InputMaybe<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationUpdateSubmissionNoteArgs = {
  flagType?: InputMaybe<SubmissionFlagTypeEnum>;
  note?: InputMaybe<Scalars["String"]["input"]>;
  submissionId: Scalars["ID"]["input"];
  tagIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationUpdateSyncedCodeArgs = {
  code: Scalars["String"]["input"];
  lang: Scalars["Int"]["input"];
  questionId: Scalars["Int"]["input"];
};

export type MutationUpdateTeamMemberArgs = {
  note?: InputMaybe<Scalars["String"]["input"]>;
  roleGroups: Array<InputMaybe<Scalars["String"]["input"]>>;
  username: Scalars["String"]["input"];
};

export type MutationUpdateTopicArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateTopicWithCategoryArgs = {
  categorySlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateUsernameArgs = {
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUserManagementApplyForPremiumTrialArgs = {
  attachments?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  sku: PremiumTrialSku;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUserManagementBanIpArgs = {
  banTypeSlug?: InputMaybe<Scalars["String"]["input"]>;
  days: Scalars["Int"]["input"];
  ip: Scalars["String"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUserManagementBanUserArgs = {
  banTypeSlug?: InputMaybe<Scalars["String"]["input"]>;
  days: Scalars["Int"]["input"];
  reason?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type MutationUserManagementCreateScoreArgs = {
  description: Scalars["String"]["input"];
  score: Scalars["Int"]["input"];
  userId: Scalars["ID"]["input"];
};

export type MutationUserManagementDeleteUserCreditCardArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUserManagementEditIpStatusArgs = {
  ip: Scalars["String"]["input"];
  status: IpStatusEnum;
};

export type MutationUserManagementSendVerificationEmailArgs = {
  email: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type MutationUserManagementSetEmailPrimaryArgs = {
  email: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type MutationUserUploadSchoolLogoArgs = {
  schoolId: Scalars["Int"]["input"];
  url: Scalars["String"]["input"];
};

export type MutationVotePostArgs = {
  postId?: InputMaybe<Scalars["Int"]["input"]>;
  value?: InputMaybe<Scalars["Int"]["input"]>;
};

export type NewFeatureAnnouncementNode = {
  id: Scalars["ID"]["output"];
  isShown: Scalars["Boolean"]["output"];
  link: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
};

export type NotificationCategoryNode = {
  configurableNotificationTypes?: Maybe<Array<Maybe<NotificationTypeNode>>>;
  slug?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type NotificationConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NotificationEdge>>;
  id?: Maybe<Scalars["String"]["output"]>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type NotificationDataNode = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  metadata?: Maybe<Scalars["JSONString"]["output"]>;
  notificationSet: NotificationNodeConnection;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type NotificationDataNodeNotificationSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

/** A Relay edge containing a `Notification` and its cursor. */
export type NotificationEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<NotificationNode>;
};

export type NotificationNode = {
  actioned: Scalars["Boolean"]["output"];
  creationDate?: Maybe<Scalars["Int"]["output"]>;
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  modifiedDate: Scalars["Int"]["output"];
  notificationData: NotificationDataNode;
  notificationId?: Maybe<Scalars["Int"]["output"]>;
  user?: Maybe<UserNode>;
};

export type NotificationNodeConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NotificationNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `NotificationNode` and its cursor. */
export type NotificationNodeEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<NotificationNode>;
};

export type NotificationTypeNode = {
  channelSettings?: Maybe<Scalars["JSONString"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  identifier?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type OmFavoriteBriefNode = {
  author: FavoriteBriefUserNode;
  collectCount: Scalars["Int"]["output"];
  coverBackgroundColor?: Maybe<Scalars["String"]["output"]>;
  coverEmoji?: Maybe<Scalars["String"]["output"]>;
  coverUrl?: Maybe<Scalars["String"]["output"]>;
  created: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  favoriteType?: Maybe<FavoriteTypeEnum>;
  forkCount: Scalars["Int"]["output"];
  generateFromFavoriteSlug?: Maybe<Scalars["String"]["output"]>;
  generatedFavoritesInfo?: Maybe<GeneratedFavoritesInfoNode>;
  hasCurrentQuestion?: Maybe<Scalars["Boolean"]["output"]>;
  isDefaultList: Scalars["Boolean"]["output"];
  isPublicFavorite: Scalars["Boolean"]["output"];
  lastModified: Scalars["DateTime"]["output"];
  lastQuestionAddedAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  questionNumber: Scalars["Int"]["output"];
  rule?: Maybe<RuleNode>;
  slug: Scalars["String"]["output"];
  viewCount?: Maybe<Scalars["Int"]["output"]>;
};

export type OmFavoriteListInput = {
  favoriteType?: InputMaybe<FavoriteTypeEnum>;
  limit?: Scalars["Int"]["input"];
  searchFieldEnum?: InputMaybe<OmFavoriteSearchFieldEnum>;
  searchKeyword?: InputMaybe<Scalars["String"]["input"]>;
  skip?: Scalars["Int"]["input"];
  sortBy?: InputMaybe<OmFavoriteSortFieldEnum>;
  /** sort descending or ascending */
  sortDsc?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type OmFavoriteListNode = {
  favorites: Array<OmFavoriteBriefNode>;
  totalNum: Scalars["Int"]["output"];
};

export type OmFavoriteLogNode = {
  createdAt: Scalars["DateTime"]["output"];
  operation: Scalars["String"]["output"];
  operator: FavoriteBriefUserNode;
};

export type OmFavoriteQuestionListNode = {
  questions: Array<OmFavoriteQuestionNode>;
  totalNum: Scalars["Int"]["output"];
};

export type OmFavoriteQuestionNode = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  difficulty: DifficultyDescribedEnum;
  /** 出题频率，企业题单专用字段 */
  frequency?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  /** whether the question is in the user's favorites */
  isInMyFavorites: Scalars["Boolean"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  questionStats?: Maybe<Scalars["JSONString"]["output"]>;
  status?: Maybe<FavoriteQuestionStatusEnum>;
  submissionNumFromFav: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags?: Maybe<Array<CommonTagNode>>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type OmFavoriteSearchFieldEnum =
  /** author */
  | "AUTHOR"
  /** id */
  | "ID"
  /** name */
  | "NAME"
  /** slug */
  | "SLUG";

/** An enumeration. */
export type OmFavoriteSortFieldEnum =
  /** default */
  | "DEFAULT"
  /** fork_count */
  | "FORK_COUNT"
  /** save_count */
  | "SAVE_COUNT"
  /** view_count */
  | "VIEW_COUNT";

export type OmGenerateFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type OmRemoveQuestionFromFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type OmUpdateFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type OccupationRecordNode = {
  endTime?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  jobTitle?: Maybe<Scalars["String"]["output"]>;
  startTime?: Maybe<Scalars["String"]["output"]>;
  toPresent: Scalars["Boolean"]["output"];
  unverifiedOrganizationName?: Maybe<Scalars["String"]["output"]>;
  user: PrivateContestUserNode;
};

export type OfficialIdeLayoutNode = {
  layoutJson: Scalars["JSONString"]["output"];
  slug: Scalars["String"]["output"];
};

export type OfficialSolutionFeedbackBriefNode = {
  additionalComment?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  metaInfo: FeedBackMetaNode;
  rateScore: Scalars["Int"]["output"];
  reasonTagIds: Array<Scalars["Int"]["output"]>;
};

export type OfficialSolutionFeedbackDetailNode = {
  additionalComment?: Maybe<Scalars["String"]["output"]>;
  authorName: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  feedbackUser: Scalars["String"]["output"];
  metaInfo: FeedBackMetaNode;
  questionInfo?: Maybe<QuestionNode>;
  rateScore: Scalars["Int"]["output"];
  reasonTagIds: Array<Scalars["Int"]["output"]>;
};

export type OfficialSolutionFeedbackFilterInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  hasComment?: InputMaybe<Scalars["Boolean"]["input"]>;
  orderBy?: InputMaybe<FeedbackOrderByEnum>;
  questionSlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  reasons?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sortOrder?: InputMaybe<SortingEnum>;
  startDate?: InputMaybe<Scalars["String"]["input"]>;
};

export type OpenNotifications = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type OptInOrOutDynamicLayoutFeature = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  optInResult?: Maybe<Scalars["Boolean"]["output"]>;
};

export type OptInOrOutPremiumFeature = {
  error?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type OrderOperationLogNode = {
  action: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  operator: PrivateContestUserNode;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type PagifiedCommentNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<CommentNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedContestNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<ContestNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedContributionNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<ContributionNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedOfficialSolutionFeedbackDetailNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<OfficialSolutionFeedbackDetailNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedPostNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<PostNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedQuestionFeedbackNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<QuestionFeedbackNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedQuestionLastSolveNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<QuestionLastSolveNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedQuestionNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<QuestionNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedTopicNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<TopicNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedUserContestStatNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<UserContestStatNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedUserNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<UserNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedUserReportNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<UserReportNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PagifiedVirtualContestScoreNode = {
  currentPage: Scalars["Int"]["output"];
  data: Array<VirtualContestScoreNode>;
  numPerPage: Scalars["Int"]["output"];
  pageNum: Scalars["Int"]["output"];
  totalNum: Scalars["Int"]["output"];
};

export type PanelQuestionListNode = {
  finishedLength?: Maybe<Scalars["Int"]["output"]>;
  hasViewPermission: Scalars["Boolean"]["output"];
  panelName: Scalars["String"]["output"];
  questions: Array<PanelQuestionNode>;
  totalLength?: Maybe<Scalars["Int"]["output"]>;
};

export type PanelQuestionNode = {
  difficulty: DifficultyDescribedEnum;
  id: Scalars["ID"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  questionNumber?: Maybe<Scalars["Int"]["output"]>;
  score?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<PanelQuestionStatusEnum>;
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags?: Maybe<Array<CommonTagNode>>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type PanelQuestionStatusEnum =
  /** attempted */
  | "ATTEMPTED"
  /** solved */
  | "SOLVED"
  /** to do */
  | "TO_DO";

export type PasswordErrorEnum =
  | "INCORRECT_PASSWORD"
  | "MISSING_ALPHA_OR_NUMERIC"
  | "PASSWORD_TOO_COMMON"
  | "PASSWORD_TOO_LONG"
  | "PASSWORD_TOO_SHORT";

/** An enumeration. */
export type PaymentGateways = "LEETPAY" | "PAYPAL" | "STRIPE";

export type PerformNotificationAction = {
  error?: Maybe<Scalars["String"]["output"]>;
  notification?: Maybe<NotificationNode>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type PlanBriefPlanGroupNode = {
  cover: Scalars["String"]["output"];
  dailyQuestionNum: Scalars["String"]["output"];
  days: Scalars["String"]["output"];
  hidden: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanBriefProgressNodeWithPlan = {
  completedNum: Scalars["Int"]["output"];
  daysPassed: Scalars["Int"]["output"];
  endAt: Scalars["Date"]["output"];
  hasCompleted: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isAborted: Scalars["Boolean"]["output"];
  /** Study Plan */
  plan: PlanBriefStudyPlanNodeWithGroup;
  questionNum: Scalars["Int"]["output"];
  startedAt: Scalars["Date"]["output"];
};

export type PlanBriefStudyPlanNode = {
  /** Whether to get reward */
  awarded: Scalars["Boolean"]["output"];
  /** Period (number of days) */
  days: Scalars["Int"]["output"];
  /** Medal corresponding to the plan */
  medal: MedalNode;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanBriefStudyPlanNodeWithGroup = {
  /** Whether to get reward */
  awarded: Scalars["Boolean"]["output"];
  /** Period (number of days) */
  days: Scalars["Int"]["output"];
  /** Study Plan Group */
  group: PlanBriefPlanGroupNode;
  /** Medal corresponding to the plan */
  medal: MedalNode;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanBriefUserNode = {
  realName: Scalars["String"]["output"];
  userAvatar: Scalars["String"]["output"];
  userName?: Maybe<Scalars["String"]["output"]>;
  userSlug: Scalars["String"]["output"];
};

export type PlanCatalogNode = {
  name: Scalars["String"]["output"];
  ordering: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanCompletedStatusNode = {
  /** If null, keep polling */
  completedStudyPlan?: Maybe<Scalars["Boolean"]["output"]>;
  /** Whether user joined this plan */
  joinedStudyPlan: Scalars["Boolean"]["output"];
  planProgressDetail?: Maybe<PlanUserProgressDetailNode>;
};

/** Used to describe PlanGroup details */
export type PlanDetailPlanGroupNode = {
  cover: Scalars["String"]["output"];
  creator?: Maybe<UserNode>;
  dailyQuestionNum: Scalars["String"]["output"];
  days: Scalars["String"]["output"];
  desc: Scalars["String"]["output"];
  hidden: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  ongoingProgress?: Maybe<PlanProgressNode>;
  /** All study plans of the planning group */
  plans: Array<PlanStudyPlanNode>;
  slug: Scalars["String"]["output"];
  tags: Array<CommonTagNode>;
};

export type PlanDetailStudyPlanNode = {
  allowedLanguages: Scalars["JSONString"]["output"];
  /** Whether to get reward */
  awarded: Scalars["Boolean"]["output"];
  dailyQuestionNum: Scalars["String"]["output"];
  /** Period (number of days) */
  days: Scalars["Int"]["output"];
  /** Number of easy questions */
  easy: Scalars["Int"]["output"];
  /** Number of hard questions */
  hard: Scalars["Int"]["output"];
  hasPremiumQuestion: Scalars["Boolean"]["output"];
  hint: Scalars["String"]["output"];
  /** Medal corresponding to the plan */
  medal: MedalNode;
  /** Number of medium questions */
  medium: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  /** Plan ordering in the study group */
  ordering: Scalars["Int"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  slug: Scalars["String"]["output"];
  /** Tasks of the study plan */
  tasks: Array<PlanTaskNode>;
};

export type PlanGroupListNode = {
  /** List of Plan Groups */
  data: Array<PlanGroupNode>;
  /** Number of Plan Groups */
  total: Scalars["Int"]["output"];
};

export type PlanGroupNode = {
  cover: Scalars["String"]["output"];
  dailyQuestionNum: Scalars["String"]["output"];
  days: Scalars["String"]["output"];
  hidden: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  ongoingProgress?: Maybe<PlanProgressNode>;
  /** All study plans of the planning group */
  plans: Array<PlanBriefStudyPlanNode>;
  slug: Scalars["String"]["output"];
};

export type PlanNextQuestionNode = {
  inPremiumSubgroup: Scalars["Boolean"]["output"];
  nextQuestion?: Maybe<PlanQuestionBriefNode>;
};

export type PlanProgressNode = {
  completedNum: Scalars["Int"]["output"];
  daysPassed: Scalars["Int"]["output"];
  endAt: Scalars["Date"]["output"];
  hasCompleted: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isAborted: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  startedAt: Scalars["Date"]["output"];
};

export type PlanProgressNodeWithPlan = {
  completedNum: Scalars["Int"]["output"];
  /** Difficulty distribution of completed questions */
  completedQuestionsDifficultyDistribution: Scalars["JSONString"]["output"];
  daysPassed: Scalars["Int"]["output"];
  endAt: Scalars["Date"]["output"];
  hasCompleted: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isAborted: Scalars["Boolean"]["output"];
  /** Study Plan */
  plan: PlanDetailStudyPlanNode;
  startedAt: Scalars["Date"]["output"];
};

export type PlanQuestionBriefNode = {
  id: Scalars["ID"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

export type PlanQuestionLightNode = {
  difficulty: DifficultyDescribedEnum;
  hasOfficialSolution: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  solutionInfo?: Maybe<PlanQuestionSolutionInfoNode>;
  status?: Maybe<PlanQuestionStatusEnum>;
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags: Array<CommonTagNode>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

export type PlanQuestionSolutionInfoNode = {
  solutionSlug?: Maybe<Scalars["String"]["output"]>;
  solutionTopicId?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type PlanQuestionStatusEnum =
  /** attempted */
  | "ATTEMPTED"
  /** past solved */
  | "PAST_SOLVED"
  /** solved */
  | "SOLVED"
  /** to do */
  | "TO_DO";

export type PlanStudyPlanNode = {
  allowedLanguages: Scalars["JSONString"]["output"];
  /** Whether to get reward */
  awarded: Scalars["Boolean"]["output"];
  dailyQuestionNum: Scalars["String"]["output"];
  /** Period (number of days) */
  days: Scalars["Int"]["output"];
  /** Number of easy questions */
  easy: Scalars["Int"]["output"];
  /** Number of hard questions */
  hard: Scalars["Int"]["output"];
  hasPremiumQuestion: Scalars["Boolean"]["output"];
  hint: Scalars["String"]["output"];
  /** Medal corresponding to the plan */
  medal: MedalNode;
  /** Number of medium questions */
  medium: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  /** Plan ordering in the study group */
  ordering: Scalars["Int"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanStudyPlanNodeWithGroup = {
  allowedLanguages: Scalars["JSONString"]["output"];
  /** Whether to get reward */
  awarded: Scalars["Boolean"]["output"];
  dailyQuestionNum: Scalars["String"]["output"];
  /** Period (number of days) */
  days: Scalars["Int"]["output"];
  /** Number of easy questions */
  easy: Scalars["Int"]["output"];
  /** Study Plan Group */
  group: PlanBriefPlanGroupNode;
  /** Number of hard questions */
  hard: Scalars["Int"]["output"];
  hasPremiumQuestion: Scalars["Boolean"]["output"];
  hint: Scalars["String"]["output"];
  /** Medal corresponding to the plan */
  medal: MedalNode;
  /** Number of medium questions */
  medium: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  /** Plan ordering in the study group */
  ordering: Scalars["Int"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlanSubGroupInfoNode = {
  name: Scalars["String"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  questions: Array<PlanQuestionLightNode>;
  slug: Scalars["String"]["output"];
};

export type PlanTaskNode = {
  /** Whether the user can complete this task or not */
  canComplete: Scalars["Boolean"]["output"];
  /** Day that task will become available for completion */
  day: Scalars["Int"]["output"];
  desc: Scalars["String"]["output"];
  /** Whether the task has been completed */
  hasComplete: Scalars["Boolean"]["output"];
  /** Sequence of questions in study plan */
  ordering: Scalars["Int"]["output"];
  question: QuestionNode;
};

export type PlanUserProgressBriefNode = {
  allCompletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  finishedQuestionNum: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  latestSubmissionAt: Scalars["DateTime"]["output"];
  nextQuestionInfo?: Maybe<PlanNextQuestionNode>;
  plan: StudyPlanBriefNode;
  quittedAt?: Maybe<Scalars["DateTime"]["output"]>;
  startedAt: Scalars["DateTime"]["output"];
};

export type PlanUserProgressDetailNode = {
  finishedQuestionNum: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  status: PlanUserProgressStatusEnum;
  studyPlanDetail: StudyPlanDetailNode;
  weeklyTaskScheduleResettable?: Maybe<Scalars["Boolean"]["output"]>;
};

export type PlanUserProgressListNode = {
  hasMore: Scalars["Boolean"]["output"];
  planUserProgresses: Array<PlanUserProgressBriefNode>;
  total: Scalars["Int"]["output"];
};

/** An enumeration. */
export type PlanUserProgressStatusEnum =
  /** completed */
  | "COMPLETED"
  /** deleted */
  | "DELETED"
  /** on going */
  | "ON_GOING"
  /** quitted */
  | "QUITTED";

/** An enumeration. */
export type PlanUserProgressTypeEnum =
  /** history */
  | "HISTORY"
  /** on going */
  | "ON_GOING";

/** An enumeration. */
export type PlaygroundCodeLang =
  /** cpp */
  | "A_0"
  /** java */
  | "A_1"
  /** python */
  | "A_2"
  /** mysql */
  | "A_3"
  /** c */
  | "A_4"
  /** csharp */
  | "A_5"
  /** javascript */
  | "A_6"
  /** ruby */
  | "A_7"
  /** bash */
  | "A_8"
  /** swift */
  | "A_9"
  /** golang */
  | "A_10"
  /** python3 */
  | "A_11"
  /** scala */
  | "A_12"
  /** kotlin */
  | "A_13"
  /** mssql */
  | "A_14"
  /** oraclesql */
  | "A_15"
  /** html */
  | "A_16"
  /** pythonml */
  | "A_17"
  /** rust */
  | "A_18"
  /** php */
  | "A_19"
  /** typescript */
  | "A_20"
  /** racket */
  | "A_21"
  /** erlang */
  | "A_22"
  /** elixir */
  | "A_23"
  /** dart */
  | "A_24"
  /** pythondata */
  | "A_25"
  /** react */
  | "A_26"
  /** vanillajs */
  | "A_27"
  /** postgresql */
  | "A_28"
  /** cangjie */
  | "A_29";

export type PlaygroundCodeNode = {
  code: Scalars["String"]["output"];
  lang: PlaygroundCodeLang;
  langSlug?: Maybe<Scalars["String"]["output"]>;
  playground: PlaygroundNode;
};

export type PlaygroundDatasetNode = {
  description: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type PlaygroundFolderNode = {
  name: Scalars["String"]["output"];
  playgroundSet: Array<PlaygroundNode>;
  user: PrivateContestUserNode;
};

export type PlaygroundNode = {
  folder?: Maybe<PlaygroundFolderNode>;
  isLive?: Maybe<Scalars["Boolean"]["output"]>;
  isShared?: Maybe<Scalars["Boolean"]["output"]>;
  isUserOwner?: Maybe<Scalars["Boolean"]["output"]>;
  modifiedDate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  playgroundcodeSet: Array<PlaygroundCodeNode>;
  selectedLang?: Maybe<PlaygroundSelectedLang>;
  selectedLangSlug?: Maybe<Scalars["String"]["output"]>;
  showOpenInPlayground?: Maybe<Scalars["Boolean"]["output"]>;
  showRunCode?: Maybe<Scalars["Boolean"]["output"]>;
  testcaseInput: Scalars["String"]["output"];
  uuid: Scalars["String"]["output"];
};

/** An enumeration. */
export type PlaygroundSelectedLang =
  /** cpp */
  | "A_0"
  /** java */
  | "A_1"
  /** python */
  | "A_2"
  /** mysql */
  | "A_3"
  /** c */
  | "A_4"
  /** csharp */
  | "A_5"
  /** javascript */
  | "A_6"
  /** ruby */
  | "A_7"
  /** bash */
  | "A_8"
  /** swift */
  | "A_9"
  /** golang */
  | "A_10"
  /** python3 */
  | "A_11"
  /** scala */
  | "A_12"
  /** kotlin */
  | "A_13"
  /** mssql */
  | "A_14"
  /** oraclesql */
  | "A_15"
  /** html */
  | "A_16"
  /** pythonml */
  | "A_17"
  /** rust */
  | "A_18"
  /** php */
  | "A_19"
  /** typescript */
  | "A_20"
  /** racket */
  | "A_21"
  /** erlang */
  | "A_22"
  /** elixir */
  | "A_23"
  /** dart */
  | "A_24"
  /** pythondata */
  | "A_25"
  /** react */
  | "A_26"
  /** vanillajs */
  | "A_27"
  /** postgresql */
  | "A_28"
  /** cangjie */
  | "A_29";

export type PlaygroundSnippetNode = {
  dependencies: Array<PlaygroundSnippetNode>;
  description: Scalars["String"]["output"];
  foldingPositions?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  fullSnippetWithDependencies?: Maybe<Scalars["String"]["output"]>;
  functionName: Scalars["String"]["output"];
  hasDependencies?: Maybe<Scalars["Boolean"]["output"]>;
  hidden: Scalars["Boolean"]["output"];
  lang: PlaygroundSnippetsLang;
  langSlug?: Maybe<Scalars["String"]["output"]>;
  playgroundsnippetsSet: Array<PlaygroundSnippetNode>;
  snippet: Scalars["String"]["output"];
};

/** An enumeration. */
export type PlaygroundSnippetsLang =
  /** cpp */
  | "A_0"
  /** java */
  | "A_1"
  /** python */
  | "A_2"
  /** mysql */
  | "A_3"
  /** c */
  | "A_4"
  /** csharp */
  | "A_5"
  /** javascript */
  | "A_6"
  /** ruby */
  | "A_7"
  /** bash */
  | "A_8"
  /** swift */
  | "A_9"
  /** golang */
  | "A_10"
  /** python3 */
  | "A_11"
  /** scala */
  | "A_12"
  /** kotlin */
  | "A_13"
  /** mssql */
  | "A_14"
  /** oraclesql */
  | "A_15"
  /** html */
  | "A_16"
  /** pythonml */
  | "A_17"
  /** rust */
  | "A_18"
  /** php */
  | "A_19"
  /** typescript */
  | "A_20"
  /** racket */
  | "A_21"
  /** erlang */
  | "A_22"
  /** elixir */
  | "A_23"
  /** dart */
  | "A_24"
  /** pythondata */
  | "A_25"
  /** react */
  | "A_26"
  /** vanillajs */
  | "A_27"
  /** postgresql */
  | "A_28"
  /** cangjie */
  | "A_29";

export type PlaygroundStateNode = {
  createdNum: Scalars["Int"]["output"];
  upperLimitToCreate: Scalars["Int"]["output"];
};

/** An enumeration. */
export type PlaygroundTemplateCodeLang =
  /** cpp */
  | "A_0"
  /** java */
  | "A_1"
  /** python */
  | "A_2"
  /** mysql */
  | "A_3"
  /** c */
  | "A_4"
  /** csharp */
  | "A_5"
  /** javascript */
  | "A_6"
  /** ruby */
  | "A_7"
  /** bash */
  | "A_8"
  /** swift */
  | "A_9"
  /** golang */
  | "A_10"
  /** python3 */
  | "A_11"
  /** scala */
  | "A_12"
  /** kotlin */
  | "A_13"
  /** mssql */
  | "A_14"
  /** oraclesql */
  | "A_15"
  /** html */
  | "A_16"
  /** pythonml */
  | "A_17"
  /** rust */
  | "A_18"
  /** php */
  | "A_19"
  /** typescript */
  | "A_20"
  /** racket */
  | "A_21"
  /** erlang */
  | "A_22"
  /** elixir */
  | "A_23"
  /** dart */
  | "A_24"
  /** pythondata */
  | "A_25"
  /** react */
  | "A_26"
  /** vanillajs */
  | "A_27"
  /** postgresql */
  | "A_28"
  /** cangjie */
  | "A_29";

export type PlaygroundTemplateCodeNode = {
  foldingPositions?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  lang: PlaygroundTemplateCodeLang;
  langSlug?: Maybe<Scalars["String"]["output"]>;
  templateCode: Scalars["String"]["output"];
};

export type PlaygroundTemplateNode = {
  codes?: Maybe<Array<Maybe<PlaygroundTemplateCodeNode>>>;
  name: Scalars["String"]["output"];
  nameSlug: Scalars["String"]["output"];
  templateId?: Maybe<Scalars["String"]["output"]>;
  testcaseInput: Scalars["String"]["output"];
  user: PrivateContestUserNode;
};

export type PlaygroundTemplateNodeCodesArgs = {
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type PointListNode = {
  hasNext?: Maybe<Scalars["Boolean"]["output"]>;
  points?: Maybe<Array<Maybe<ScoreNode>>>;
};

export type PostMentionedUser = {
  key: Scalars["String"]["output"];
  nickName: Scalars["String"]["output"];
  userSlug: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type PostNode = {
  anonymous: Scalars["Boolean"]["output"];
  asTopic?: Maybe<Scalars["Boolean"]["output"]>;
  author?: Maybe<UserNode>;
  authorAdminOnly?: Maybe<UserNodeAdminOnly>;
  authorIsModerator?: Maybe<Scalars["Boolean"]["output"]>;
  coinRewards: Array<ScoreNode>;
  comment?: Maybe<CommentNode>;
  commentId?: Maybe<Scalars["Int"]["output"]>;
  content: Scalars["String"]["output"];
  contentPreview?: Maybe<Scalars["String"]["output"]>;
  creationDate?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["Int"]["output"];
  isHidden?: Maybe<Scalars["Boolean"]["output"]>;
  isOwnPost?: Maybe<Scalars["Boolean"]["output"]>;
  isReported?: Maybe<Scalars["Boolean"]["output"]>;
  mentionedUsers?: Maybe<Array<Maybe<PostMentionedUser>>>;
  nodebbPid: Scalars["Int"]["output"];
  originalContent: Scalars["String"]["output"];
  peek?: Maybe<Scalars["String"]["output"]>;
  reports?: Maybe<Array<Maybe<ReportInfoNode>>>;
  searchScore: Scalars["Float"]["output"];
  status?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
  topicId?: Maybe<Scalars["Int"]["output"]>;
  topicTitle?: Maybe<Scalars["String"]["output"]>;
  updationDate?: Maybe<Scalars["Int"]["output"]>;
  voteCount: Scalars["Int"]["output"];
  voteSet: Array<VoteNode>;
  voteStatus?: Maybe<Scalars["Int"]["output"]>;
  voteUpCount: Scalars["Int"]["output"];
};

/** An enumeration. */
export type PostStatus =
  | "ALL"
  | "DELETED"
  | "HIDDEN"
  | "NEED_UPDATE"
  | "OPEN"
  | "PENDING"
  | "REVIEWED";

export type PremiumBetaFeatureNode = {
  creationDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  endsAt?: Maybe<Scalars["DateTime"]["output"]>;
  featureId: Scalars["Int"]["output"];
  featureUrl?: Maybe<Scalars["String"]["output"]>;
  feedbackUrl?: Maybe<Scalars["String"]["output"]>;
  /** Indicates whether a user has access to this feature. */
  hasAccess?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  imageHeight?: Maybe<Scalars["Int"]["output"]>;
  imageUrl: Scalars["String"]["output"];
  isEnabled: Scalars["Boolean"]["output"];
  /** Indicates whether a user has opted in for this feature. */
  optedIn?: Maybe<Scalars["Boolean"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  startsAt?: Maybe<Scalars["DateTime"]["output"]>;
  title: Scalars["String"]["output"];
  type: PremiumBetaFeatureType;
  updationDate: Scalars["DateTime"]["output"];
};

/** An enumeration. */
export type PremiumBetaFeatureType =
  /** Beta User Flow */
  | "A_1"
  /** New Problemlist Page */
  | "A_2"
  /** New Profile Page */
  | "A_3"
  /** New Problem Detail Page */
  | "A_4"
  /** New Study Plan Access */
  | "A_5"
  /** Ai Helper */
  | "A_6"
  /** New Subscribe Page */
  | "A_7"
  /** New Plan Rank Board Access */
  | "A_8"
  /** Lc Ide */
  | "A_9"
  /** Lc Ide V2 */
  | "A_10"
  /** Frontend Category */
  | "A_11"
  /** New Stripe Invoice */
  | "A_12"
  /** Contest Dl */
  | "A_13";

export type PremiumInfoNode = {
  gateway: PaymentGateways;
  periodEnd: Scalars["DateTime"]["output"];
  periodStart: Scalars["DateTime"]["output"];
};

/** An enumeration. */
export type PremiumTrialApplyStatus =
  /** Approved */
  | "APPROVED"
  /** Pending */
  | "PENDING"
  /** Rejected */
  | "REJECTED";

export type PremiumTrialRecordsInput = {
  limit?: Scalars["Int"]["input"];
  searchBy?: InputMaybe<SearchUserType>;
  searchKeyword?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
};

/** enum value means trial days */
export type PremiumTrialSku =
  /** Annual Premium Subscription */
  | "ANNUAL"
  /** Monthly Premium Subscription */
  | "MONTHLY";

export type PricingNode = {
  originalPrice?: Maybe<Scalars["Float"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
};

export type PrivateContestUserNode = {
  achievementSet: Array<AchievementNode>;
  activeBadge?: Maybe<UserBadgeNode>;
  archiveduserSet: Array<ArchivedUserNode>;
  articlepageSet: Array<ArticleNode>;
  badgeSet: Array<UserBadgeNode>;
  badges: Array<UserBadgeNode>;
  categoryscoreSet: Array<InterviewTagsCategoryScoreNode>;
  commentSet: Array<CommentNode>;
  companySet: Array<SponsorNode>;
  completionSet: Array<CompletionNode>;
  contestBadge?: Maybe<UserBadgeNode>;
  contestreportSet: Array<ContestReportNode>;
  contestreportlccnSet: Array<ContestReportLccnNode>;
  contributionSet: Array<ContributionNode>;
  contributions: UserContributionNode;
  contributorSet: Array<ContributorNode>;
  createdBy: LibraryQuestionNodeConnection;
  dateJoined: Scalars["DateTime"]["output"];
  debugSession: Array<DebugSessionNode>;
  educationrecordSet: Array<EducationRecordNode>;
  email?: Maybe<Scalars["String"]["output"]>;
  emailaddressSet: Array<EmailNode>;
  emails?: Maybe<Array<Maybe<EmailNode>>>;
  favoriteSet: Array<FeaturedQuestionListNode>;
  firstName: Scalars["String"]["output"];
  flagSet: Array<FlagNode>;
  flagresultSet: Array<FlagResultNode>;
  githubUrl?: Maybe<Scalars["String"]["output"]>;
  hasChangedUsernameRecently?: Maybe<Scalars["Boolean"]["output"]>;
  hasUsablePassword?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"]["output"];
  isCurrentUserPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isCurrentUserVerified?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussStaff?: Maybe<Scalars["Boolean"]["output"]>;
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"]["output"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"]["output"];
  joinedTimestamp: Scalars["Int"]["output"];
  languageProblemCount?: Maybe<Array<LanguageProblemCountNode>>;
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  lastName: Scalars["String"]["output"];
  lastParticipatedContest?: Maybe<ContestNode>;
  libraryactivitySet: QuestionActivityNodeConnection;
  linkedinUrl?: Maybe<Scalars["String"]["output"]>;
  nameColor?: Maybe<Scalars["String"]["output"]>;
  notificationSet: NotificationNodeConnection;
  occupationrecordSet: Array<OccupationRecordNode>;
  participatedTimes: Scalars["Int"]["output"];
  password: Scalars["String"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  playgroundSet: Array<PlaygroundNode>;
  playgroundfolderSet: Array<PlaygroundFolderNode>;
  playgroundtemplateSet: Array<PlaygroundTemplateNode>;
  postReport: Array<ReportInfoNode>;
  postSet: Array<PostNode>;
  problemsSolvedBeatsStats: Array<ProblemSolvedBeatsNode>;
  profile: UserProfileNode;
  questionSet: LibraryQuestionNodeConnection;
  questionapplicationSet: Array<ApplicationNode>;
  questionlastsolveSet: Array<QuestionLastSolveNode>;
  questionsolvesessionSet: Array<QuestionSolveSessionNode>;
  questionsuggestionSet: Array<QuestionFeedbackNode>;
  reportee: Array<UserReportNode>;
  reporter: Array<UserReportNode>;
  scoreUser: Array<ManagementScoreNode>;
  sessionSet: InterviewSessionNodeConnection;
  socialAccounts?: Maybe<Array<Scalars["String"]["output"]>>;
  storeaddressSet: Array<StoreAddressNode>;
  storeorderSet: Array<StoreOrderNode>;
  storeorderoperationlogSet: Array<OrderOperationLogNode>;
  submissionCalendar: Scalars["JSONString"]["output"];
  submissionSet: Array<FilteredSubmissionNode>;
  submitStats: UserSubmitStatsNode;
  submitStatsGlobal: UserSubmitStatsNode;
  tagProblemCounts: TagProblemCountsCategoryNode;
  twitterUrl?: Maybe<Scalars["String"]["output"]>;
  upcomingBadges: Array<UpcomingBadgeNode>;
  userCalendar: UserCalendarNode;
  useripSet: Array<UserIpNode>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
  userratingSet: Array<UserRatingNode>;
  userskilltagSet: Array<UserSkillTagNode>;
  usersyncedcodeSet: Array<SyncedCodeNode>;
  virtualcontestscoreSet: Array<VirtualContestScoreNode>;
  voteSet: Array<VoteNode>;
  yearJoined: Scalars["Int"]["output"];
};

export type PrivateContestUserNodeCreatedByArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PrivateContestUserNodeLibraryactivitySetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PrivateContestUserNodeNotificationSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PrivateContestUserNodeQuestionSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PrivateContestUserNodeSessionSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type PrivateContestUserNodeUserCalendarArgs = {
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ProblemSolvedBeatsNode = {
  difficulty: Scalars["String"]["output"];
  percentage?: Maybe<Scalars["Float"]["output"]>;
};

export type ProdTestcase = {
  expectedOutput: Array<Maybe<Scalars["String"]["output"]>>;
  inputFormatted: Array<Maybe<Scalars["String"]["output"]>>;
  inputRaw: Array<Maybe<Scalars["String"]["output"]>>;
};

export type ProfileUpdateErrorEnum =
  | "INVALID_ABOUT_ME"
  | "INVALID_BIRTHDAY"
  | "INVALID_COMPANY"
  | "INVALID_GITHUB_URL"
  | "INVALID_JOB_TITLE"
  | "INVALID_LINKEDIN_URL"
  | "INVALID_LOCATION"
  | "INVALID_REAL_NAME"
  | "INVALID_SCHOOL"
  | "INVALID_SKILL_TAGS"
  | "INVALID_WEBSITE";

/** An enumeration. */
export type ProgressCalendarQueryTypeEnum =
  /** solved */
  | "SOLVED"
  /** submission */
  | "SUBMISSION";

export type ProgressListFilterInput = {
  difficulty?: InputMaybe<DifficultyEnum>;
  orderBy?: InputMaybe<ProgressOrderByEnum>;
  searchKeywords?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<SortingOrderEnum>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type ProgressOrderByEnum =
  | "DIFFICULTY"
  | "FRONTEND_ID"
  | "LAST_SOLVED"
  | "TOTAL_SOLVES"
  | "WRONG_ATTEMPTS";

/** An enumeration. */
export type ProgressQuestionSortEnum =
  /** lastSubmittedAt */
  | "LAST_SUBMITTED_AT"
  /** numSubmitted */
  | "NUM_SUBMITTED"
  /** questionFrontendId */
  | "QUESTION_FRONTEND_ID";

/** An enumeration. */
export type ProgressQuestionStatusEnum =
  /** attempted */
  | "ATTEMPTED"
  /** solved */
  | "SOLVED";

/** An enumeration. */
export type ProgressStatus = "ACCEPTED" | "ATTEMPTED" | "UNATTEMPTED";

export type PublishContestAnnouncement = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type PublishSolution = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type PublishStatus = "PUBLISHED" | "UNKNOWN" | "UNPUBLISHED";

export type Query = {
  /** get ab record by ab test name */
  abRecordName: Scalars["Boolean"]["output"];
  achievement?: Maybe<AchievementNode>;
  achievements?: Maybe<Array<Maybe<AchievementNode>>>;
  activeDailyCodingChallengeQuestion: DailyChallengeNodeV2;
  activeDiscountEvent?: Maybe<DiscountEventNode>;
  advertisementByLocation: Array<AdvertisementNode>;
  allComments?: Maybe<PagifiedCommentNode>;
  allContests?: Maybe<Array<Maybe<ContestNode>>>;
  allContributions?: Maybe<PagifiedContributionNode>;
  allLeetcodePlaygroundTemplates?: Maybe<Array<Maybe<PlaygroundTemplateNode>>>;
  /** query a list of common complexities */
  allPinnedComplexitys?: Maybe<Array<ComplexityInfoNode>>;
  allPlaygroundCodes?: Maybe<Array<Maybe<PlaygroundCodeNode>>>;
  allPlaygroundDatasets?: Maybe<Array<Maybe<PlaygroundDatasetNode>>>;
  allPlaygroundFolders?: Maybe<Array<Maybe<PlaygroundFolderNode>>>;
  allPlaygroundSnippets?: Maybe<Array<Maybe<PlaygroundSnippetNode>>>;
  allPlaygrounds?: Maybe<Array<Maybe<PlaygroundNode>>>;
  allPrivateContests?: Maybe<Array<ContestNode>>;
  allProgress?: Maybe<Scalars["JSONString"]["output"]>;
  allQuestions?: Maybe<Array<Maybe<QuestionNode>>>;
  allQuestionsCount: Array<QuestionCountByDifficultyNode>;
  allQuestionsRaw?: Maybe<Array<Maybe<RawQuestionNode>>>;
  allSchoolInfoUrl: Scalars["String"]["output"];
  allTopics?: Maybe<PagifiedTopicNode>;
  allUserPlaygroundTemplates?: Maybe<Array<Maybe<PlaygroundTemplateNode>>>;
  allUsers?: Maybe<PagifiedUserNode>;
  allVirtualContestScores?: Maybe<Array<Maybe<VirtualContestScoreNode>>>;
  allVirtualContestScoresPagified: PagifiedVirtualContestScoreNode;
  announcements: Array<DiscussAnnouncementNode>;
  application?: Maybe<ApplicationNode>;
  applications?: Maybe<Array<Maybe<ApplicationNode>>>;
  archivedUsers: Array<ArchivedUserNode>;
  article?: Maybe<ArticleNode>;
  blacklist?: Maybe<BlacklistNode>;
  brightTitle?: Maybe<Scalars["Boolean"]["output"]>;
  btsReferral?: Maybe<BtsReferralNode>;
  cachedTrendingCategoryTopics?: Maybe<Array<Maybe<TopicNode>>>;
  canSeeOtherSubmissionHistory: Scalars["Boolean"]["output"];
  card?: Maybe<CardNode>;
  cards?: Maybe<Array<Maybe<CardNode>>>;
  cardsWithStats?: Maybe<Array<Maybe<CardNode>>>;
  categories?: Maybe<Array<Maybe<CategoryNode>>>;
  categoryTopicList?: Maybe<TopicConnection>;
  cfTurnstileAppearance?: Maybe<Scalars["String"]["output"]>;
  cfTurnstileKey?: Maybe<Scalars["String"]["output"]>;
  challenges: Array<CodingChallengeNode>;
  channels?: Maybe<Array<Maybe<ChannelNode>>>;
  chapter?: Maybe<ChapterNode>;
  chapters?: Maybe<Array<Maybe<ChapterNode>>>;
  chinaHost?: Maybe<Scalars["String"]["output"]>;
  codeWithMemory?: Maybe<SampleCodeNode>;
  codeWithRuntime?: Maybe<SampleCodeNode>;
  comment?: Maybe<CommentNode>;
  commentContext?: Maybe<Scalars["JSONString"]["output"]>;
  commentReplies?: Maybe<Array<CommentNode>>;
  commonKeyword?: Maybe<CommonKeywordNode>;
  companies: Array<CompanyNode>;
  companyTag?: Maybe<CompanyTagNode>;
  companyTags?: Maybe<Array<CompanyTagNode>>;
  contest?: Maybe<ContestNode>;
  contestDetail?: Maybe<ContestDetailNode>;
  contestQuestion?: Maybe<ContestQuestionDetailNode>;
  contestQuestionSubmissionList?: Maybe<ContestSubmissionListNode>;
  contestRatingHistogram: Array<ContestRatingHistogramBarNode>;
  contestReportApproveSummary: ContestReportSummaryNode;
  contestReports: Array<ContestReportNode>;
  contestReportsLccn: Array<ContestReportLccnNode>;
  contestRootBanners: Array<ContestRootBannerNode>;
  contestTopics?: Maybe<PagifiedTopicNode>;
  contribution?: Maybe<ContributionNode>;
  contributions?: Maybe<Array<Maybe<ContributionNode>>>;
  createdPublicFavoriteList: FavoriteDetailListNode;
  currentContestAnnouncements?: Maybe<Array<Maybe<ContestAnnouncementNode>>>;
  currentDailyCodingChallenge?: Maybe<CodingChallengeNode>;
  currentSubscriptionInfo?: Maybe<CurrentSubscriptionInfo>;
  currentTimestamp?: Maybe<Scalars["Float"]["output"]>;
  dailyChallengeMedal?: Maybe<MedalNode>;
  dailyCodingChallenge?: Maybe<CodingChallengeNode>;
  dailyCodingChallengeV2?: Maybe<CodingChallengeNodeV2>;
  dashboardItem?: Maybe<ItemNode>;
  dccSubmissionInfo?: Maybe<CodingChallengeSubmissionNode>;
  dccSubmissionPolling?: Maybe<CodingChallengePollingNode>;
  dccSubmissionPollingV2?: Maybe<CodingChallengePollingNode>;
  debuggerLanguageFeatures?: Maybe<Array<DebuggerLanguageFeatureNode>>;
  defaultSubscriptionPricing?: Maybe<SubscriptionsNode>;
  deleteUserRequests: DeleteUserRequestListNode;
  didCompleteUpc: Scalars["Boolean"]["output"];
  discussCategory?: Maybe<DiscussCategoryNode>;
  discussQuestionTopicTags: Array<DiscussTopicTagNode>;
  educationRecordList?: Maybe<Array<Maybe<EducationRecordNode>>>;
  emailEvent?: Maybe<EmailEventNode>;
  emailEvents?: Maybe<Array<Maybe<EmailEventNode>>>;
  emailSendSession?: Maybe<EmailSendSessionNode>;
  emailSendSessions?: Maybe<Array<Maybe<EmailSendSessionNode>>>;
  emailTemplate?: Maybe<EmailTemplateNode>;
  emailTemplates?: Maybe<Array<Maybe<EmailTemplateNode>>>;
  enableContestRankingDynamicLayout: Scalars["Boolean"]["output"];
  enableIdeDynamicLayoutFeature: Scalars["Boolean"]["output"];
  favorite?: Maybe<FavoriteNode>;
  favoriteCards?: Maybe<Array<Maybe<CardNode>>>;
  favoriteDetailV2?: Maybe<FavoriteDetailNode>;
  /** ac, notac, or null */
  favoriteQuestionAcStatus?: Maybe<Scalars["String"]["output"]>;
  favoriteQuestionList: FavoriteQuestionListNode;
  favoriteSubmitAcProgress?: Maybe<FavoriteSubmitAcProgressNode>;
  /** user progress of a favorite, either his own or collected ones */
  favoriteUserQuestionProgressV2: UserQuestionProgressNodeV2;
  favoritesLists?: Maybe<FavoritesNode>;
  feature?: Maybe<FeatureNode>;
  featuredContests: Array<ContestNode>;
  featuredQuestionLists: Array<FeaturedQuestionListNode>;
  feedbackMetaInfoBySlug?: Maybe<FeedBackMetaNode>;
  filterableCategories?: Maybe<Array<Maybe<CategoryType>>>;
  filteredSubmissions?: Maybe<FilteredSubmissionOverviewNode>;
  flagReasons: Array<FlagReasonNode>;
  flagResourceType?: Maybe<ResourceTypeNode>;
  frontendQuestionSubmissionResults: Array<Maybe<FrontendQuestionResultNode>>;
  generateLeetcodeUserApiToken?: Maybe<ApiTokenNode>;
  globalRanking?: Maybe<GlobalRankingNode>;
  growthbookTest: Scalars["String"]["output"];
  hasAccessToFavorite: AccessToFavoriteNode;
  hasFavoriteSessionReset: Scalars["Boolean"]["output"];
  hasTakenCancelSurvey?: Maybe<Scalars["Boolean"]["output"]>;
  hasTakenSubscriptionSurvey?: Maybe<Scalars["Boolean"]["output"]>;
  historyCards?: Maybe<Array<Maybe<CardNode>>>;
  htmlArticle?: Maybe<HtmlArticleNode>;
  /** user preference dynamic layouts */
  ideDynamicLayouts: Array<IdeDynamicLayoutNode>;
  intentionTags: Array<Maybe<IntentionTagNode>>;
  internalContestAwardedUsers?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  internalContestFeedbackEmail?: Maybe<Scalars["String"]["output"]>;
  internalContestRegisterEmail?: Maybe<Scalars["String"]["output"]>;
  /** Used for stuff to create orders manually */
  internalStoreItems: Array<StoreItemNode>;
  interviewAllSessions: InterviewSessionConnection;
  interviewCardList?: Maybe<Array<InterviewCardNode>>;
  interviewCurrentSession?: Maybe<InterviewSessionNode>;
  interviewGlobalStats: InterviewGlobalStatsNode;
  interviewIncompleteCards: Array<Scalars["ID"]["output"]>;
  interviewScoreProgress: Array<InterviewScoreProgressNode>;
  interviewSession?: Maybe<InterviewSessionNode>;
  interviewSubmissions: InterviewSubmissionConnection;
  interviewed?: Maybe<InterviewSurveyNode>;
  isCurrentUserAuthenticated?: Maybe<Scalars["Boolean"]["output"]>;
  isEasterEggCollected: Scalars["Boolean"]["output"];
  isMyCollectedFavorite: Scalars["Boolean"]["output"];
  isMyCreatedFavorite: Scalars["Boolean"]["output"];
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isProgressCalculated: Scalars["Boolean"]["output"];
  isSolutionTopic: Scalars["Boolean"]["output"];
  item?: Maybe<ItemNode>;
  items?: Maybe<Array<Maybe<ItemNode>>>;
  languageList?: Maybe<Array<Maybe<LanguageNode>>>;
  lastAcSubmission?: Maybe<SubmissionDetailsNode>;
  learningContext?: Maybe<LearningContextNode>;
  learningContextV2?: Maybe<LearningContextNodeV3>;
  libraryActivity?: Maybe<QuestionActivityNode>;
  libraryActivityTypes: Array<LibraryActivityType>;
  libraryCategories: Array<Scalars["String"]["output"]>;
  libraryDefaultTemplate?: Maybe<LibraryTemplate>;
  libraryDifficulties: Array<LibraryDifficulty>;
  libraryLangList: Array<LibraryLanguage>;
  libraryMatchTypes: Array<LibraryMatchType>;
  libraryQuestion?: Maybe<LibraryQuestionNode>;
  libraryQuestionTypes: Array<LibraryQuestionType>;
  libraryQuestions: LibraryQuestionConnection;
  librarySolutionStatus: Array<LibrarySolutionStatus>;
  localRanking?: Maybe<LocalRankingNode>;
  locationDict?: Maybe<Scalars["JSONString"]["output"]>;
  locations: Array<Maybe<LocationAutocomplete>>;
  loginSocial?: Maybe<Array<Maybe<SocialLoginNode>>>;
  loginUrl?: Maybe<Scalars["String"]["output"]>;
  managementCompanyQuestionOptions: CompanyQuestionOptionsNode;
  managementCompanyQuestionV2: CompanyQuestionListNode;
  managementCompanyQuestions: ManagementCompanyQuestionListNode;
  /** Company Tag List */
  managementCompanyTags: ManagementCompanyTagNode;
  managementIncVoteLogs: ManagementIncVoteLogListNone;
  managementQuestionAdminVoteOptions: QuestionAdminVoteOptionsNode;
  managementRoles: Array<ManagementRoleNode>;
  managementTagAdminLogs: ManagementTagAdminLogListNode;
  /** Tag Category List */
  managementTagCategories: Array<Maybe<TagCategoryNode>>;
  /** Tag Group List */
  managementTagGroups: Array<Maybe<TagGroupNode>>;
  /** Tag List */
  managementTags: ManagementTagNode;
  managementTeamMembers: ManagementTeamMemberListNode;
  matchedUser?: Maybe<UserNode>;
  matchedUsers?: Maybe<Array<Maybe<UserNode>>>;
  medal?: Maybe<MedalNode>;
  mostRecentCard?: Maybe<CardNode>;
  myCollectedFavoriteList: FavoriteBriefListNode;
  myContests?: Maybe<PagifiedUserContestStatNode>;
  myCreatedFavoriteList: FavoriteBriefListNode;
  myOrders?: Maybe<Array<StoreOrderNode>>;
  myPlaygroundState: PlaygroundStateNode;
  newFeatureAnnouncements?: Maybe<Array<NewFeatureAnnouncementNode>>;
  nextChallengePairs?: Maybe<Scalars["JSONString"]["output"]>;
  nextSolution?: Maybe<TopicNode>;
  notification?: Maybe<NotificationNode>;
  notificationCategories?: Maybe<Array<Maybe<NotificationCategoryNode>>>;
  notificationStatus?: Maybe<Scalars["JSONString"]["output"]>;
  notificationTypes?: Maybe<Array<Maybe<NotificationTypeNode>>>;
  notifications?: Maybe<NotificationConnection>;
  occupationRecordList?: Maybe<Array<Maybe<OccupationRecordNode>>>;
  /** official IDE dynamic layout */
  officialIdeDynamicLayout: Array<OfficialIdeLayoutNode>;
  officialSolutionFeedbacks?: Maybe<PagifiedOfficialSolutionFeedbackDetailNode>;
  omFavoriteList: OmFavoriteListNode;
  omFavoriteLogs: Array<Maybe<OmFavoriteLogNode>>;
  omFavoriteQuestionList: OmFavoriteQuestionListNode;
  ongoingVirtualContest?: Maybe<ContestNode>;
  orderDetails?: Maybe<StoreOrderNode>;
  panelQuestionList?: Maybe<PanelQuestionListNode>;
  pastContests: PagifiedContestNode;
  planCompletedPlans: Array<PlanStudyPlanNodeWithGroup>;
  planGroupCatalogs: Array<PlanCatalogNode>;
  planGroupDetail?: Maybe<PlanDetailPlanGroupNode>;
  planGroupsByCatalog: PlanGroupListNode;
  planGroupsByTag: PlanGroupListNode;
  planOngoingProgresses: Array<PlanBriefProgressNodeWithPlan>;
  planProgressDetail?: Maybe<PlanProgressNodeWithPlan>;
  playground?: Maybe<PlaygroundNode>;
  playgroundCode?: Maybe<PlaygroundCodeNode>;
  playgroundSnippet?: Maybe<PlaygroundSnippetNode>;
  playgroundTemplate?: Maybe<PlaygroundTemplateNode>;
  pointList?: Maybe<PointListNode>;
  pollInterval?: Maybe<Scalars["Int"]["output"]>;
  post?: Maybe<PostNode>;
  premiumBetaFeatures: Array<PremiumBetaFeatureNode>;
  prevSolution?: Maybe<TopicNode>;
  privateContestAllParticipants?: Maybe<Array<UserNode>>;
  privateContestPastParticipants?: Maybe<Array<PrivateContestUserNode>>;
  privateContestRegisteredUserIds?: Maybe<
    Array<Maybe<Scalars["ID"]["output"]>>
  >;
  problemsetLearningContext?: Maybe<LearningContextNodeV2>;
  question?: Maybe<QuestionNode>;
  questionCompanyTags?: Maybe<CompanyTagConnection>;
  questionDiscussionTopic?: Maybe<TopicNode>;
  questionFeedback?: Maybe<PagifiedQuestionFeedbackNode>;
  questionFeedbackReasons: Array<QuestionFeedbackReason>;
  questionList: PagifiedQuestionNode;
  questionNumByTags: Scalars["Int"]["output"];
  questionSatisfactionSurvey: QuestionSatisfactionSurveyNode;
  questionSolutions: QuestionSolutionsNode;
  questionSubmissionList?: Maybe<SubmissionListNode>;
  questionTag?: Maybe<QuestionTagNode>;
  questionTagsAdmin?: Maybe<Array<QuestionTagNode>>;
  questionTagsSuggest?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  questionTopicTags?: Maybe<TopicTagConnection>;
  questionTopics?: Maybe<PagifiedTopicNode>;
  questionTopicsList?: Maybe<TopicConnection>;
  randomPanelQuestion?: Maybe<Scalars["String"]["output"]>;
  randomQuestion?: Maybe<QuestionNode>;
  recaptchaKey?: Maybe<Scalars["String"]["output"]>;
  recaptchaKeyV2?: Maybe<Scalars["String"]["output"]>;
  recentAcSubmissionList: Array<SubmissionDumpNode>;
  recentSubmissionList?: Maybe<Array<SubmissionDumpNode>>;
  recommendSolutionTags: Array<Maybe<SolutionTagNode>>;
  redeemedTimeTravelTicketCount: Scalars["Int"]["output"];
  relatedSolutions: Array<Maybe<TopicNode>>;
  rewindData?: Maybe<RewindNode>;
  rootCategory: Array<DiscussCategoryNode>;
  schools: Array<SchoolNode>;
  scriptTaskResult?: Maybe<Scalars["JSONString"]["output"]>;
  scripts?: Maybe<Array<ScriptNode>>;
  sessions?: Maybe<DebugSessionNode>;
  showAnnualModalOnQd?: Maybe<MedalNode>;
  siteAnnouncements?: Maybe<Array<Maybe<SiteAnnouncementNode>>>;
  siteRegion?: Maybe<Scalars["String"]["output"]>;
  sitewideAnnouncement?: Maybe<Scalars["String"]["output"]>;
  skillTags?: Maybe<Array<Maybe<SkillTagNode>>>;
  solutionLanguageTags: Array<Maybe<SolutionTagNode>>;
  solutionTopicTags: Array<Maybe<SolutionTagNode>>;
  solvedQuestionsInfo: PagifiedQuestionLastSolveNode;
  spamModerationPosts?: Maybe<PagifiedPostNode>;
  /** start to practice a question in a favorite */
  startToPracticeQuestion?: Maybe<FavoriteQuestionNode>;
  statusList?: Maybe<Array<Maybe<SubmissionStatusNode>>>;
  storeItems: Array<StoreItemNode>;
  storeOrderOperationLogs: Array<OrderOperationLogNode>;
  streakCounter?: Maybe<StreakCounterNode>;
  stripePublicKey: Scalars["String"]["output"];
  studyPlanMedalPolling?: Maybe<StudyPlanMedalPollingNode>;
  /** get all enabled study plan catalogs */
  studyPlanV2Catalogs: Array<StudyPlanCatalogNode>;
  /** Poll this API after submission get AC. */
  studyPlanV2CompletedStatus?: Maybe<PlanCompletedStatusNode>;
  /** get a study plan detail */
  studyPlanV2Detail?: Maybe<StudyPlanDetailNode>;
  /** get a user progress detail */
  studyPlanV2ProgressDetail?: Maybe<PlanUserProgressDetailNode>;
  /** get the ranking board of a study plan */
  studyPlanV2RankingBoard: UserRankInfoList;
  /** get the most recent user completed progress detail */
  studyPlanV2RecentCompletedProgress?: Maybe<PlanUserProgressDetailNode>;
  /** whether the current user hide on the rank board */
  studyPlanV2UserHideRank?: Maybe<Scalars["Boolean"]["output"]>;
  /** user on going study plans */
  studyPlanV2UserProgresses?: Maybe<PlanUserProgressListNode>;
  /** get current user rank in a plan */
  studyPlanV2UserRank?: Maybe<UserRankInfoNode>;
  /** get weekly task records by year and month */
  studyPlanV2WeeklyTaskRecords?: Maybe<UserWeeklyTaskRecordListNode>;
  /** get advertisement study plans of feature on playground */
  studyPlansV2AdFeature: Array<StudyPlanFeatureNode>;
  /** get advertisement study plans on questions page */
  studyPlansV2AdQuestionPage: Array<StudyPlanBriefNode>;
  /** get study plans by catalog */
  studyPlansV2ByCatalog: StudyPlanListNode;
  /** get study plans by tag */
  studyPlansV2ByTag: StudyPlanListNode;
  /** get study plans by upc */
  studyPlansV2ByUpc: Array<StudyPlanBriefNode>;
  /** get study plans for homepage */
  studyPlansV2ForHomepage: Array<StudyPlanWithProgressNode>;
  /** query submission complexity */
  submissionComplexity?: Maybe<SubmissionComplexityNode>;
  submissionDetails?: Maybe<SubmissionDetailsNode>;
  submissionList?: Maybe<SubmissionListNode>;
  submittableLanguageList?: Maybe<Array<Maybe<LanguageNode>>>;
  subscribeUrl?: Maybe<Scalars["String"]["output"]>;
  subscriptionPricing?: Maybe<SubscriptionsNode>;
  subscriptionReferral?: Maybe<SubscriptionReferralNode>;
  survey?: Maybe<SurveyNode>;
  surveyStatus: SurveyStatusNode;
  surveyV2: SurveyV2Node;
  surveyV2WithoutCheckFunc: SurveyV2Node;
  syncedCode?: Maybe<SyncedCodeNode>;
  tagTopicList?: Maybe<TopicConnection>;
  topTwoContests: Array<Maybe<ContestNode>>;
  topic?: Maybe<TopicNode>;
  topicComments?: Maybe<PagifiedCommentNode>;
  topicTag?: Maybe<TopicTagNode>;
  topicTags: Array<DiscussTopicTagNode>;
  topicTagsSuggest: Array<DiscussTopicTagNode>;
  topicUsers: Array<Maybe<UserNode>>;
  upcV2InterestTags?: Maybe<Array<UpcV2TagNode>>;
  upcomingContests?: Maybe<Array<ContestNode>>;
  user?: Maybe<UserNode>;
  userAccountFrozenInfo: UserAccountFrozenInfoNode;
  userCategoryTopics?: Maybe<TopicConnection>;
  userContestRanking?: Maybe<UserContestRankingNode>;
  userContestRankingHistory?: Maybe<Array<UserContestRankingHistoryNode>>;
  userCountryCode?: Maybe<Scalars["String"]["output"]>;
  userManagementCreditCards: Array<Maybe<ManagementCreditCardNode>>;
  userManagementIpList: ManagementIpListNode;
  userManagementIpManagementLogs?: Maybe<Array<IpManagementLogNode>>;
  userManagementLogsByManager?: Maybe<Array<UserManagementLogNode>>;
  userManagementOperationHistory: ManagementOperationHistoryNode;
  userManagementPremiumTrialRecordDetail: TrialRecordNode;
  userManagementPremiumTrialRecords: TrialRecordListNode;
  userManagementScoreHistory: ManagementScoreListNode;
  userManagementSearch?: Maybe<ManagementUserListNode>;
  userManagementStoreOrders: ManagementStoreOrderListNode;
  userManagementStripeCharges: ManagementStripeChargeListNode;
  userManagementUserBanTypes: Array<Maybe<UserBanTypeNode>>;
  userManagementUserDetail?: Maybe<ManagementUserDetailNode>;
  userManagementVac: VacRecordListNode;
  userOfficialSolutionFeedback?: Maybe<OfficialSolutionFeedbackBriefNode>;
  /** 获取用户当前 session 的做题进展，新版接口 */
  userProfileUserQuestionProgressV2: UserQuestionProgressNodeV2;
  /** get user's session progress, solved and submission calendar */
  userProgressCalendarV2?: Maybe<UserProgressCalendarNodeV2>;
  /** get user's first submission year */
  userProgressFirstSubmissionYear?: Maybe<Scalars["Int"]["output"]>;
  /** get user's session progress of knowledge favorite */
  userProgressKnowledgeList?: Maybe<UserProgressKnowledgeInfoListNode>;
  /** get user's session progress */
  userProgressQuestionList?: Maybe<UserProgressQuestionListNode>;
  /** get user's session progress of submission list */
  userProgressSubmissionList?: Maybe<UserProgressSubmissionListNode>;
  userRecentTopics?: Maybe<Array<TopicNode>>;
  userReports?: Maybe<PagifiedUserReportNode>;
  userSolutionTopics?: Maybe<TopicConnection>;
  userStatus?: Maybe<MeNode>;
  userToManage?: Maybe<UserNodeAdminOnly>;
  users?: Maybe<Array<Maybe<UserNode>>>;
  validTimeTravelTicketCount: Scalars["Int"]["output"];
  video?: Maybe<VideoNode>;
  votes?: Maybe<Scalars["JSONString"]["output"]>;
  webPage?: Maybe<WebPageNode>;
  websocketUrl?: Maybe<Scalars["String"]["output"]>;
  wordListTypes: Array<Maybe<WordListTypeNode>>;
  worldCities?: Maybe<Array<Scalars["String"]["output"]>>;
  worldCountries?: Maybe<Array<Scalars["String"]["output"]>>;
  worldSubcountries?: Maybe<Array<Scalars["String"]["output"]>>;
  /** list of yearly medals which are qualified to acquire */
  yearlyMedalsQualified?: Maybe<Array<MedalBriefNode>>;
};

export type QueryAbRecordNameArgs = {
  abName: Scalars["String"]["input"];
};

export type QueryAchievementArgs = {
  name: Scalars["String"]["input"];
};

export type QueryAdvertisementByLocationArgs = {
  adLocation: AdLocationEnum;
};

export type QueryAllCommentsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CommentSortingOption>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  reportType?: InputMaybe<ReportTypeEnum>;
  reported?: InputMaybe<ReportedStatus>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<PostStatus>;
  submissionCount?: InputMaybe<Scalars["Int"]["input"]>;
  usernames?: InputMaybe<Scalars["String"]["input"]>;
  wordListType?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllContributionsArgs = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  company?: InputMaybe<Scalars["Boolean"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  questionCategory?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllPlaygroundCodesArgs = {
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllPlaygroundSnippetsArgs = {
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllQuestionsArgs = {
  containContest?: InputMaybe<Scalars["Boolean"]["input"]>;
  containExplore?: InputMaybe<Scalars["Boolean"]["input"]>;
  containMain?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryAllQuestionsRawArgs = {
  containContest?: InputMaybe<Scalars["Boolean"]["input"]>;
  containExplore?: InputMaybe<Scalars["Boolean"]["input"]>;
  containMain?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryAllTopicsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  reportType?: InputMaybe<ReportTypeEnum>;
  reported?: InputMaybe<ReportedStatus>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<PostStatus>;
  submissionCount?: InputMaybe<Scalars["Int"]["input"]>;
  usernames?: InputMaybe<Scalars["String"]["input"]>;
  wordListType?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAllUsersArgs = {
  avatarStatus?: InputMaybe<AvatarStatusEnum>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  isAvatarCheck?: InputMaybe<Scalars["Boolean"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type QueryAllVirtualContestScoresPagifiedArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryApplicationArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryArticleArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCachedTrendingCategoryTopicsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCanSeeOtherSubmissionHistoryArgs = {
  userSlug: Scalars["String"]["input"];
};

export type QueryCardArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCardsArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCategoriesArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCategoryTopicListArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryChallengesArgs = {
  fromDate?: InputMaybe<Scalars["String"]["input"]>;
  includeFuture?: InputMaybe<Scalars["Boolean"]["input"]>;
  includePast?: InputMaybe<Scalars["Boolean"]["input"]>;
  toDate?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryChapterArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
  chapterId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryChaptersArgs = {
  cardSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCodeWithMemoryArgs = {
  lang: Scalars["String"]["input"];
  memory: Scalars["Int"]["input"];
  questionId: Scalars["Int"]["input"];
  skip?: Scalars["Int"]["input"];
};

export type QueryCodeWithRuntimeArgs = {
  lang: Scalars["String"]["input"];
  questionId: Scalars["Int"]["input"];
  runtime: Scalars["Int"]["input"];
  skip?: Scalars["Int"]["input"];
};

export type QueryCommentArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCommentContextArgs = {
  commentId?: InputMaybe<Scalars["Int"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Scalars["String"]["input"]>;
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCommentRepliesArgs = {
  commentId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCommonKeywordArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryCompaniesArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCompanyTagArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryContestArgs = {
  titleSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryContestDetailArgs = {
  contestSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryContestQuestionArgs = {
  contestSlug?: InputMaybe<Scalars["String"]["input"]>;
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryContestQuestionSubmissionListArgs = {
  contestSlug: Scalars["String"]["input"];
  lang?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  questionSlug: Scalars["String"]["input"];
  status?: InputMaybe<SubmissionStatusEnum>;
};

export type QueryContestReportApproveSummaryArgs = {
  reportIds: Array<InputMaybe<Scalars["String"]["input"]>>;
};

export type QueryContestReportsArgs = {
  contestSlug: Scalars["String"]["input"];
};

export type QueryContestReportsLccnArgs = {
  contestSlug: Scalars["String"]["input"];
};

export type QueryContestTopicsArgs = {
  contestTitleSlug?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryContributionArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryCreatedPublicFavoriteListArgs = {
  userSlug: Scalars["String"]["input"];
};

export type QueryDailyChallengeMedalArgs = {
  month?: InputMaybe<Scalars["Int"]["input"]>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDailyCodingChallengeArgs = {
  month?: InputMaybe<Scalars["Int"]["input"]>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDailyCodingChallengeV2Args = {
  month?: InputMaybe<Scalars["Int"]["input"]>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryDashboardItemArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryDccSubmissionInfoArgs = {
  submissionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryDccSubmissionPollingArgs = {
  submissionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryDccSubmissionPollingV2Args = {
  challengeQuestionId?: InputMaybe<Scalars["ID"]["input"]>;
  submissionId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryDeleteUserRequestsArgs = {
  input: DeleteUserRequestInput;
};

export type QueryDiscussCategoryArgs = {
  slugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryDiscussQuestionTopicTagsArgs = {
  numTags?: InputMaybe<Scalars["Int"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
  selectedTags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  tagType?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryEmailEventArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryEmailSendSessionArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryEmailTemplateArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryFavoriteArgs = {
  name: Scalars["String"]["input"];
};

export type QueryFavoriteDetailV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryFavoriteQuestionAcStatusArgs = {
  favoriteSlug: Scalars["String"]["input"];
  titleSlug: Scalars["String"]["input"];
};

export type QueryFavoriteQuestionListArgs = {
  favoriteSlug: Scalars["String"]["input"];
  filter?: InputMaybe<FavoriteQuestionFilterInput>;
};

export type QueryFavoriteSubmitAcProgressArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryFavoriteUserQuestionProgressV2Args = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryFeedbackMetaInfoBySlugArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryFilteredSubmissionsArgs = {
  inputFilters?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryFlagResourceTypeArgs = {
  name: ResourceTypeEnum;
};

export type QueryFrontendQuestionSubmissionResultsArgs = {
  submissionId: Scalars["String"]["input"];
};

export type QueryGlobalRankingArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryGrowthbookTestArgs = {
  featureKey: Scalars["String"]["input"];
};

export type QueryHasAccessToFavoriteArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryHasFavoriteSessionResetArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryHtmlArticleArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryInternalContestAwardedUsersArgs = {
  contestSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryInterviewAllSessionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryInterviewSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryInterviewSubmissionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  questionId: Scalars["ID"]["input"];
  sessionId: Scalars["ID"]["input"];
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryIsMyCollectedFavoriteArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryIsMyCreatedFavoriteArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryIsSolutionTopicArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryItemArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryItemsArgs = {
  chapterSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryLastAcSubmissionArgs = {
  questionSlug: Scalars["String"]["input"];
};

export type QueryLearningContextArgs = {
  currentQuestionSlug: Scalars["String"]["input"];
  envType?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  needQuestion?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryLearningContextV2Args = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  childFavoriteSlug?: InputMaybe<Scalars["String"]["input"]>;
  currentQuestionSlug: Scalars["String"]["input"];
  envId?: InputMaybe<Scalars["String"]["input"]>;
  envType?: InputMaybe<Scalars["String"]["input"]>;
  favoriteFilters?: InputMaybe<FavoriteQuestionFilterInput>;
  filters?: InputMaybe<QuestionListFilterInput>;
  needQuestion?: InputMaybe<Scalars["Boolean"]["input"]>;
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryLibraryActivityArgs = {
  id: Scalars["String"]["input"];
};

export type QueryLibraryDefaultTemplateArgs = {
  metadata: Scalars["String"]["input"];
};

export type QueryLibraryQuestionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryLibraryQuestionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  param: LibraryQuestionsInput;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLocalRankingArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLocationsArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryManagementCompanyQuestionOptionsArgs = {
  companyTagId: Scalars["Int"]["input"];
};

export type QueryManagementCompanyQuestionV2Args = {
  data: ManagementCompanyQuestionsV2Input;
};

export type QueryManagementCompanyQuestionsArgs = {
  data: ManagementCompanyQuestionsInput;
};

export type QueryManagementCompanyTagsArgs = {
  data: ManagementCompanyTagsInput;
};

export type QueryManagementIncVoteLogsArgs = {
  data: ManagementIncVoteLogsInput;
};

export type QueryManagementTagAdminLogsArgs = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  tagId: Scalars["Int"]["input"];
};

export type QueryManagementTagCategoriesArgs = {
  data: ManagementTagCategoriesInput;
};

export type QueryManagementTagsArgs = {
  data: ManagementTagsInput;
};

export type QueryManagementTeamMembersArgs = {
  data: ManagementTeamMembersInput;
};

export type QueryMatchedUserArgs = {
  username: Scalars["String"]["input"];
};

export type QueryMatchedUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  namePrefix: Scalars["String"]["input"];
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryMedalArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryMyContestsArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryMyCreatedFavoriteListArgs = {
  currentQuestionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryNextChallengePairsArgs = {
  titleSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryNextSolutionArgs = {
  filters: QuestionSolutionsFilterInput;
  topicId: Scalars["Int"]["input"];
};

export type QueryNotificationArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryOfficialSolutionFeedbacksArgs = {
  filters: OfficialSolutionFeedbackFilterInput;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryOmFavoriteListArgs = {
  data?: OmFavoriteListInput;
};

export type QueryOmFavoriteLogsArgs = {
  favoriteSlug: Scalars["String"]["input"];
};

export type QueryOmFavoriteQuestionListArgs = {
  favoriteSlug: Scalars["String"]["input"];
  searchKeyword?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryOrderDetailsArgs = {
  orderId: Scalars["String"]["input"];
};

export type QueryPanelQuestionListArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  currentQuestionSlug: Scalars["String"]["input"];
  envId?: InputMaybe<Scalars["String"]["input"]>;
  envType?: InputMaybe<Scalars["String"]["input"]>;
  filters?: InputMaybe<QuestionListFilterInput>;
};

export type QueryPastContestsArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPlanGroupDetailArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryPlanGroupsByCatalogArgs = {
  catalogSlug: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPlanGroupsByTagArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  tagSlug: Scalars["String"]["input"];
};

export type QueryPlanOngoingProgressesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPlanProgressDetailArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPlaygroundArgs = {
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPlaygroundCodeArgs = {
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPlaygroundSnippetArgs = {
  functionName?: InputMaybe<Scalars["String"]["input"]>;
  langSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPlaygroundTemplateArgs = {
  templateId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPointListArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPostArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPrevSolutionArgs = {
  filters: QuestionSolutionsFilterInput;
  topicId: Scalars["Int"]["input"];
};

export type QueryPrivateContestRegisteredUserIdsArgs = {
  contestSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryProblemsetLearningContextArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  filters?: InputMaybe<QuestionListFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  questionSlug: Scalars["String"]["input"];
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryQuestionArgs = {
  titleSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryQuestionCompanyTagsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryQuestionDiscussionTopicArgs = {
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryQuestionFeedbackArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  hasComment?: InputMaybe<Scalars["Boolean"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  questionSlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  reasons?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startDate?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryQuestionListArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  filters?: InputMaybe<QuestionListFilterInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryQuestionNumByTagsArgs = {
  difficultyTagSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  knowledgeTagSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  languageTagSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryQuestionSolutionsArgs = {
  filters: QuestionSolutionsFilterInput;
};

export type QueryQuestionSubmissionListArgs = {
  lang?: InputMaybe<Scalars["Int"]["input"]>;
  lastKey?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  questionSlug: Scalars["String"]["input"];
  status?: InputMaybe<Scalars["Int"]["input"]>;
  withNotes?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryQuestionTagArgs = {
  tagId: Scalars["ID"]["input"];
};

export type QueryQuestionTagsAdminArgs = {
  tagType: TagTypeEnum;
};

export type QueryQuestionTagsSuggestArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryQuestionTopicTagsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryQuestionTopicsArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryQuestionTopicsListArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryRandomPanelQuestionArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  childFavoriteSlug?: InputMaybe<Scalars["String"]["input"]>;
  currentQuestionSlug: Scalars["String"]["input"];
  envId?: InputMaybe<Scalars["String"]["input"]>;
  envType?: InputMaybe<Scalars["String"]["input"]>;
  favoriteFilters?: InputMaybe<FavoriteQuestionFilterInput>;
  filters?: InputMaybe<QuestionListFilterInput>;
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRandomQuestionArgs = {
  categorySlug?: InputMaybe<Scalars["String"]["input"]>;
  filters?: InputMaybe<QuestionListFilterInput>;
};

export type QueryRecentAcSubmissionListArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRecentSubmissionListArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRecommendSolutionTagsArgs = {
  questionSlug: Scalars["String"]["input"];
};

export type QueryRelatedSolutionsArgs = {
  topicId: Scalars["Int"]["input"];
};

export type QueryRewindDataArgs = {
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerySchoolsArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryScriptTaskResultArgs = {
  taskId: Scalars["String"]["input"];
};

export type QueryShowAnnualModalOnQdArgs = {
  submissionId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerySkillTagsArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySolutionLanguageTagsArgs = {
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySolutionTopicTagsArgs = {
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySolvedQuestionsInfoArgs = {
  filters?: InputMaybe<ProgressListFilterInput>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerySpamModerationPostsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Scalars["String"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  reportType?: InputMaybe<ReportTypeEnum>;
  reported?: InputMaybe<ReportedStatus>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<PostStatus>;
  submissionCount?: InputMaybe<Scalars["Int"]["input"]>;
  usernames?: InputMaybe<Scalars["String"]["input"]>;
  wordListType?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryStartToPracticeQuestionArgs = {
  favoriteSlug: Scalars["String"]["input"];
  filter?: InputMaybe<FavoriteQuestionFilterInput>;
};

export type QueryStoreOrderOperationLogsArgs = {
  orderId: Scalars["ID"]["input"];
};

export type QueryStudyPlanMedalPollingArgs = {
  submissionId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStudyPlanV2CompletedStatusArgs = {
  planSlug: Scalars["String"]["input"];
  submissionId: Scalars["ID"]["input"];
};

export type QueryStudyPlanV2DetailArgs = {
  planSlug: Scalars["String"]["input"];
};

export type QueryStudyPlanV2ProgressDetailArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  planSlug: Scalars["String"]["input"];
};

export type QueryStudyPlanV2RankingBoardArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  planSlug: Scalars["String"]["input"];
};

export type QueryStudyPlanV2RecentCompletedProgressArgs = {
  planSlug: Scalars["String"]["input"];
};

export type QueryStudyPlanV2UserProgressesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  progressType: PlanUserProgressTypeEnum;
};

export type QueryStudyPlanV2UserRankArgs = {
  planSlug: Scalars["String"]["input"];
};

export type QueryStudyPlanV2WeeklyTaskRecordsArgs = {
  month: Scalars["Int"]["input"];
  planSlug: Scalars["String"]["input"];
  progressId?: InputMaybe<Scalars["String"]["input"]>;
  year: Scalars["Int"]["input"];
};

export type QueryStudyPlansV2ByCatalogArgs = {
  catalogSlug: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStudyPlansV2ByTagArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  tagSlug: Scalars["String"]["input"];
};

export type QuerySubmissionComplexityArgs = {
  submissionId: Scalars["ID"]["input"];
};

export type QuerySubmissionDetailsArgs = {
  submissionId: Scalars["Int"]["input"];
};

export type QuerySubmissionListArgs = {
  lastKey?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  questionSlug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySubscriptionPricingArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySurveyArgs = {
  surveyId: Scalars["ID"]["input"];
};

export type QuerySurveyStatusArgs = {
  surveyType: SurveyType;
};

export type QuerySurveyV2Args = {
  surveyKwargs?: InputMaybe<Scalars["JSONString"]["input"]>;
  surveySlug: Scalars["String"]["input"];
};

export type QuerySurveyV2WithoutCheckFuncArgs = {
  surveySlug: Scalars["String"]["input"];
};

export type QuerySyncedCodeArgs = {
  lang: Scalars["Int"]["input"];
  questionId: Scalars["Int"]["input"];
};

export type QueryTagTopicListArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  tag: Scalars["String"]["input"];
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTopicArgs = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryTopicCommentsArgs = {
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Scalars["String"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  topicId: Scalars["Int"]["input"];
};

export type QueryTopicTagArgs = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTopicTagsArgs = {
  categorySlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  numTags?: InputMaybe<Scalars["Int"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  selectedTags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  tagType?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTopicTagsSuggestArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTopicUsersArgs = {
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryUserCategoryTopicsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserContestRankingArgs = {
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserContestRankingHistoryArgs = {
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserManagementCreditCardsArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryUserManagementIpListArgs = {
  data: UserManagementIpListInput;
};

export type QueryUserManagementIpManagementLogsArgs = {
  ipAddress: Scalars["String"]["input"];
};

export type QueryUserManagementLogsByManagerArgs = {
  userSlug: Scalars["String"]["input"];
};

export type QueryUserManagementOperationHistoryArgs = {
  data: UserManagementOperationHistoryInput;
};

export type QueryUserManagementPremiumTrialRecordDetailArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUserManagementPremiumTrialRecordsArgs = {
  data: PremiumTrialRecordsInput;
};

export type QueryUserManagementScoreHistoryArgs = {
  data: UserManagementScoreHistoryInput;
};

export type QueryUserManagementSearchArgs = {
  dimension: SearchDimensionType;
  keyword: Scalars["String"]["input"];
  limit?: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
};

export type QueryUserManagementStoreOrdersArgs = {
  data: UserManagementStoreOrdersInput;
};

export type QueryUserManagementStripeChargesArgs = {
  data: UserManagementStripeChargesInput;
};

export type QueryUserManagementUserDetailArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryUserManagementVacArgs = {
  data: VacRecordsInput;
};

export type QueryUserOfficialSolutionFeedbackArgs = {
  questionSlug: Scalars["String"]["input"];
};

export type QueryUserProfileUserQuestionProgressV2Args = {
  userSlug: Scalars["String"]["input"];
};

export type QueryUserProgressCalendarV2Args = {
  month?: InputMaybe<Scalars["Int"]["input"]>;
  queryType: ProgressCalendarQueryTypeEnum;
  year: Scalars["Int"]["input"];
};

export type QueryUserProgressQuestionListArgs = {
  filters?: InputMaybe<UserProgressQuestionListInput>;
};

export type QueryUserProgressSubmissionListArgs = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  questionSlug: Scalars["String"]["input"];
};

export type QueryUserRecentTopicsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserReportsArgs = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  handled?: InputMaybe<Scalars["Boolean"]["input"]>;
  numPerPage?: InputMaybe<Scalars["Int"]["input"]>;
  pageNo?: InputMaybe<Scalars["Int"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type QueryUserSolutionTopicsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TopicSortingOption>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserToManageArgs = {
  usernameOrEmail?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUsersArgs = {
  usernamePrefix?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryVideoArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryVotesArgs = {
  topicId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryWebPageArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryWorldCitiesArgs = {
  country?: InputMaybe<Scalars["String"]["input"]>;
  subcountry?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryWorldSubcountriesArgs = {
  country?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryYearlyMedalsQualifiedArgs = {
  excludeAcquired?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuestionActivityNode = {
  activityType: LibraryActivityType;
  dateCreated: Scalars["DateTime"]["output"];
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  isBaseline: Scalars["Boolean"]["output"];
  payload?: Maybe<Scalars["String"]["output"]>;
  question: LibraryQuestionNode;
  user?: Maybe<PrivateContestUserNode>;
};

export type QuestionActivityNodeConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<QuestionActivityNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `QuestionActivityNode` and its cursor. */
export type QuestionActivityNodeEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<QuestionActivityNode>;
};

export type QuestionAdminVoteOptionsNode = {
  positionOptions?: Maybe<Array<Maybe<CommonTagNode>>>;
  timeOptions?: Maybe<Array<Maybe<InterviewTimeOption>>>;
};

export type QuestionAttachmentInput = {
  content: Scalars["String"]["input"];
  extension: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type QuestionAttachmentNode = {
  content: Scalars["String"]["output"];
  extension: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type QuestionCountByDifficultyNode = {
  count: Scalars["Int"]["output"];
  difficulty: Scalars["String"]["output"];
};

export type QuestionCountNode = {
  count: Scalars["Int"]["output"];
  difficulty: DifficultyDescribedEnum;
};

/** An enumeration. */
export type QuestionEditorTypeEnum =
  /** CKEditor */
  | "CKEDITOR"
  /** Markdown */
  | "MARKDOWN";

export type QuestionFeedbackNode = {
  createDate: Scalars["DateTime"]["output"];
  extraInfo: Scalars["String"]["output"];
  hasComment?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  question: QuestionNode;
  reasonChoices: Scalars["JSONString"]["output"];
  user: PrivateContestUserNode;
};

export type QuestionFeedbackReason = {
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type QuestionLastSolveNode = {
  lastAcSession?: Maybe<QuestionSolveSessionNode>;
  question: QuestionNode;
  totalSolves: Scalars["Int"]["output"];
};

export type QuestionListFilterInput = {
  companies?: InputMaybe<Array<Scalars["String"]["input"]>>;
  difficulty?: InputMaybe<DifficultyEnum>;
  listId?: InputMaybe<Scalars["String"]["input"]>;
  orderBy?: InputMaybe<QuestionOrderByEnum>;
  premiumOnly?: InputMaybe<Scalars["Boolean"]["input"]>;
  searchKeywords?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<SortingOrderEnum>;
  status?: InputMaybe<UserQuestionStatus>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QuestionNode = {
  acRate: Scalars["Float"]["output"];
  adminUrl?: Maybe<Scalars["String"]["output"]>;
  allowDiscuss: Scalars["Boolean"]["output"];
  article?: Maybe<Scalars["JSONString"]["output"]>;
  articleTopicId?: Maybe<Scalars["String"]["output"]>;
  attachments: Array<QuestionAttachmentNode>;
  boundTopicId?: Maybe<Scalars["Int"]["output"]>;
  canSeeQuestion: Scalars["Boolean"]["output"];
  categoryTitle: Scalars["String"]["output"];
  challengeQuestion?: Maybe<ChallengeQuestionNode>;
  challengeQuestionsV2: Array<ChallengeQuestionNode>;
  codeDefinition?: Maybe<Scalars["JSONString"]["output"]>;
  codeSnippets?: Maybe<Array<Maybe<CodeSnippetNode>>>;
  companyTagStats?: Maybe<Scalars["JSONString"]["output"]>;
  companyTagStatsV2?: Maybe<Scalars["JSONString"]["output"]>;
  companyTags?: Maybe<Array<CompanyTagNode>>;
  content?: Maybe<Scalars["String"]["output"]>;
  contributors: Array<Maybe<ContributorNode>>;
  dataSchemas: Array<Maybe<Scalars["String"]["output"]>>;
  difficulty: Scalars["String"]["output"];
  /** discussion count for one question, 0 if no question exist */
  discussionCount: Scalars["Int"]["output"];
  dislikes: Scalars["Int"]["output"];
  enableDebugger: Scalars["Boolean"]["output"];
  enableRunCode: Scalars["Boolean"]["output"];
  enableSubmit: Scalars["Boolean"]["output"];
  enableTestMode: Scalars["Boolean"]["output"];
  envInfo: Scalars["String"]["output"];
  exampleTestcaseList: Array<Maybe<Scalars["String"]["output"]>>;
  exampleTestcases: Scalars["String"]["output"];
  freqBar?: Maybe<Scalars["Float"]["output"]>;
  frequency: Scalars["Float"]["output"];
  frontendPreviews?: Maybe<Scalars["JSONString"]["output"]>;
  hasFrontendPreview: Scalars["Boolean"]["output"];
  hasSolution: Scalars["Boolean"]["output"];
  hasVideoSolution: Scalars["Boolean"]["output"];
  hide: Scalars["Boolean"]["output"];
  hideLastTestcases?: Maybe<HideLastTestcasesNode>;
  hints: Array<Maybe<Scalars["String"]["output"]>>;
  infoVerified: Scalars["Boolean"]["output"];
  interpretUrl: Scalars["String"]["output"];
  isFavor: Scalars["Boolean"]["output"];
  isLiked?: Maybe<Scalars["Boolean"]["output"]>;
  isPaidOnly: Scalars["Boolean"]["output"];
  judgeType: Scalars["String"]["output"];
  judgerAvailable: Scalars["Boolean"]["output"];
  langToValidPlayground?: Maybe<Scalars["JSONString"]["output"]>;
  libraryUrl?: Maybe<Scalars["String"]["output"]>;
  likes: Scalars["Int"]["output"];
  metaData: Scalars["String"]["output"];
  mysqlSchemas: Array<Maybe<Scalars["String"]["output"]>>;
  nextChallengePairs?: Maybe<Scalars["JSONString"]["output"]>;
  nextChallenges: Array<QuestionNode>;
  note?: Maybe<Scalars["String"]["output"]>;
  questionDetailUrl: Scalars["String"]["output"];
  questionFrontendId: Scalars["String"]["output"];
  questionId: Scalars["String"]["output"];
  questionTitle: Scalars["String"]["output"];
  questionTitleSlug: Scalars["String"]["output"];
  questionType: Scalars["String"]["output"];
  randomQuestionUrl: Scalars["String"]["output"];
  sampleTestCase: Scalars["String"]["output"];
  sessionId: Scalars["String"]["output"];
  similarQuestionList: Array<Maybe<QuestionNode>>;
  similarQuestions: Scalars["JSONString"]["output"];
  solution?: Maybe<ArticleNode>;
  /** solution for one question, 0 if no question exist */
  solutionNum: Scalars["Int"]["output"];
  stats: Scalars["JSONString"]["output"];
  status?: Maybe<Scalars["String"]["output"]>;
  submitUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags: Array<TopicTagNode>;
  translatedContent?: Maybe<Scalars["String"]["output"]>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
  urlManager: Scalars["JSONString"]["output"];
};

export type QuestionNodeNextChallengePairsArgs = {
  questionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuestionOrderByEnum =
  | "AC_RATE"
  | "DIFFICULTY"
  | "FREQUENCY"
  | "FRONTEND_ID"
  | "SOLUTION_NUM";

export type QuestionSatisfactionSurveyNode = {
  leetcoinAmount: Scalars["Int"]["output"];
  showSurvey: Scalars["Boolean"]["output"];
  surveyJson?: Maybe<Scalars["JSONString"]["output"]>;
};

export type QuestionSolutionsFilterInput = {
  first: Scalars["Int"]["input"];
  languageTags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  orderBy?: InputMaybe<TopicSortingOption>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  questionSlug: Scalars["String"]["input"];
  skip: Scalars["Int"]["input"];
  topicTags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QuestionSolutionsNode = {
  hasDirectResults?: Maybe<Scalars["Boolean"]["output"]>;
  solutions: Array<Maybe<TopicNode>>;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

export type QuestionSolveSessionNode = {
  question: QuestionNode;
  time?: Maybe<Scalars["DateTime"]["output"]>;
  wrongAttempts: Scalars["Int"]["output"];
};

export type QuestionSortFieldEnum = "LAST_CREATE" | "LAST_MODIFIED";

export type QuestionTagNode = {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  /** Deprecated in Tag System. Still used by old products. */
  isEnabled: Scalars["Boolean"]["output"];
  keywords: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  questions: Array<QuestionTagStatsNode>;
  slug: Scalars["String"]["output"];
};

export type QuestionTagStatsNode = {
  frontendId: Scalars["ID"]["output"];
  id: Scalars["ID"]["output"];
  interviewedCount: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
};

/** quit a study plan */
export type QuitStudyPlan = {
  /** whether delete this progress record */
  deleted: Scalars["Boolean"]["output"];
  ok: Scalars["Boolean"]["output"];
  progressId: Scalars["String"]["output"];
};

export type RankingNode = {
  currentGlobalRanking?: Maybe<Scalars["Int"]["output"]>;
  currentRating?: Maybe<Scalars["String"]["output"]>;
  dataRegion?: Maybe<Scalars["String"]["output"]>;
  ranking?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<UserNode>;
};

export type RateArticle = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  scoreResult?: Maybe<Scalars["Int"]["output"]>;
};

export type RatingNode = {
  average: Scalars["Decimal"]["output"];
  count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  userRating?: Maybe<UserRatingNode>;
};

export type RawQuestionNode = {
  categoryTitle?: Maybe<Scalars["String"]["output"]>;
  difficulty?: Maybe<Scalars["String"]["output"]>;
  isPaidOnly?: Maybe<Scalars["Boolean"]["output"]>;
  questionFrontendId?: Maybe<Scalars["String"]["output"]>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  titleSlug?: Maybe<Scalars["String"]["output"]>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

export type RecordAbExperimentEvent = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type RejectContestReports = {
  rejectedReports: Array<ContestReportNode>;
};

export type RejectContribution = {
  contribution?: Maybe<ContributionNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type RejectContributionContributionArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type RemoveFavoriteFromMyCollectionV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type RemoveQuestionFromFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  favoriteIdHash?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  userName?: Maybe<Scalars["String"]["output"]>;
};

export type RemoveQuestionFromFavoriteV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type RemoveUsersFromInternalContest = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ReorderFavoriteQuestionV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ReportInfoNode = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isHandled?: Maybe<Scalars["Boolean"]["output"]>;
  reportType?: Maybe<Scalars["String"]["output"]>;
  reporter: PrivateContestUserNode;
};

export type ReportTypeEnum =
  | "ABUSE"
  | "ADVERTISING"
  | "ALL"
  | "FAKE"
  | "ILLEGAL"
  | "NON_ENGLISH"
  | "OTHER"
  | "POLITICS"
  | "SEXUAL"
  | "TERRORISM"
  | "VIOLENT";

export type ReportUser = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type ReportedStatus = "ALL" | "REPORTED_HANDLED" | "REPORTED_UNHANDLED";

export type RequestAnalysisEmail = {
  sessionWithReport?: Maybe<InterviewSessionNode>;
};

export type RequestUpdateToReportedPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ResetFavoriteSessionV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ResetWeeklyTaskSchedule = {
  ok: Scalars["Boolean"]["output"];
  progressId: Scalars["String"]["output"];
};

export type ResourceTypeEnum = "DUMMY";

export type ResourceTypeNode = {
  flaggedObjects: FlaggedObjectConnection;
  name: ResourceTypeEnum;
  operations?: Maybe<Array<FlagStatus>>;
};

export type ResourceTypeNodeFlaggedObjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<SortingOrderEnum>;
  orderBy?: InputMaybe<FlaggedObjectListOrderByEnum>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<FlagStatus>;
};

export type ReviewFlaggedObjectInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Use this to locate the object. Will ignore resourceType and resourceId if this is provided. */
  flagResultId?: InputMaybe<Scalars["ID"]["input"]>;
  operation: FlagStatus;
  reasonId?: InputMaybe<Scalars["ID"]["input"]>;
  /** Use this together with resourceType as an alternative way to locate object. */
  resourceId?: InputMaybe<Scalars["String"]["input"]>;
  /** Use this together with resourceId as an alternative way to locate object. */
  resourceType?: InputMaybe<ResourceTypeEnum>;
};

export type RewardPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  post?: Maybe<PostNode>;
};

export type RewindNode = {
  ageInDays: Scalars["Int"]["output"];
  attendedContestCount: Scalars["Int"]["output"];
  badges?: Maybe<Array<Maybe<UserBadgeNode>>>;
  currentGlobalRank?: Maybe<Scalars["Int"]["output"]>;
  dccSolvedCount: Scalars["Int"]["output"];
  easyProblemsSolved: Scalars["Int"]["output"];
  givenVoteDownCount: Scalars["Int"]["output"];
  givenVoteUpCount: Scalars["Int"]["output"];
  hardProblemsSolved: Scalars["Int"]["output"];
  highestRankedContest?: Maybe<ContestNode>;
  highestRankedContestId: Scalars["Int"]["output"];
  highestRankingInContest?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  maxStreak: Scalars["Int"]["output"];
  mediumProblemsSolved: Scalars["Int"]["output"];
  mostAttemptedQuestion?: Maybe<QuestionNode>;
  mostAttemptedQuestionId: Scalars["Int"]["output"];
  mostSolvedTags?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  mostUsedLanguage: Scalars["String"]["output"];
  mostUsedLanguageId: Scalars["Int"]["output"];
  problemSolvePercentile: Scalars["Float"]["output"];
  receivedVoteUpCount: Scalars["Int"]["output"];
  solutionsPublished: Scalars["Int"]["output"];
  tags: Scalars["String"]["output"];
  totalAcSubmissions: Scalars["Int"]["output"];
  totalQuestionsSolved?: Maybe<Scalars["Int"]["output"]>;
  totalSubmissions: Scalars["Int"]["output"];
  userId: Scalars["Int"]["output"];
  year: Scalars["Int"]["output"];
};

export type RuleNode = {
  difficultyNames: Array<Maybe<Scalars["String"]["output"]>>;
  knowledgeNames: Array<Maybe<Scalars["String"]["output"]>>;
  languageName: Scalars["String"]["output"];
};

export type RunDebuggerCommand = {
  session: DebugSessionNode;
  taskId: Scalars["String"]["output"];
};

export type SampleCodeNode = {
  code: Scalars["String"]["output"];
  hasNext: Scalars["Boolean"]["output"];
  hasPrevious: Scalars["Boolean"]["output"];
};

export type SaveSessionCode = {
  session?: Maybe<InterviewSessionNode>;
};

export type SchoolNode = {
  colloquial: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

/** An enumeration. */
export type ScoreCategory =
  /** ADD_QUESTION */
  | "A_0"
  /** ADD_TESTCASE */
  | "A_1"
  /** TOP_IN_CONTEST */
  | "A_2"
  /** JOIN_CONTEST */
  | "A_3"
  /** SOCIAL_ACCOUNT_BINDING */
  | "A_4"
  /** DAILY_LOGIN */
  | "A_5"
  /** SEVEN_DAY_LOGIN */
  | "A_6"
  /** THIRTY_DAY_LOGIN */
  | "A_7"
  /** REDEEM */
  | "A_8"
  /** CREATE_QUESTION_TRANSLATION */
  | "A_9"
  /** QUESTION_TRANSLATION_ACCEPTED */
  | "A_10"
  /** ACCOUNT_TRANSFER */
  | "A_11"
  /** BASIC_INFO_PROVIDED */
  | "A_12"
  /** AVATAR_PROVIDED */
  | "A_13"
  /** EXPERIENCE_PROVIDED */
  | "A_14"
  /** PHONE_BINDING */
  | "A_15"
  /** POST_TOPIC */
  | "A_16"
  /** JOIN_CONTEST_FIRST_TIME */
  | "A_17"
  /** EMAIL_CONFIRMED */
  | "A_18"
  /** JOIN_INTERNAL_CONTEST */
  | "A_19"
  /** FESTIVAL */
  | "A_20"
  /** SURVEY_COMPLETED */
  | "A_21"
  /** JOIN_BOTH_CONTESTS_SAME_WEEK */
  | "A_22"
  /** THIRTY_DAY_CHALLENGE_DAILY_COMPLETE */
  | "A_23"
  /** THIRTY_DAY_CHALLENGE_25_COMPLETE */
  | "A_24"
  /** THIRTY_DAY_CHALLENGE_30_COMPLETE */
  | "A_25"
  /** EXPLORE_CARD_COMPLETED */
  | "A_26"
  /** DISCUSS_FIRST_POST */
  | "A_27"
  /** CONTEST_REPORT_APPROVED */
  | "A_28"
  /** DAILY_SUBMIT_ACCEPTED_SOLUTIONS */
  | "A_29"
  /** LEETCODING_CHALLENGE_DAILY */
  | "A_30"
  /** LEETCODING_CHALLENGE_MID */
  | "A_31"
  /** LEETCODING_CHALLENGE_ALL */
  | "A_32"
  /** LEETCODING_CHALLENGE_PREM */
  | "A_33"
  /** CONTEST_EASTER_EGG */
  | "A_34"
  /** QUESTION_DETAIL_SATISFACTION_SURVEY */
  | "A_35"
  /** NEW_STUDY_PLAN_SURVEY */
  | "A_36"
  /** JAVASCRIPT_PROBLEM_SURVEY */
  | "A_37"
  /** PANDAS_PROBLEM_SURVEY */
  | "A_38"
  /** QD_DYNAMIC_SURVEY */
  | "A_39"
  /** PANDAS_INTRO_STUDY_PLAN_SURVEY */
  | "A_40"
  /** IDE_BACK_QD3_SURVEY */
  | "A_41"
  /** CONTEST_DYNAMIC_SURVEY */
  | "A_42"
  /** CUSTOM */
  | "A_100";

export type ScoreNode = {
  category: ScoreCategory;
  date: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  extraInfo?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  score: Scalars["Int"]["output"];
};

/** An enumeration. */
export type ScoreTypeEnum =
  /** Admin Reward */
  | "ADMIN_REWARD"
  /** All */
  | "ALL"
  /** Mission Reward */
  | "MISSION_REWARD";

export type ScriptNode = {
  content: Scalars["String"]["output"];
  creationDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  inputSample: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

/** An enumeration. */
export type SearchDimensionType =
  /** all */
  | "ALL"
  /** email */
  | "EMAIL"
  /** previous email */
  | "PREVIOUS_EMAIL"
  /** previous username */
  | "PREVIOUS_USERNAME"
  /** stripe_id */
  | "STRIPE_ID"
  /** user_id */
  | "USER_ID"
  /** user_name */
  | "USER_NAME";

export type SearchMetaContentType = "BODY" | "COMMENT" | "REPLY" | "TITLE";

export type SearchMetaNode = {
  commentAuthor?: Maybe<UserNode>;
  content?: Maybe<Scalars["String"]["output"]>;
  contentType: SearchMetaContentType;
  highlights: Array<Maybe<Scalars["String"]["output"]>>;
  replyAuthor?: Maybe<UserNode>;
};

/** An enumeration. */
export type SearchUserType =
  /** user_id */
  | "USER_ID"
  /** user_name */
  | "USER_NAME";

export type SendAccountRecoveryEmail = {
  message?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SendInternalContestEmail = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SendVerificationEmail = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type SessionStatus = "ACCEPTED" | "EXITED" | "STARTED" | "TIMEOUT";

export type SetBlacklistWords = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SetItemStartTime = {
  cardId?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  newProgress?: Maybe<Scalars["JSONString"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SetNotificationSetting = {
  error?: Maybe<Scalars["String"]["output"]>;
  notificationType?: Maybe<NotificationTypeNode>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** whether hide current user rank info on rank boards */
export type SetVisibleOnPlanRank = {
  ok: Scalars["Boolean"]["output"];
};

export type ShareEventNode = {
  endDate: Scalars["Date"]["output"];
  hasUserSharedEvent: Scalars["Boolean"]["output"];
  startDate: Scalars["Date"]["output"];
};

export type SiteAnnouncementNode = {
  blacklistUrls?: Maybe<Scalars["String"]["output"]>;
  content: Scalars["String"]["output"];
  navbarItem?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  whitelistUrls?: Maybe<Scalars["String"]["output"]>;
};

export type SkillTagNode = {
  name: Scalars["String"]["output"];
};

export type SocialAccountNode = {
  accountProvider: Scalars["String"]["output"];
  profileLink?: Maybe<Scalars["String"]["output"]>;
};

export type SocialLoginNode = {
  id?: Maybe<Scalars["String"]["output"]>;
  loginUrl?: Maybe<Scalars["String"]["output"]>;
};

export type SolutionTagNode = {
  count: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

/** An enumeration. */
export type SortingEnum =
  /** ascending */
  | "ASCENDING"
  /** descending */
  | "DESCENDING";

/** An enumeration. */
export type SortingOrderDescribedEnum =
  /** ascending */
  | "ASCENDING"
  /** descending */
  | "DESCENDING";

export type SortingOrderEnum = "ASCENDING" | "DESCENDING";

export type SponsorNode = {
  darkLogo?: Maybe<Scalars["String"]["output"]>;
  description: Scalars["String"]["output"];
  lightLogo?: Maybe<Scalars["String"]["output"]>;
  logo?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  watermark?: Maybe<Scalars["String"]["output"]>;
  website: Scalars["String"]["output"];
};

export type StartProgress = {
  progress?: Maybe<PlanProgressNode>;
};

export type StartSession = {
  session: DebugSessionNode;
  taskId: Scalars["String"]["output"];
};

export type StoreAddressNode = {
  address: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  createDate: Scalars["DateTime"]["output"];
  creationDate: Scalars["DateTime"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  phone: Scalars["String"]["output"];
  postalCode: Scalars["String"]["output"];
  province: Scalars["String"]["output"];
  storeorderSet: Array<StoreOrderNode>;
  updationDate: Scalars["DateTime"]["output"];
  user?: Maybe<PrivateContestUserNode>;
};

export type StoreAdminCreateOrder = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type StoreAdminCreateOrderInput = {
  address: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  details?: InputMaybe<Scalars["JSONString"]["input"]>;
  itemSlug?: InputMaybe<Scalars["String"]["input"]>;
  itemSlugs?: InputMaybe<Array<Scalars["String"]["input"]>>;
  note?: InputMaybe<Scalars["String"]["input"]>;
  phone: Scalars["String"]["input"];
  recipient: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
  zipCode: Scalars["String"]["input"];
};

export type StoreItemNode = {
  available: Scalars["Boolean"]["output"];
  buckydropConfig?: Maybe<Scalars["String"]["output"]>;
  creationDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  disabledMsg?: Maybe<Scalars["String"]["output"]>;
  displayConfig?: Maybe<Scalars["JSONString"]["output"]>;
  fields?: Maybe<Array<Scalars["String"]["output"]>>;
  hideIfPaid: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  imgSlug?: Maybe<Scalars["String"]["output"]>;
  itemSlug: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  needsProcessing: Scalars["Boolean"]["output"];
  needsShipping: Scalars["Boolean"]["output"];
  order: Scalars["Int"]["output"];
  promoImg?: Maybe<Scalars["String"]["output"]>;
  promoImgSlug?: Maybe<Scalars["String"]["output"]>;
  show?: Maybe<Scalars["Boolean"]["output"]>;
  storeorderSet: Array<StoreOrderNode>;
  updationDate: Scalars["DateTime"]["output"];
  value: Scalars["Int"]["output"];
  visible: Scalars["Boolean"]["output"];
};

export type StoreOrderEdit = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type StoreOrderNode = {
  address?: Maybe<StoreAddressNode>;
  buckydropPackageCode?: Maybe<Scalars["String"]["output"]>;
  buckydropShopOrderId?: Maybe<Scalars["String"]["output"]>;
  createDate: Scalars["DateTime"]["output"];
  creationDate: Scalars["DateTime"]["output"];
  details?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  items: Array<StoreItemNode>;
  note: Scalars["String"]["output"];
  /** Invisible to user */
  noteByStaff?: Maybe<Scalars["String"]["output"]>;
  orderId: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  storeorderoperationlogSet: Array<OrderOperationLogNode>;
  trackingId: Scalars["String"]["output"];
  updationDate: Scalars["DateTime"]["output"];
  user?: Maybe<UserNode>;
};

export type StoreOrderSave = {
  error?: Maybe<Scalars["String"]["output"]>;
  storeOrder?: Maybe<StoreOrderNode>;
  success: Scalars["Boolean"]["output"];
};

export type StreakCounterNode = {
  currentDayCompleted: Scalars["Boolean"]["output"];
  daysSkipped: Scalars["Int"]["output"];
  hasCompletedChallenge: Scalars["Boolean"]["output"];
  streakCount: Scalars["Int"]["output"];
};

/** An enumeration. */
export type StripeChargeStatusEnum =
  /** All */
  | "ALL"
  /** Disputed */
  | "DISPUTED"
  /** NoPaid */
  | "NO_PAID"
  /** Paid */
  | "PAID"
  /** Refunded */
  | "REFUNDED";

export type StudyPlanAwardNode = {
  badge: UserBadgeNode;
  medal: MedalNode;
};

export type StudyPlanBriefNode = {
  cover: Scalars["String"]["output"];
  highlight: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  onGoing: Scalars["Boolean"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
};

export type StudyPlanCatalogNode = {
  name: Scalars["String"]["output"];
  recommendedStudyPlans?: Maybe<Array<Scalars["String"]["output"]>>;
  slug: Scalars["String"]["output"];
};

export type StudyPlanDetailNode = {
  allowedLanguages: Array<Scalars["String"]["output"]>;
  award?: Maybe<MedalNode>;
  awardDescription: Scalars["String"]["output"];
  colorPalette?: Maybe<Scalars["String"]["output"]>;
  cover: Scalars["String"]["output"];
  defaultLanguage?: Maybe<Scalars["String"]["output"]>;
  description: Scalars["String"]["output"];
  hasMedal: Scalars["Boolean"]["output"];
  highlight: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  needShowTags: Scalars["Boolean"]["output"];
  onGoing: Scalars["Boolean"]["output"];
  planSubGroups: Array<PlanSubGroupInfoNode>;
  premiumOnly: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  relatedStudyPlans: Array<StudyPlanBriefNode>;
  slug: Scalars["String"]["output"];
  staticCoverPicture: Scalars["String"]["output"];
  threeDimensionUrl?: Maybe<Scalars["String"]["output"]>;
};

export type StudyPlanFeatureNode = {
  cover: Scalars["String"]["output"];
  coverBackgroundColor: Scalars["String"]["output"];
  highlight: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  onGoing: Scalars["Boolean"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
};

export type StudyPlanListNode = {
  hasMore: Scalars["Boolean"]["output"];
  studyPlans: Array<StudyPlanBriefNode>;
  total: Scalars["Int"]["output"];
};

export type StudyPlanMedalPollingNode = {
  awards?: Maybe<Array<Maybe<StudyPlanAwardNode>>>;
  keepPolling: Scalars["Boolean"]["output"];
};

export type StudyPlanWithProgressNode = {
  cover: Scalars["String"]["output"];
  finishedQuestionNum?: Maybe<Scalars["Int"]["output"]>;
  highlight: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  onGoing: Scalars["Boolean"]["output"];
  premiumOnly: Scalars["Boolean"]["output"];
  questionNum: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
};

export type SubmissionComplexityNode = {
  isLimited: Scalars["Boolean"]["output"];
  memoryComplexity?: Maybe<ComplexityInfoNode>;
  timeComplexity?: Maybe<ComplexityInfoNode>;
};

export type SubmissionCountNode = {
  count: Scalars["Int"]["output"];
  difficulty: Scalars["String"]["output"];
  submissions: Scalars["Int"]["output"];
};

export type SubmissionDetailsNode = {
  code: Scalars["String"]["output"];
  codeOutput?: Maybe<Scalars["String"]["output"]>;
  compileError?: Maybe<Scalars["String"]["output"]>;
  expectedOutput?: Maybe<Scalars["String"]["output"]>;
  flagType?: Maybe<SubmissionFlagTypeEnum>;
  fullCodeOutput?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  lang: LanguageNode;
  lastTestcase?: Maybe<Scalars["String"]["output"]>;
  memory?: Maybe<Scalars["Int"]["output"]>;
  memoryDisplay: Scalars["String"]["output"];
  memoryDistribution: Scalars["String"]["output"];
  memoryPercentile?: Maybe<Scalars["Float"]["output"]>;
  notes: Scalars["String"]["output"];
  question: QuestionNode;
  runtime?: Maybe<Scalars["Int"]["output"]>;
  runtimeDisplay: Scalars["String"]["output"];
  runtimeDistribution: Scalars["String"]["output"];
  runtimeError?: Maybe<Scalars["String"]["output"]>;
  runtimePercentile?: Maybe<Scalars["Float"]["output"]>;
  statusCode: Scalars["Int"]["output"];
  stdOutput?: Maybe<Scalars["String"]["output"]>;
  testBodies?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  testDescriptions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  testInfo?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  timestamp: Scalars["Int"]["output"];
  topicTags: Array<Maybe<TopicTagNode>>;
  totalCorrect?: Maybe<Scalars["Int"]["output"]>;
  totalTestcases?: Maybe<Scalars["Int"]["output"]>;
  user: UserNode;
};

export type SubmissionDumpNode = {
  flagType?: Maybe<SubmissionFlagTypeEnum>;
  hasNotes?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  isPending?: Maybe<Scalars["String"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  langName?: Maybe<Scalars["String"]["output"]>;
  langVerboseName?: Maybe<Scalars["String"]["output"]>;
  memory?: Maybe<Scalars["String"]["output"]>;
  notes?: Maybe<Scalars["String"]["output"]>;
  runtime?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  statusDisplay?: Maybe<Scalars["String"]["output"]>;
  time?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags?: Maybe<Array<Maybe<TopicTagNode>>>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type SubmissionFlagTypeEnum =
  /** blue */
  | "BLUE"
  /** green */
  | "GREEN"
  /** orange */
  | "ORANGE"
  /** purple */
  | "PURPLE"
  /** red */
  | "RED"
  /** white, not marked */
  | "WHITE";

export type SubmissionListNode = {
  hasNext?: Maybe<Scalars["Boolean"]["output"]>;
  lastKey?: Maybe<Scalars["String"]["output"]>;
  submissions?: Maybe<Array<Maybe<SubmissionDumpNode>>>;
};

/** An enumeration. */
export type SubmissionMemoryComplexity =
  /** O(1) */
  | "A_1"
  /** O(log n) */
  | "A_2"
  /** O(n) */
  | "A_3"
  /** O(n log n) */
  | "A_4"
  /** O(n²) */
  | "A_5"
  /** O(n³) */
  | "A_6"
  /** O(n⁴) */
  | "A_7"
  /** O(n⁵) */
  | "A_8"
  /** O(n⁶) */
  | "A_9"
  /** O(2ⁿ) */
  | "A_10"
  /** O(n!) */
  | "A_11";

export type SubmissionNoteComplexity = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type SubmissionStatusEnum =
  /** Accepted */
  | "AC"
  /** Compile Error */
  | "CE"
  /** Internal Error */
  | "IE"
  /** Memory Limit Exceeded */
  | "MLE"
  /** Output Limit Exceeded */
  | "OLE"
  /** Runtime Error */
  | "RE"
  /** Time Limit Exceeded */
  | "TLE"
  /** Timeout */
  | "TO"
  /** Wrong Answer */
  | "WA";

export type SubmissionStatusNode = {
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type SubmissionTimeComplexity =
  /** O(1) */
  | "A_1"
  /** O(log n) */
  | "A_2"
  /** O(n) */
  | "A_3"
  /** O(n log n) */
  | "A_4"
  /** O(n²) */
  | "A_5"
  /** O(n³) */
  | "A_6"
  /** O(n⁴) */
  | "A_7"
  /** O(n⁵) */
  | "A_8"
  /** O(n⁶) */
  | "A_9"
  /** O(2ⁿ) */
  | "A_10"
  /** O(n!) */
  | "A_11";

export type SubmissionVoteComplexity = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubmitCancelSurvey = {
  error?: Maybe<Scalars["String"]["output"]>;
};

export type SubmitQuestionSatisfactionSurvey = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type SubmitQuestionSuggestion = {
  msg?: Maybe<Scalars["String"]["output"]>;
};

export type SubmitSubscriptionSurvey = {
  error?: Maybe<Scalars["String"]["output"]>;
};

export type SubmitSurveyV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type SubscribeTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  subscribe?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type SubscriptionPricingNode = {
  canPurchaseCredit?: Maybe<Scalars["Boolean"]["output"]>;
  couponCode?: Maybe<Scalars["String"]["output"]>;
  discount: Scalars["Float"]["output"];
  discountPercent: Scalars["Float"]["output"];
  discountedPrice: Scalars["Float"]["output"];
  isEligibleForIndiaDiscount: Scalars["Boolean"]["output"];
  isValidCode: Scalars["Boolean"]["output"];
  originalPrice: Scalars["Float"]["output"];
  proration: Scalars["Float"]["output"];
};

export type SubscriptionReferralNode = {
  link: Scalars["String"]["output"];
  referredCount: Scalars["Int"]["output"];
};

export type SubscriptionViewCountIncrement = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubscriptionsNode = {
  monthlyPrice: SubscriptionPricingNode;
  yearlyPrice: SubscriptionPricingNode;
};

export type SurveyNode = {
  createDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  endDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  startDate: Scalars["DateTime"]["output"];
  surveyQuestions?: Maybe<Array<SurveyQuestionNode>>;
  surveyquestionSet: Array<SurveyQuestionNode>;
  title: Scalars["String"]["output"];
};

export type SurveyQuestionChoiceNode = {
  allowTextAnswer: Scalars["Boolean"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  surveyQuestion: SurveyQuestionNode;
  value: Scalars["String"]["output"];
};

export type SurveyQuestionNode = {
  choices?: Maybe<Array<SurveyQuestionChoiceNode>>;
  description: Scalars["String"]["output"];
  extra: Scalars["JSONString"]["output"];
  id: Scalars["ID"]["output"];
  isRequired: Scalars["Boolean"]["output"];
  questionType: SurveyQuestionQuestionType;
  survey: SurveyNode;
  surveyquestionchoiceSet: Array<SurveyQuestionChoiceNode>;
  title: Scalars["String"]["output"];
};

/** An enumeration. */
export type SurveyQuestionQuestionType =
  /** Yes/No */
  | "A_0"
  /** Radio */
  | "A_1"
  /** Written Response */
  | "A_2"
  /** Numeric Response */
  | "A_3"
  /** Checkbox */
  | "A_4";

export type SurveyStatusNode = {
  lastCompleted?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type SurveyType = "MOCK_INTERVIEW";

export type SurveyV2Node = {
  leetcoinAmount: Scalars["Int"]["output"];
  showSurvey: Scalars["Boolean"]["output"];
  surveyJson?: Maybe<Scalars["JSONString"]["output"]>;
};

export type SyncedCodeNode = {
  code: Scalars["String"]["output"];
  timestamp: Scalars["Int"]["output"];
};

/** An enumeration. */
export type TagAdminOperationType =
  /** Create */
  | "CREATE"
  /** Edit */
  | "EDIT"
  /** Enable */
  | "ENABLED"
  /** Map */
  | "MAP"
  /** Not Disable */
  | "NOT_ENABLED"
  /** Not Selectable */
  | "NOT_SELECTABLE"
  /** Not Standard */
  | "NOT_STANDARD"
  /** Selectable */
  | "SELECTABLE"
  /** Standard */
  | "STANDARD";

export type TagCategoryNode = {
  creationDate: Scalars["DateTime"]["output"];
  group: TagGroupNode;
  id: Scalars["ID"]["output"];
  isEnabled: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  tags: Array<TagNode>;
  updationDate: Scalars["DateTime"]["output"];
};

export type TagGroupNode = {
  creationDate: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  tagcategorySet: Array<TagCategoryNode>;
  updationDate: Scalars["DateTime"]["output"];
};

export type TagNode = {
  companySet: Array<InterviewCompanyNode>;
  createdAt: Scalars["DateTime"]["output"];
  discussTopicTag: Array<DiscussTopicTagNode>;
  favoriteSet: Array<FeaturedQuestionListNode>;
  favorites: Array<FeaturedQuestionListNode>;
  hotScore?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  interviewTagsCategories: Array<InterviewTagsCategoryNode>;
  /** Deprecated in Tag System. Still used by old products. */
  isEnabled: Scalars["Boolean"]["output"];
  /** Whether this is a standard tag or not */
  isStandard: Scalars["Boolean"]["output"];
  /** Whether this tag is enabled or not. If not enabled, we NEVER show it to our users. */
  isTagEnabled: Scalars["Boolean"]["output"];
  /** Whether user can select this tag or not */
  isUserSelectable: Scalars["Boolean"]["output"];
  keywords: Scalars["JSONString"]["output"];
  name: Scalars["String"]["output"];
  order?: Maybe<Scalars["Int"]["output"]>;
  parentTag?: Maybe<TagNode>;
  questionapplicationSet: Array<ApplicationNode>;
  slug: Scalars["String"]["output"];
  tagCategories: Array<TagCategoryNode>;
  /** Deprecated in Tag System. Still used by old products. */
  tagType?: Maybe<TagTypeNode>;
};

export type TagProblemCountsCategoryNode = {
  advanced: Array<TagProblemsCountNode>;
  fundamental: Array<TagProblemsCountNode>;
  intermediate: Array<TagProblemsCountNode>;
};

export type TagProblemsCountNode = {
  problemsSolved: Scalars["Int"]["output"];
  tagName: Scalars["String"]["output"];
  tagSlug: Scalars["String"]["output"];
};

export type TagSearchHit = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type TagTypeEnum = "COMPANY" | "SKILL" | "TOPIC";

export type TagTypeNode = {
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ToggleContestDynamicLayout = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ToggleContestRankingDynamicLayout = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ToggleFavorite = {
  card?: Maybe<CardNode>;
  errors?: Maybe<Scalars["JSONString"]["output"]>;
  isCurrentUserAuthenticated?: Maybe<Scalars["Boolean"]["output"]>;
  newFavoriteCards?: Maybe<Array<Maybe<CardNode>>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ToggleFavoriteSolution = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TogglePinComment = {
  comment?: Maybe<CommentNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TogglePinTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type TopicConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `Topic` and its cursor. */
export type TopicEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<TopicRelayNode>;
};

export type TopicNode = {
  authors?: Maybe<Array<Maybe<UserNode>>>;
  category?: Maybe<DiscussCategoryNode>;
  challengequestionSet: Array<ChallengeQuestionNode>;
  commentCount: Scalars["Int"]["output"];
  contestSet: Array<ContestNode>;
  favoriteCount: Scalars["Int"]["output"];
  hideFromTrending?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["Int"]["output"];
  index?: Maybe<Scalars["Int"]["output"]>;
  isFavorite?: Maybe<Scalars["Boolean"]["output"]>;
  lastActivity?: Maybe<Scalars["Int"]["output"]>;
  lastComment?: Maybe<CommentNode>;
  nodebbTid: Scalars["Int"]["output"];
  pinned: Scalars["Boolean"]["output"];
  pinnedAt?: Maybe<Scalars["DateTime"]["output"]>;
  post: PostNode;
  searchMeta?: Maybe<SearchMetaNode>;
  solutionTags: Array<Maybe<SolutionTagNode>>;
  subscribed?: Maybe<Scalars["Boolean"]["output"]>;
  tags: Array<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  topLevelCommentCount: Scalars["Int"]["output"];
  viewCount: Scalars["Int"]["output"];
};

export type TopicRelayNode = {
  challengequestionSet: Array<ChallengeQuestionNode>;
  commentCount: Scalars["Int"]["output"];
  commentSet: Array<CommentNode>;
  contestSet: Array<ContestNode>;
  id: Scalars["ID"]["output"];
  lastComment?: Maybe<CommentNode>;
  nodebbTid: Scalars["Int"]["output"];
  pinned: Scalars["Boolean"]["output"];
  pinnedAt?: Maybe<Scalars["DateTime"]["output"]>;
  post: PostNode;
  questionTitle?: Maybe<Scalars["String"]["output"]>;
  tags: Array<DiscussTopicTagNode>;
  title: Scalars["String"]["output"];
  topLevelCommentCount: Scalars["Int"]["output"];
  url: Scalars["String"]["output"];
  viewCount: Scalars["Int"]["output"];
};

/** An enumeration. */
export type TopicSortingOption =
  | "hot"
  | "most_posts"
  | "most_relevant"
  | "most_votes"
  | "newest_to_oldest"
  | "oldest_to_newest"
  | "recent_activity";

export type TopicTagConnection = {
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TopicTagEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

/** A Relay edge containing a `TopicTag` and its cursor. */
export type TopicTagEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node?: Maybe<TopicTagNode>;
};

export type TopicTagNode = {
  companySet: Array<InterviewCompanyNode>;
  createdAt: Scalars["DateTime"]["output"];
  discussTopicTag: Array<DiscussTopicTagNode>;
  favoriteSet: Array<FeaturedQuestionListNode>;
  favorites: Array<FeaturedQuestionListNode>;
  frequencies?: Maybe<Scalars["String"]["output"]>;
  hotScore?: Maybe<Scalars["Int"]["output"]>;
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  interviewTagsCategories: Array<InterviewTagsCategoryNode>;
  /** Deprecated in Tag System. Still used by old products. */
  isEnabled: Scalars["Boolean"]["output"];
  /** Whether this is a standard tag or not */
  isStandard: Scalars["Boolean"]["output"];
  /** Whether this tag is enabled or not. If not enabled, we NEVER show it to our users. */
  isTagEnabled: Scalars["Boolean"]["output"];
  /** Whether user can select this tag or not */
  isUserSelectable: Scalars["Boolean"]["output"];
  keywords: Scalars["JSONString"]["output"];
  name: Scalars["String"]["output"];
  questionIds?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  questionapplicationSet: Array<ApplicationNode>;
  questions?: Maybe<Array<QuestionNode>>;
  slug: Scalars["String"]["output"];
  tagCategories: Array<TagCategoryNode>;
  tagId: Scalars["Int"]["output"];
  /** Deprecated in Tag System. Still used by old products. */
  tagType?: Maybe<TagTypeNode>;
  translatedName?: Maybe<Scalars["String"]["output"]>;
};

/** An enumeration. */
export type TopicTagTagType =
  /** Company */
  "A_0";

export type TrendingDirectionEnum = "DOWN" | "NONE" | "UP";

export type TrialRecordListNode = {
  nodes: Array<TrialRecordNode>;
  totalNum: Scalars["Int"]["output"];
};

export type TrialRecordNode = {
  applicant: ManagementUserSimpleNode;
  applyTime: Scalars["DateTime"]["output"];
  attachments?: Maybe<Array<Scalars["String"]["output"]>>;
  id: Scalars["ID"]["output"];
  notes: Scalars["String"]["output"];
  premiumInfos?: Maybe<Array<Maybe<PremiumInfoNode>>>;
  reviewedTime?: Maybe<Scalars["DateTime"]["output"]>;
  sku: Scalars["String"]["output"];
  status: PremiumTrialApplyStatus;
  trialDays: Scalars["Int"]["output"];
  userInfo: ManagementUserSimpleNode;
  uuid: Scalars["ID"]["output"];
};

/** An enumeration. */
export type Type =
  | "AI_HELPER"
  | "BETA_USER_FLOW"
  | "CONTEST_DL"
  | "FRONTEND_CATEGORY"
  | "LC_IDE"
  | "LC_IDE_V2"
  | "NEW_PLAN_RANK_BOARD_ACCESS"
  | "NEW_PROBLEMLIST_PAGE"
  | "NEW_PROBLEM_DETAIL_PAGE"
  | "NEW_PROFILE_PAGE"
  | "NEW_STRIPE_INVOICE"
  | "NEW_STUDY_PLAN_ACCESS"
  | "NEW_SUBSCRIBE_PAGE";

/** An enumeration. */
export type UpcResponseType =
  | "BASIC_INFO"
  | "DESIRED_JOB"
  | "INTERVIEW_PREP_TIME";

export type UpcSubmitResponse = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmApplyForPremiumTrial = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmBanIp = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmBanUser = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmCreateScore = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmDeleteUserCreditCard = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmEditIpStatus = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type UmScoreCategoryEnum =
  | "ACCOUNT_TRANSFER"
  | "ADD_QUESTION"
  | "ADD_TESTCASE"
  | "AVATAR_PROVIDED"
  | "BASIC_INFO_PROVIDED"
  | "CONTEST_DYNAMIC_SURVEY"
  | "CONTEST_EASTER_EGG"
  | "CONTEST_REPORT_APPROVED"
  | "CREATE_QUESTION_TRANSLATION"
  | "CUSTOM"
  | "DAILY_LOGIN"
  | "DAILY_SUBMIT_ACCEPTED_SOLUTIONS"
  | "DISCUSS_FIRST_POST"
  | "EMAIL_CONFIRMED"
  | "EXPERIENCE_PROVIDED"
  | "EXPLORE_CARD_COMPLETED"
  | "FESTIVAL"
  | "IDE_BACK_QD3_SURVEY"
  | "JAVASCRIPT_PROBLEM_SURVEY"
  | "JOIN_BOTH_CONTESTS_SAME_WEEK"
  | "JOIN_CONTEST"
  | "JOIN_CONTEST_FIRST_TIME"
  | "JOIN_INTERNAL_CONTEST"
  | "LEETCODING_CHALLENGE_ALL"
  | "LEETCODING_CHALLENGE_DAILY"
  | "LEETCODING_CHALLENGE_MID"
  | "LEETCODING_CHALLENGE_PREM"
  | "NEW_STUDY_PLAN_SURVEY"
  | "PANDAS_INTRO_STUDY_PLAN_SURVEY"
  | "PANDAS_PROBLEM_SURVEY"
  | "PHONE_BINDING"
  | "POST_TOPIC"
  | "QD_DYNAMIC_SURVEY"
  | "QUESTION_DETAIL_SATISFACTION_SURVEY"
  | "QUESTION_TRANSLATION_ACCEPTED"
  | "REDEEM"
  | "SEVEN_DAY_LOGIN"
  | "SOCIAL_ACCOUNT_BINDING"
  | "SURVEY_COMPLETED"
  | "THIRTY_DAY_CHALLENGE_25_COMPLETE"
  | "THIRTY_DAY_CHALLENGE_30_COMPLETE"
  | "THIRTY_DAY_CHALLENGE_DAILY_COMPLETE"
  | "THIRTY_DAY_LOGIN"
  | "TOP_IN_CONTEST";

export type UmSendVerificationEmail = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UmSetEmailPrimary = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type UmStoreOrderStatusEnum = "Canceled" | "Processing" | "Shipped";

export type UnlockFavorite = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  unlockQuestion?: Maybe<FavoriteQuestionNode>;
};

export type UnlockShareEvent = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UnpublishContestAnnouncement = {
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

/** An enumeration. */
export type UpcV2CodingLevelEnum =
  /** ADVANCED */
  | "ADVANCED"
  /** BEGINNER */
  | "BEGINNER"
  /** EXPERT */
  | "EXPERT"
  /** INTERMEDIATE */
  | "INTERMEDIATE";

/** An enumeration. */
export type UpcV2PurposeEnum =
  /** ALL */
  | "ALL"
  /** INTERVIEW */
  | "INTERVIEW"
  /** STUDY */
  | "STUDY";

export type UpcV2SubmitSurvey = {
  ok: Scalars["Boolean"]["output"];
};

export type UpcV2SubmitSurveyInput = {
  codingLevel?: InputMaybe<UpcV2CodingLevelEnum>;
  interests?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  purposes?: InputMaybe<UpcV2PurposeEnum>;
};

export type UpcV2TagNode = {
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type UpcomingBadgeNode = {
  icon: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  progress: Scalars["Int"]["output"];
};

export type UpdateAnnualReportViewStatus = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateBetaParticipation = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  userStatus?: Maybe<MeNode>;
};

export type UpdateComment = {
  comment?: Maybe<CommentNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateContribution = {
  contribution?: Maybe<ContributionNode>;
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateContributionContributionArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateEducation = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  record?: Maybe<EducationRecordNode>;
};

export type UpdateEmailPrimary = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateFavoriteEmojiBackgroundV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateFavoriteIsPublicV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateFavoriteNameDescriptionV2 = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateInvalidUsername = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateNote = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  question?: Maybe<QuestionNode>;
};

export type UpdateOccupation = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  record?: Maybe<OccupationRecordNode>;
};

export type UpdatePassword = {
  errors: Array<Maybe<PasswordErrorEnum>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdatePlayground = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdatePlaygroundFolder = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateProblematicPost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateProfile = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateProfileV3 = {
  errors: Array<Maybe<ProfileUpdateErrorEnum>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdatePublicBadge = {
  activeBadge?: Maybe<UserBadgeNode>;
};

export type UpdateSolution = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type UpdateSubmissionNote = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateSyncedCode = {
  message?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateTeamMember = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateTopic = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type UpdateTopicWithCategory = {
  error?: Maybe<Scalars["String"]["output"]>;
  topic?: Maybe<TopicNode>;
};

export type UpdateUserAvatarStatus = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateUsername = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  userSlug?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
  warning?: Maybe<Scalars["String"]["output"]>;
};

export type UserAccountFrozenInfoNode = {
  notEligibleToDeleteAccountReasons?: Maybe<
    Array<Maybe<Scalars["String"]["output"]>>
  >;
  planDeleteDate?: Maybe<Scalars["Date"]["output"]>;
  userFrozenStatus: AccountFrozenStatus;
};

export type UserBadgeNode = {
  badge: BadgeBadge;
  category?: Maybe<BadgeCategoryEnum>;
  creationDate: Scalars["String"]["output"];
  displayName: Scalars["String"]["output"];
  expired: Scalars["Boolean"]["output"];
  expiredDate?: Maybe<Scalars["DateTime"]["output"]>;
  hoverText?: Maybe<Scalars["String"]["output"]>;
  icon: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  medal?: Maybe<MedalNode>;
  name: Scalars["String"]["output"];
  shortName: Scalars["String"]["output"];
  updationDate: Scalars["DateTime"]["output"];
  user: PrivateContestUserNode;
  userCount: Scalars["Int"]["output"];
};

export type UserBanTypeNode = {
  slug?: Maybe<Scalars["String"]["output"]>;
  typeName?: Maybe<Scalars["String"]["output"]>;
};

export type UserCalendarNode = {
  activeYears: Array<Maybe<Scalars["Int"]["output"]>>;
  dccBadges: Array<CalendarBadgeNode>;
  streak: Scalars["Int"]["output"];
  submissionCalendar: Scalars["JSONString"]["output"];
  totalActiveDays: Scalars["Int"]["output"];
  user: UserNode;
  year: Scalars["Int"]["output"];
};

export type UserContestRankingHistoryNode = {
  attended: Scalars["Boolean"]["output"];
  contest: ContestNode;
  finishTimeInSeconds: Scalars["Int"]["output"];
  problemsSolved: Scalars["Int"]["output"];
  ranking: Scalars["Int"]["output"];
  rating: Scalars["Float"]["output"];
  totalProblems: Scalars["Int"]["output"];
  trendDirection?: Maybe<TrendingDirectionEnum>;
};

export type UserContestRankingNode = {
  attendedContestsCount: Scalars["Int"]["output"];
  badge?: Maybe<UserBadgeNode>;
  globalRanking: Scalars["Int"]["output"];
  rating: Scalars["Float"]["output"];
  topPercentage: Scalars["Float"]["output"];
  totalParticipants: Scalars["Int"]["output"];
};

export type UserContestStatNode = {
  afterContestRating?: Maybe<Scalars["Int"]["output"]>;
  contest?: Maybe<ContestNode>;
  finishTimeInSeconds: Scalars["Int"]["output"];
  penaltyCount: Scalars["Int"]["output"];
  problemsSolved: Scalars["Int"]["output"];
  ranking?: Maybe<Scalars["Int"]["output"]>;
  ratingDiff?: Maybe<Scalars["Int"]["output"]>;
  totalParticipants?: Maybe<Scalars["Int"]["output"]>;
  totalProblems: Scalars["Int"]["output"];
};

export type UserContributionNode = {
  points: Scalars["Int"]["output"];
  questionCount: Scalars["Int"]["output"];
  testcaseCount: Scalars["Int"]["output"];
};

export type UserDailyQuestionStatus = "Finish" | "NotStart";

export type UserDailyQuestionStatusV2 = "Finish" | "NotStart";

export type UserIpNode = {
  banned: Scalars["Boolean"]["output"];
  firstAccessed: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  ipAddress?: Maybe<Scalars["String"]["output"]>;
  lastAccessed: Scalars["DateTime"]["output"];
  user: UserNodeAdminOnly;
  usersCountSharingThisIp: Scalars["Int"]["output"];
  usersSharingThisIp: Array<UserNodeAdminOnly>;
};

export type UserManagementIpListInput = {
  endedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  ip?: InputMaybe<Scalars["String"]["input"]>;
  limit?: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  startedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<IpStatusEnum>;
  userName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserManagementLogNode = {
  operation: Scalars["String"]["output"];
  operationTime: Scalars["DateTime"]["output"];
  operator: ManagementUserSimpleNode;
};

export type UserManagementOperationHistoryInput = {
  endedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  limit?: Scalars["Int"]["input"];
  operations?: InputMaybe<Array<InputMaybe<UserOperationEnum>>>;
  skip: Scalars["Int"]["input"];
  startedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type UserManagementScoreHistoryInput = {
  category?: InputMaybe<UmScoreCategoryEnum>;
  endedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  limit?: Scalars["Int"]["input"];
  scoreType?: InputMaybe<ScoreTypeEnum>;
  skip: Scalars["Int"]["input"];
  startedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type UserManagementStoreOrdersInput = {
  endedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  keywords?: InputMaybe<Scalars["String"]["input"]>;
  limit?: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  startedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<UmStoreOrderStatusEnum>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UserManagementStripeChargesInput = {
  endedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  keywords?: InputMaybe<Scalars["String"]["input"]>;
  limit?: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  startedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<StripeChargeStatusEnum>;
  userId: Scalars["ID"]["input"];
};

export type UserNode = {
  activeBadge?: Maybe<UserBadgeNode>;
  badges: Array<UserBadgeNode>;
  contestBadge?: Maybe<UserBadgeNode>;
  contributions: UserContributionNode;
  email?: Maybe<Scalars["String"]["output"]>;
  emails?: Maybe<Array<Maybe<EmailNode>>>;
  firstName: Scalars["String"]["output"];
  githubUrl?: Maybe<Scalars["String"]["output"]>;
  hasChangedUsernameRecently?: Maybe<Scalars["Boolean"]["output"]>;
  hasUsablePassword?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"]["output"];
  isCurrentUserPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isCurrentUserVerified?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussStaff?: Maybe<Scalars["Boolean"]["output"]>;
  joinedTimestamp: Scalars["Int"]["output"];
  languageProblemCount?: Maybe<Array<LanguageProblemCountNode>>;
  lastName: Scalars["String"]["output"];
  linkedinUrl?: Maybe<Scalars["String"]["output"]>;
  nameColor?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  problemsSolvedBeatsStats: Array<ProblemSolvedBeatsNode>;
  profile: UserProfileNode;
  socialAccounts?: Maybe<Array<Scalars["String"]["output"]>>;
  submissionCalendar: Scalars["JSONString"]["output"];
  submitStats: UserSubmitStatsNode;
  submitStatsGlobal: UserSubmitStatsNode;
  tagProblemCounts: TagProblemCountsCategoryNode;
  twitterUrl?: Maybe<Scalars["String"]["output"]>;
  upcomingBadges: Array<UpcomingBadgeNode>;
  userCalendar: UserCalendarNode;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
  yearJoined: Scalars["Int"]["output"];
};

export type UserNodeUserCalendarArgs = {
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnly = {
  achievementSet: Array<AchievementNode>;
  activeBadge?: Maybe<UserBadgeNode>;
  allUsersWithSharedIps: Array<UserNodeAdminOnly>;
  archiveduserSet: Array<ArchivedUserNode>;
  articlepageSet: Array<ArticleNode>;
  badgeSet: Array<UserBadgeNode>;
  badges: Array<UserBadgeNode>;
  banned: Scalars["Boolean"]["output"];
  categoryscoreSet: Array<InterviewTagsCategoryScoreNode>;
  commentSet: Array<CommentNode>;
  companySet: Array<SponsorNode>;
  completionSet: Array<CompletionNode>;
  contestBadge?: Maybe<UserBadgeNode>;
  contestreportSet: Array<ContestReportNode>;
  contestreportlccnSet: Array<ContestReportLccnNode>;
  contributionSet: Array<ContributionNode>;
  contributions: UserContributionNode;
  contributorSet: Array<ContributorNode>;
  createdBy: LibraryQuestionNodeConnection;
  dateJoined: Scalars["DateTime"]["output"];
  debugSession: Array<DebugSessionNode>;
  educationrecordSet: Array<EducationRecordNode>;
  email?: Maybe<Scalars["String"]["output"]>;
  emailaddressSet: Array<EmailNode>;
  emails?: Maybe<Array<Maybe<EmailNode>>>;
  favoriteSet: Array<FeaturedQuestionListNode>;
  firstName: Scalars["String"]["output"];
  flagSet: Array<FlagNode>;
  flagresultSet: Array<FlagResultNode>;
  githubUrl?: Maybe<Scalars["String"]["output"]>;
  hasChangedUsernameRecently?: Maybe<Scalars["Boolean"]["output"]>;
  hasUsablePassword?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"]["output"];
  isCurrentUserPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isCurrentUserVerified?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isDiscussStaff?: Maybe<Scalars["Boolean"]["output"]>;
  isPremium: Scalars["Boolean"]["output"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"]["output"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"]["output"];
  joinedTimestamp: Scalars["Int"]["output"];
  languageProblemCount?: Maybe<Array<LanguageProblemCountNode>>;
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  lastName: Scalars["String"]["output"];
  libraryactivitySet: QuestionActivityNodeConnection;
  linkedinUrl?: Maybe<Scalars["String"]["output"]>;
  nameColor?: Maybe<Scalars["String"]["output"]>;
  notificationSet: NotificationNodeConnection;
  occupationrecordSet: Array<OccupationRecordNode>;
  password: Scalars["String"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  playgroundSet: Array<PlaygroundNode>;
  playgroundfolderSet: Array<PlaygroundFolderNode>;
  playgroundtemplateSet: Array<PlaygroundTemplateNode>;
  postReport: Array<ReportInfoNode>;
  postSet: Array<PostNode>;
  problemsSolvedBeatsStats: Array<ProblemSolvedBeatsNode>;
  profile: UserProfileNode;
  questionSet: LibraryQuestionNodeConnection;
  questionapplicationSet: Array<ApplicationNode>;
  questionlastsolveSet: Array<QuestionLastSolveNode>;
  questionsolvesessionSet: Array<QuestionSolveSessionNode>;
  questionsuggestionSet: Array<QuestionFeedbackNode>;
  reportee: Array<UserReportNode>;
  reporter: Array<UserReportNode>;
  scoreUser: Array<ManagementScoreNode>;
  sessionSet: InterviewSessionNodeConnection;
  socialAccounts?: Maybe<Array<Scalars["String"]["output"]>>;
  storeaddressSet: Array<StoreAddressNode>;
  storeorderSet: Array<StoreOrderNode>;
  storeorderoperationlogSet: Array<OrderOperationLogNode>;
  submissionCalendar: Scalars["JSONString"]["output"];
  submissionSet: Array<FilteredSubmissionNode>;
  submitStats: UserSubmitStatsNode;
  submitStatsGlobal: UserSubmitStatsNode;
  tagProblemCounts: TagProblemCountsCategoryNode;
  twitterUrl?: Maybe<Scalars["String"]["output"]>;
  upcomingBadges: Array<UpcomingBadgeNode>;
  userCalendar: UserCalendarNode;
  userIps: Array<Maybe<UserIpNode>>;
  useripSet: Array<UserIpNode>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
  userratingSet: Array<UserRatingNode>;
  userskilltagSet: Array<UserSkillTagNode>;
  usersyncedcodeSet: Array<SyncedCodeNode>;
  virtualcontestscoreSet: Array<VirtualContestScoreNode>;
  voteSet: Array<VoteNode>;
  yearJoined: Scalars["Int"]["output"];
};

export type UserNodeAdminOnlyCreatedByArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnlyLibraryactivitySetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnlyNotificationSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnlyQuestionSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnlySessionSetArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNodeAdminOnlyUserCalendarArgs = {
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserNotificationNode = {
  lastModified?: Maybe<Scalars["Int"]["output"]>;
  numUnread?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type UserOperationEnum =
  /** Account Banned */
  | "ACCOUNT_BANNED"
  /** Account Created */
  | "ACCOUNT_CREATED"
  /** Account Deleted */
  | "ACCOUNT_DELETED"
  /** Avatar Updated */
  | "AVATAR_UPDATED"
  /** Email Added */
  | "EMAIL_ADDED"
  /** Email Primary Updated */
  | "EMAIL_PRIMARY_UPDATED"
  /** Email Removed */
  | "EMAIL_REMOVED"
  /** Email Verified */
  | "EMAIL_VERIFIED"
  /** Login */
  | "LOGIN"
  /** Oauth Connected */
  | "OAUTH_CONNECTED"
  /** Oauth Removed */
  | "OAUTH_REMOVED"
  /** Passward Updated */
  | "PASSWORD_UPDATED"
  /** Realname Updated */
  | "REALNAME_UPDATED"
  /** Username Updated */
  | "USERNAME_UPDATED";

/** An enumeration. */
export type UserProfileCountry =
  /** Andorra */
  | "AD"
  /** United Arab Emirates */
  | "AE"
  /** Afghanistan */
  | "AF"
  /** Antigua and Barbuda */
  | "AG"
  /** Anguilla */
  | "AI"
  /** Albania */
  | "AL"
  /** Armenia */
  | "AM"
  /** Angola */
  | "AO"
  /** Antarctica */
  | "AQ"
  /** Argentina */
  | "AR"
  /** American Samoa */
  | "AS"
  /** Austria */
  | "AT"
  /** Australia */
  | "AU"
  /** Aruba */
  | "AW"
  /** Åland Islands */
  | "AX"
  /** Azerbaijan */
  | "AZ"
  /** Bosnia and Herzegovina */
  | "BA"
  /** Barbados */
  | "BB"
  /** Bangladesh */
  | "BD"
  /** Belgium */
  | "BE"
  /** Burkina Faso */
  | "BF"
  /** Bulgaria */
  | "BG"
  /** Bahrain */
  | "BH"
  /** Burundi */
  | "BI"
  /** Benin */
  | "BJ"
  /** Saint Barthélemy */
  | "BL"
  /** Bermuda */
  | "BM"
  /** Brunei */
  | "BN"
  /** Bolivia */
  | "BO"
  /** Bonaire, Sint Eustatius and Saba */
  | "BQ"
  /** Brazil */
  | "BR"
  /** Bahamas */
  | "BS"
  /** Bhutan */
  | "BT"
  /** Bouvet Island */
  | "BV"
  /** Botswana */
  | "BW"
  /** Belarus */
  | "BY"
  /** Belize */
  | "BZ"
  /** Canada */
  | "CA"
  /** Cocos (Keeling) Islands */
  | "CC"
  /** Congo (the Democratic Republic of the) */
  | "CD"
  /** Central African Republic */
  | "CF"
  /** Congo */
  | "CG"
  /** Switzerland */
  | "CH"
  /** Côte d'Ivoire */
  | "CI"
  /** Cook Islands */
  | "CK"
  /** Chile */
  | "CL"
  /** Cameroon */
  | "CM"
  /** China */
  | "CN"
  /** Colombia */
  | "CO"
  /** Costa Rica */
  | "CR"
  /** Cuba */
  | "CU"
  /** Cabo Verde */
  | "CV"
  /** Curaçao */
  | "CW"
  /** Christmas Island */
  | "CX"
  /** Cyprus */
  | "CY"
  /** Czechia */
  | "CZ"
  /** Germany */
  | "DE"
  /** Djibouti */
  | "DJ"
  /** Denmark */
  | "DK"
  /** Dominica */
  | "DM"
  /** Dominican Republic */
  | "DO"
  /** Algeria */
  | "DZ"
  /** Ecuador */
  | "EC"
  /** Estonia */
  | "EE"
  /** Egypt */
  | "EG"
  /** Western Sahara */
  | "EH"
  /** Eritrea */
  | "ER"
  /** Spain */
  | "ES"
  /** Ethiopia */
  | "ET"
  /** Finland */
  | "FI"
  /** Fiji */
  | "FJ"
  /** Falkland Islands (Malvinas) */
  | "FK"
  /** Micronesia (Federated States of) */
  | "FM"
  /** Faroe Islands */
  | "FO"
  /** France */
  | "FR"
  /** Gabon */
  | "GA"
  /** United Kingdom */
  | "GB"
  /** Grenada */
  | "GD"
  /** Georgia */
  | "GE"
  /** French Guiana */
  | "GF"
  /** Guernsey */
  | "GG"
  /** Ghana */
  | "GH"
  /** Gibraltar */
  | "GI"
  /** Greenland */
  | "GL"
  /** Gambia */
  | "GM"
  /** Guinea */
  | "GN"
  /** Guadeloupe */
  | "GP"
  /** Equatorial Guinea */
  | "GQ"
  /** Greece */
  | "GR"
  /** South Georgia and the South Sandwich Islands */
  | "GS"
  /** Guatemala */
  | "GT"
  /** Guam */
  | "GU"
  /** Guinea-Bissau */
  | "GW"
  /** Guyana */
  | "GY"
  /** Hong Kong */
  | "HK"
  /** Heard Island and McDonald Islands */
  | "HM"
  /** Honduras */
  | "HN"
  /** Croatia */
  | "HR"
  /** Haiti */
  | "HT"
  /** Hungary */
  | "HU"
  /** Indonesia */
  | "ID"
  /** Ireland */
  | "IE"
  /** Israel */
  | "IL"
  /** Isle of Man */
  | "IM"
  /** India */
  | "IN"
  /** British Indian Ocean Territory */
  | "IO"
  /** Iraq */
  | "IQ"
  /** Iran */
  | "IR"
  /** Iceland */
  | "IS"
  /** Italy */
  | "IT"
  /** Jersey */
  | "JE"
  /** Jamaica */
  | "JM"
  /** Jordan */
  | "JO"
  /** Japan */
  | "JP"
  /** Kenya */
  | "KE"
  /** Kyrgyzstan */
  | "KG"
  /** Cambodia */
  | "KH"
  /** Kiribati */
  | "KI"
  /** Comoros */
  | "KM"
  /** Saint Kitts and Nevis */
  | "KN"
  /** North Korea */
  | "KP"
  /** South Korea */
  | "KR"
  /** Kuwait */
  | "KW"
  /** Cayman Islands */
  | "KY"
  /** Kazakhstan */
  | "KZ"
  /** Laos */
  | "LA"
  /** Lebanon */
  | "LB"
  /** Saint Lucia */
  | "LC"
  /** Liechtenstein */
  | "LI"
  /** Sri Lanka */
  | "LK"
  /** Liberia */
  | "LR"
  /** Lesotho */
  | "LS"
  /** Lithuania */
  | "LT"
  /** Luxembourg */
  | "LU"
  /** Latvia */
  | "LV"
  /** Libya */
  | "LY"
  /** Morocco */
  | "MA"
  /** Monaco */
  | "MC"
  /** Moldova */
  | "MD"
  /** Montenegro */
  | "ME"
  /** Saint Martin (French part) */
  | "MF"
  /** Madagascar */
  | "MG"
  /** Marshall Islands */
  | "MH"
  /** North Macedonia */
  | "MK"
  /** Mali */
  | "ML"
  /** Myanmar */
  | "MM"
  /** Mongolia */
  | "MN"
  /** Macao */
  | "MO"
  /** Northern Mariana Islands */
  | "MP"
  /** Martinique */
  | "MQ"
  /** Mauritania */
  | "MR"
  /** Montserrat */
  | "MS"
  /** Malta */
  | "MT"
  /** Mauritius */
  | "MU"
  /** Maldives */
  | "MV"
  /** Malawi */
  | "MW"
  /** Mexico */
  | "MX"
  /** Malaysia */
  | "MY"
  /** Mozambique */
  | "MZ"
  /** Namibia */
  | "NA"
  /** New Caledonia */
  | "NC"
  /** Niger */
  | "NE"
  /** Norfolk Island */
  | "NF"
  /** Nigeria */
  | "NG"
  /** Nicaragua */
  | "NI"
  /** Netherlands */
  | "NL"
  /** Norway */
  | "NO"
  /** Nepal */
  | "NP"
  /** Nauru */
  | "NR"
  /** Niue */
  | "NU"
  /** New Zealand */
  | "NZ"
  /** Oman */
  | "OM"
  /** Panama */
  | "PA"
  /** Peru */
  | "PE"
  /** French Polynesia */
  | "PF"
  /** Papua New Guinea */
  | "PG"
  /** Philippines */
  | "PH"
  /** Pakistan */
  | "PK"
  /** Poland */
  | "PL"
  /** Saint Pierre and Miquelon */
  | "PM"
  /** Pitcairn */
  | "PN"
  /** Puerto Rico */
  | "PR"
  /** Palestine, State of */
  | "PS"
  /** Portugal */
  | "PT"
  /** Palau */
  | "PW"
  /** Paraguay */
  | "PY"
  /** Qatar */
  | "QA"
  /** Réunion */
  | "RE"
  /** Romania */
  | "RO"
  /** Serbia */
  | "RS"
  /** Russia */
  | "RU"
  /** Rwanda */
  | "RW"
  /** Saudi Arabia */
  | "SA"
  /** Solomon Islands */
  | "SB"
  /** Seychelles */
  | "SC"
  /** Sudan */
  | "SD"
  /** Sweden */
  | "SE"
  /** Singapore */
  | "SG"
  /** Saint Helena, Ascension and Tristan da Cunha */
  | "SH"
  /** Slovenia */
  | "SI"
  /** Svalbard and Jan Mayen */
  | "SJ"
  /** Slovakia */
  | "SK"
  /** Sierra Leone */
  | "SL"
  /** San Marino */
  | "SM"
  /** Senegal */
  | "SN"
  /** Somalia */
  | "SO"
  /** Suriname */
  | "SR"
  /** South Sudan */
  | "SS"
  /** Sao Tome and Principe */
  | "ST"
  /** El Salvador */
  | "SV"
  /** Sint Maarten (Dutch part) */
  | "SX"
  /** Syria */
  | "SY"
  /** Eswatini */
  | "SZ"
  /** Turks and Caicos Islands */
  | "TC"
  /** Chad */
  | "TD"
  /** French Southern Territories */
  | "TF"
  /** Togo */
  | "TG"
  /** Thailand */
  | "TH"
  /** Tajikistan */
  | "TJ"
  /** Tokelau */
  | "TK"
  /** Timor-Leste */
  | "TL"
  /** Turkmenistan */
  | "TM"
  /** Tunisia */
  | "TN"
  /** Tonga */
  | "TO"
  /** Türkiye */
  | "TR"
  /** Trinidad and Tobago */
  | "TT"
  /** Tuvalu */
  | "TV"
  /** Taiwan */
  | "TW"
  /** Tanzania */
  | "TZ"
  /** Ukraine */
  | "UA"
  /** Uganda */
  | "UG"
  /** United States Minor Outlying Islands */
  | "UM"
  /** United States of America */
  | "US"
  /** Uruguay */
  | "UY"
  /** Uzbekistan */
  | "UZ"
  /** Holy See */
  | "VA"
  /** Saint Vincent and the Grenadines */
  | "VC"
  /** Venezuela */
  | "VE"
  /** Virgin Islands (British) */
  | "VG"
  /** Virgin Islands (U.S.) */
  | "VI"
  /** Vietnam */
  | "VN"
  /** Vanuatu */
  | "VU"
  /** Wallis and Futuna */
  | "WF"
  /** Samoa */
  | "WS"
  /** Yemen */
  | "YE"
  /** Mayotte */
  | "YT"
  /** South Africa */
  | "ZA"
  /** Zambia */
  | "ZM"
  /** Zimbabwe */
  | "ZW";

export type UserProfileNode = {
  aboutMe: Scalars["String"]["output"];
  acStats?: Maybe<AcStatsNode>;
  age?: Maybe<Scalars["Int"]["output"]>;
  birthday?: Maybe<Scalars["String"]["output"]>;
  categoryDiscussCount: Scalars["Int"]["output"];
  categoryDiscussCountDiff: Scalars["Int"]["output"];
  company?: Maybe<Scalars["String"]["output"]>;
  contestCount?: Maybe<Scalars["Int"]["output"]>;
  country?: Maybe<UserProfileCountry>;
  countryCode?: Maybe<Scalars["String"]["output"]>;
  countryName?: Maybe<Scalars["String"]["output"]>;
  displayMySubmissionHistory?: Maybe<Scalars["Boolean"]["output"]>;
  education?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  globalRanking?: Maybe<Scalars["Int"]["output"]>;
  jobTitle?: Maybe<Scalars["String"]["output"]>;
  joinStudyPlanLeaderboard?: Maybe<Scalars["Boolean"]["output"]>;
  lastModified: Scalars["DateTime"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  occupation?: Maybe<UserProfileOccupation>;
  postViewCount: Scalars["Int"]["output"];
  postViewCountDiff: Scalars["Int"]["output"];
  privacyContact?: Maybe<Scalars["Boolean"]["output"]>;
  publicBadgeType: Scalars["Int"]["output"];
  ranking: Scalars["Int"]["output"];
  realName: Scalars["String"]["output"];
  reputation: Scalars["Int"]["output"];
  reputationDiff: Scalars["Int"]["output"];
  rewardStats?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  school?: Maybe<Scalars["String"]["output"]>;
  skillTags: Array<Maybe<Scalars["String"]["output"]>>;
  solutionCount: Scalars["Int"]["output"];
  solutionCountDiff: Scalars["Int"]["output"];
  starRating: Scalars["Float"]["output"];
  userAvatar?: Maybe<Scalars["String"]["output"]>;
  userSlug: Scalars["String"]["output"];
  websites?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  yearsOfExperience?: Maybe<Scalars["Int"]["output"]>;
};

/** An enumeration. */
export type UserProfileOccupation =
  /** Student */
  | "A_1"
  /** Professional */
  | "A_2";

export type UserProgressCalendarNodeV2 = {
  /** Solved everyday info within one month */
  dateSolvedInfoWithinMonth?: Maybe<Array<UserProgressSolvedQuestionDateNode>>;
  /** Number of submissions everyday within one month */
  dateSubmissionNumWithinMonth?: Maybe<
    Array<UserProgressSubmissionQuestionDateNode>
  >;
  /** Solved every month info within one year */
  monthSolvedInfoWithinYear?: Maybe<Array<UserProgressSolvedQuestionMonthNode>>;
  /** Number of submissions every month within one year */
  monthSubmissionNumWithinYear?: Maybe<
    Array<UserProgressSubmissionQuestionMonthNode>
  >;
};

export type UserProgressKnowledgeInfoListNode = {
  progressKnowledgeInfo: Array<UserProgressKnowledgeInfoNode>;
};

export type UserProgressKnowledgeInfoNode = {
  finishedNum: Scalars["Int"]["output"];
  knowledgeTag: CommonTagNode;
  totalNum: Scalars["Int"]["output"];
};

export type UserProgressQuestionListInput = {
  difficulty?: InputMaybe<Array<DifficultyDescribedEnum>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  questionStatus?: InputMaybe<ProgressQuestionStatusEnum>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  sortField?: InputMaybe<ProgressQuestionSortEnum>;
  sortOrder?: InputMaybe<SortingOrderDescribedEnum>;
};

export type UserProgressQuestionListNode = {
  questions?: Maybe<Array<Maybe<UserProgressQuestionNode>>>;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

export type UserProgressQuestionNode = {
  difficulty: DifficultyDescribedEnum;
  frontendId: Scalars["String"]["output"];
  lastResult?: Maybe<SubmissionStatusEnum>;
  lastSubmittedAt?: Maybe<Scalars["DateTime"]["output"]>;
  numSubmitted?: Maybe<Scalars["Int"]["output"]>;
  questionStatus: ProgressQuestionStatusEnum;
  title: Scalars["String"]["output"];
  titleSlug: Scalars["String"]["output"];
  topicTags?: Maybe<Array<CommonTagNode>>;
  translatedTitle?: Maybe<Scalars["String"]["output"]>;
};

export type UserProgressSolvedQuestionDateNode = {
  date: Scalars["Date"]["output"];
  easySolvedNum: Scalars["Int"]["output"];
  hardSolvedNum: Scalars["Int"]["output"];
  mediumSolvedNum: Scalars["Int"]["output"];
};

export type UserProgressSolvedQuestionMonthNode = {
  easySolvedNum: Scalars["Int"]["output"];
  hardSolvedNum: Scalars["Int"]["output"];
  mediumSolvedNum: Scalars["Int"]["output"];
  month: Scalars["Int"]["output"];
};

export type UserProgressSubmissionListNode = {
  submissions?: Maybe<Array<SubmissionDumpNode>>;
  totalNum?: Maybe<Scalars["Int"]["output"]>;
};

export type UserProgressSubmissionQuestionDateNode = {
  date: Scalars["Date"]["output"];
  numSubmitted: Scalars["Int"]["output"];
};

export type UserProgressSubmissionQuestionMonthNode = {
  month: Scalars["Int"]["output"];
  numSubmitted: Scalars["Int"]["output"];
};

export type UserQuestionProgressNodeV2 = {
  numAcceptedQuestions: Array<QuestionCountNode>;
  numFailedQuestions: Array<QuestionCountNode>;
  numUntouchedQuestions: Array<QuestionCountNode>;
  /** 用户所有题目击败其他用户的题目百分比 */
  totalQuestionBeatsPercentage?: Maybe<Scalars["Float"]["output"]>;
  /** 用户击败其他用户的题目百分比 */
  userSessionBeatsPercentage: Array<LevelBeatPercentageMixin>;
};

export type UserQuestionStatus = "AC" | "NOT_STARTED" | "TRIED";

export type UserRankInfoList = {
  hasMore: Scalars["Boolean"]["output"];
  total: Scalars["Int"]["output"];
  userRankInfos: Array<UserRankInfoNode>;
};

export type UserRankInfoNode = {
  currentRank: Scalars["Int"]["output"];
  finishedQuestionNum: Scalars["Int"]["output"];
  hideOnBoard: Scalars["Boolean"]["output"];
  previousRank: Scalars["Int"]["output"];
  userInfo: PlanBriefUserNode;
};

export type UserRatingNode = {
  id: Scalars["ID"]["output"];
  score: Scalars["Int"]["output"];
};

export type UserReportNode = {
  createdAt: Scalars["DateTime"]["output"];
  handled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  lastModified: Scalars["DateTime"]["output"];
  message: Scalars["String"]["output"];
  reportee: PrivateContestUserNode;
  reporter: PrivateContestUserNode;
};

export type UserSkillTagNode = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  user: PrivateContestUserNode;
};

export type UserSubmitStatsNode = {
  acSubmissionNum: Array<SubmissionCountNode>;
  totalSubmissionNum: Array<SubmissionCountNode>;
};

export type UserUploadSchoolLogo = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UserWeeklyTaskRecordListNode = {
  planFinishDate?: Maybe<Scalars["Date"]["output"]>;
  planWeeklyTaskSetDate?: Maybe<Scalars["Date"]["output"]>;
  userWeeklyTaskRecords: Array<UserWeeklyTaskRecordNode>;
};

export type UserWeeklyTaskRecordNode = {
  date: Scalars["Date"]["output"];
  expectedFinishedQuestionNums: Scalars["Int"]["output"];
  finishedQuestionNums: Scalars["Int"]["output"];
  /** Whether finish enough questions no matter user has schedule on the date */
  hasCompletedWeeklyTask: Scalars["Boolean"]["output"];
  /** Whether user has weekly task schedule on the date */
  hasWeeklyTaskSchedule: Scalars["Boolean"]["output"];
};

export type VacRecordListNode = {
  nodes: Array<VacRecordNode>;
  totalNum: Scalars["Int"]["output"];
};

export type VacRecordNode = {
  chargeAmount?: Maybe<Scalars["Int"]["output"]>;
  chargeAmountRefunded?: Maybe<Scalars["Int"]["output"]>;
  chargeTime?: Maybe<Scalars["DateTime"]["output"]>;
  completionPercentage?: Maybe<Scalars["Int"]["output"]>;
  vacName: Scalars["String"]["output"];
};

export type VacRecordsInput = {
  limit?: Scalars["Int"]["input"];
  /** vac name to search */
  searchKeyword?: InputMaybe<Scalars["String"]["input"]>;
  skip: Scalars["Int"]["input"];
  userId: Scalars["ID"]["input"];
};

export type ValueAddedContentNode = {
  creationDate: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  hasAccess: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  pricing?: Maybe<PricingNode>;
  slug: Scalars["String"]["output"];
  updationDate: Scalars["DateTime"]["output"];
};

export type VideoNode = {
  /** Collapsible HTML under video */
  content?: Maybe<Scalars["String"]["output"]>;
  editLink?: Maybe<Scalars["String"]["output"]>;
  /** Embedded HTML video */
  html: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
};

export type VirtualContestScoreNode = {
  contest?: Maybe<ContestNode>;
  finishTime?: Maybe<Scalars["Int"]["output"]>;
  ranking: Scalars["Int"]["output"];
  score: Scalars["Int"]["output"];
  startTime?: Maybe<Scalars["Int"]["output"]>;
  totalAcQuestions: Scalars["Int"]["output"];
  totalQuestions?: Maybe<Scalars["Int"]["output"]>;
  totalScore?: Maybe<Scalars["Int"]["output"]>;
  totalUsers?: Maybe<Scalars["Int"]["output"]>;
};

export type VoteNode = {
  date: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  post: PostNode;
  postId?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["Int"]["output"]>;
  user: PrivateContestUserNode;
};

export type VotePost = {
  error?: Maybe<Scalars["String"]["output"]>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
  post?: Maybe<PostNode>;
  value?: Maybe<Scalars["Int"]["output"]>;
};

export type WebPageNode = {
  editLink?: Maybe<Scalars["String"]["output"]>;
  html: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  paidOnly: Scalars["Boolean"]["output"];
};

export type WordListTypeNode = {
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ManagementCompanyQuestionsInput = {
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  keywordType?: InputMaybe<CompanyQuestionKeywordType>;
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  tagId: Scalars["Int"]["input"];
  timeOption?: InputMaybe<CompanyQuestionTimeOptionEnum>;
};

export type ManagementCompanyQuestionsV2Input = {
  companyTagId: Scalars["Int"]["input"];
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  positionTagSlug?: InputMaybe<Scalars["String"]["input"]>;
  timeOption?: InputMaybe<CompanyQuestionTimeOptionEnumV2>;
};

export type ManagementIncVoteLogsInput = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
  questionId: Scalars["Int"]["input"];
  tagId: Scalars["Int"]["input"];
};
