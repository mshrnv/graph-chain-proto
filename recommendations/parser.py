import json
import re
import time
from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup

from cyberleninka_parser import parse_cyberleninka_post
from github_parser import parse_github_post
from habr_parser import parse_habr_posts
from vc_parser import parse_vc_post


def parse_google_search(url):
    site_str = url.split(':')[2] + url.split(':')[3]
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }
    result = []
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    stat_elem = soup.find_all('a')

    for i in stat_elem:
        if 'https://' in str(i):
            pattern = r";url=(.*?)&"

            matches = re.findall(pattern, str(i))
            if matches:
                result.append(matches[0])

    return result


def generate_search_url(query_string):
    base_url = "https://www.google.ru/search?q="
    encoded_query = query_string.replace(' ', '+')
    return str(base_url + encoded_query)


def share_links(query_string):
    result_arr = []

    sites = [
        "https://vc.ru/",
        "https://habr.com/",
        "https://github.com/",
        "https://cyberleninka.ru/"
    ]

    for site in sites:
        query = f"{query_string}+site:{site}"
        result = generate_search_url(query)
        data = parse_google_search(result)
        clean_data = [url for url in data if site in url]
        result_arr.append(clean_data)
        time.sleep(3)

    return result_arr


def main_func(query):
    output_list = []
    links = share_links(query)
    output_list.extend(list(filter(None, map(parse_vc_post, links[0]))))
    output_list.extend(list(filter(None, map(parse_habr_posts, links[1]))))
    output_list.extend(list(filter(None, map(parse_github_post, links[2]))))
    output_list.extend(list(filter(None, map(parse_cyberleninka_post, links[3]))))
    return json.dumps(output_list, ensure_ascii=False)

# print(main_func('изучение основ c++'))
# app = FastAPI()
#
#
# @app.get("/process_query/{query}")
# def process_query(query: str):
#     output_list = main_func(query)
#     return json.loads(output_list)
