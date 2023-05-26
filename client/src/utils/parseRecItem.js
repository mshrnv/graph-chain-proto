const parseRecItem = (recItem) => {
    if (recItem.url.includes('habr.com')) {
        return {
            rate: recItem.votes,
            resource: 'habr'
        }
    }

    if (recItem.url.includes('vc.ru')) {
        return {
            rate: recItem.likes,
            resource: 'vc'
        }
    }

    if (recItem.url.includes('github.com')) {
        return {
            rate: recItem.stars,
            resource: 'github'
        }
    }

    return {
        rate: recItem.votes,
        resource: 'habr'
    }
}

export default parseRecItem;