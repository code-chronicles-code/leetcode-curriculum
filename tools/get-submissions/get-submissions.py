import json
import requests

from bs4 import BeautifulSoup


def get_recent_submissions(username):
    response = requests.get(f"https://leetcode.com/{username}/")
    if response.status_code != 200:
        raise "oops"
    soup = BeautifulSoup(response.text, features="html.parser")
    data = json.loads(soup.find(id="__NEXT_DATA__").text)
    queries = data["props"]["pageProps"]["dehydratedState"]["queries"]
    relevant_queries_data = [
        q["state"]["data"]["recentAcSubmissionList"]
        for q in queries
        if q["queryKey"][0] == "recentAcSubmissions"
    ]
    return [sub for datum in relevant_queries_data for sub in datum]


def main():
    print(json.dumps(get_recent_submissions("VehicleOfPuzzle")))


if __name__ == "__main__":
    main()
