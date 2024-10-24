const axios = require('axios');

const getAllPages = async () => {
    let continueToken = null;
    const pages = [];
    do {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'allpages',
                aplimit: 'max',
                apcontinue: continueToken
            }
        });
        pages.push(...response.data.query.allpages.map(page => page.title));
        continueToken = response.data.continue?.apcontinue;
    } while (continueToken);

    return pages;
};

const countBacklinks = async (page) => {
    let continueToken = null;
    let count = 0;
    do {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'backlinks',
                bltitle: page,
                bllimit: 'max',
                blcontinue: continueToken
            }
        });
        count += response.data.query.backlinks.length;
        continueToken = response.data.continue?.blcontinue;
    } while (continueToken);

    return count;
};

const main = async () => {
    const pages = await getAllPages();
    const backlinkCounts = [];

    for (const page of pages) {
        const count = await countBacklinks(page);
        backlinkCounts.push({ page, count });
    }

    backlinkCounts.sort((a, b) => b.count - a.count);
    console.log("Sorted list of pages by backlink count:");
    backlinkCounts.forEach(item => console.log(`Page: ${item.page}, #: ${item.count}`));
};

main();
