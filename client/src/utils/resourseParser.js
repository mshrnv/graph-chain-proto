const parseResources = (graphData) => {

    let result = {
        'vc': 0,
        'habr': 0,
        'github': 0,
        'cyberleninka': 0,
    }

    const nodes = JSON.parse(graphData).nodes;

    for (let i = 0; i < nodes.length; i++) {
        let url = nodes[i].url;

        if (!url) {
            continue;
        }

        if (url.includes('habr.com')) {
            result.habr++;
        }

        if (url.includes('vc.ru')) {
            result.vc++;
        }

        if (url.includes('github.com')) {
            result.github++;
        }

        if (url.includes('cyberleninka')) {
            result.cyberleninka++;
        }
    }
    return result;
}

export default parseResources;