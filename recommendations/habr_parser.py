import re
from typing import Optional, Tuple, Dict, Union

import requests
from bs4 import BeautifulSoup


def parse_habr_posts(url: str) -> Optional[Dict[str, Union[str, int]]]:
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    post_dict = {
        'author': None,
        'author_href': None,
        'title': None,
        'url': None,
        'votes': 0
    }
    try:
        author_elem = soup.find('a', {'class': 'tm-user-info__username'})
        post_dict['author'] = extract_username(author_elem)
        post_dict['author_href'] = extract_href(author_elem)

        title_elem = soup.find('h1', {'class': 'tm-title tm-title_h1'})

        post_dict['title'] = extract_title(title_elem)
        post_dict['url'] = url

        votes_elem = soup.find('div', {'class': 'tm-votes-meter'})
        votes_data = parse_votes(votes_elem)
        post_dict['votes'] = votes_data['upvotes'] - votes_data['downvotes']

    except:
        return None

    if post_dict['title']:
        return post_dict
    else:
        return None


def extract_username(author_elem) -> Optional[str]:
    try:
        pattern = re.compile(r'/users/(.*?)/">')
        match = pattern.search(str(author_elem))
        if match:
            return match.group(1)
        else:
            return None
    except:
        return None


def extract_title(title_elem) -> Optional[str]:
    try:
        pattern = re.compile(r'<span>(.*?)</span>')
        match = pattern.search(str(title_elem))
        if match:
            title_str = match.group(1)
            return title_str.strip()
        else:
            return None
    except:
        return None


def parse_votes(votes_elem) -> Optional[Dict[str, int]]:
    try:
        pattern = re.compile(r'↑(\d+).*↓(\d+)')
        match = pattern.search(str(votes_elem))
        if match:
            return {'upvotes': int(match.group(1)), 'downvotes': int(match.group(2))}
        else:
            return None
    except:
        return None


def extract_href(string: str) -> Optional[str]:
    try:
        pattern = r'href="(.+?)"'
        href = re.search(pattern, string).group(1)
        return 'https://habr.com' + href
    except:
        return None
