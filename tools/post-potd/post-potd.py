from discord import SyncWebhook

import json
import requests

from bs4 import BeautifulSoup


def get_last_potd():
    response = requests.get("https://leetcode.com/problemset/all/")
    if response.status_code != 200:
        raise "oops"
    soup = BeautifulSoup(response.text, features="html.parser")
    data = json.loads(soup.find(id="__NEXT_DATA__").text)
    queries = data["props"]["pageProps"]["dehydratedState"]["queries"]
    relevant_queries_data = [
        item
        for q in queries
        if q["queryKey"][0] == "dailyCodingQuestionRecords"
        for item in q["state"]["data"]["dailyCodingChallengeV2"]["challenges"]
    ]
    return max(relevant_queries_data, key=lambda item: item["date"])


def main():
    potd = get_last_potd()
    potd_number = potd["question"]["questionFrontendId"]
    potd_title = potd["question"]["title"]
    potd_link = "https://leetcode.com/problems/" + potd["question"]["titleSlug"] + "/"
    webhook = SyncWebhook.from_url("TODO replace this with URL from Discord")
    webhook.send(
        f"New LeetCode problem of the day! [{potd_number}. {potd_title}]({potd_link})"
    )


if __name__ == "__main__":
    main()
