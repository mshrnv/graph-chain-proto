import re
from typing import Optional, Union, Dict, Tuple, List

import requests
from bs4 import BeautifulSoup


def parse_cyberleninka_post(url: str) -> Optional[Dict[str, Union[str, int]]]:
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')

    post_dict = {
        'title': None,
        'url': url,
        'votes': 0,
        'author': None,
    }

    try:
        title_elem = soup.find('h1')
        if title_elem:
            post_dict['title'] = extract_title(title_elem)

        likes_elem = extract_likes(str(soup))
        if likes_elem:
            post_dict['votes'] = likes_elem['likes'] - likes_elem['dislikes']

        post_dict['author'] = extract_author_info(str(soup))

    except:
        return None

    if post_dict['title']:
        return post_dict
    else:
        return None


def extract_title(title_elem) -> Optional[str]:
    try:
        title_tag = title_elem.find('i', {'itemprop': 'headline'})
        return title_tag.text.strip() if title_tag else None
    except Exception:
        return None


def extract_likes(html_string: str) -> Optional[Dict[str, int]]:
    try:
        pattern = r'"likes":"(\d+)","dislikes":"(\d+)","user":(\d+)'
        match = re.search(pattern, html_string)
        if match:
            return {"likes": int(match.group(1)), "dislikes": int(match.group(2))}
        else:
            return None
    except Exception:
        return None


def extract_author_info(html_string: str) -> Optional[List[Dict[str, Union[int, str]]]]:
    try:
        pattern = r'"id":\s*(\d+),\s*"name":\s*"([^"]+)"'
        matches = re.findall(pattern, html_string)
        if matches:
            authors = []
            for match in matches:
                author_id = int(match[0])
                author_name = match[1]
                if not any(author.get('id') == author_id for author in authors):
                    authors.append({"id": author_id, "name": author_name})
            if authors:
                return authors
        return None
    except Exception:
        return None
