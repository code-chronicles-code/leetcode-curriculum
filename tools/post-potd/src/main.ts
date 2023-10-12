import nullthrows from "nullthrows";
import { parse as parseHtml } from "node-html-parser";
import process from "process";

type LeetCodeQuery = {
  // TODO: replace with actual validated type
  state: any;
  queryKey: [string, ...unknown[]];
};

type Question = {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
};

async function getQueries(url: string): Promise<LeetCodeQuery[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  // The page's data is stored in a <script> element with id "__NEXT_DATA__".
  const html = parseHtml(await response.text());
  const data = JSON.parse(html.getElementById("__NEXT_DATA__").innerText);

  // The data we care about is typically nested like this.
  // TODO: validate the structure
  return data.props.pageProps.dehydratedState.queries;
}

async function getLastPotd(): Promise<Question> {
  const queries = await getQueries("https://leetcode.com/problemset/all/");
  const relevantQueries = queries.filter(
    (query) => query.queryKey[0] === "dailyCodingQuestionRecords",
  );

  const problems = relevantQueries.flatMap(
    (query) => query.state.data.dailyCodingChallengeV2.challenges,
  );
  // TODO: use max instead of sorting everything
  problems.sort((a, b) => a.date.localeCompare(b.date));
  return nullthrows(
    problems.at(-1)?.question,
    "Did not find a problem of the day!",
  );
}

async function main(): Promise<void> {
  const potd = await getLastPotd();

  const potdNumber = parseInt(potd.questionFrontendId);
  const potdTitle = potd.title;
  const potdLink = "https://leetcode.com/problems/" + potd.titleSlug + "/";

  const message = `New LeetCode problem of the day! [${potdNumber}. ${potdTitle}](${potdLink})`;
  console.log(message);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
