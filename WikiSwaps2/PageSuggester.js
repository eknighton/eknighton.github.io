const axios = require('axios');

const getPagesInCategory = async (category) => {
    let continueToken = null;
    const pages = [];
    do {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'categorymembers',
                cmtitle: `Category:${category}`,
                cmlimit: 'max',
                cmcontinue: continueToken
            }
        });
        pages.push(...response.data.query.categorymembers.map(member => member.title));
        continueToken = response.data.continue?.cmcontinue;
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
    const category = 'Chemistry';
    const pages = await getPagesInCategory(category);
    const backlinkCounts = [];

    for (const page of pages) {
        const count = await countBacklinks(page);
        backlinkCounts.push({ page, count });
        //console.log(`Page: ${page}, Backlinks: ${count}`);
    }

    backlinkCounts.sort((a, b) => b.count - a.count);
    console.log("Sorted list of pages by backlink count:");
    backlinkCounts.forEach(item => console.log(`Page: ${item.page}, #: ${item.count}`));
};

main();
