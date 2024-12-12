async function getAFeaturedTitle() {
    const endpoint = 'https://en.wikipedia.org/w/api.php';
    const url = new URL(endpoint);
    url.search = new URLSearchParams({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:Featured articles',
        cmlimit: '500', // Limit to 500 results; adjust based on need
        format: 'json',
        origin: '*' // Required for CORS requests if using this from a web client
    });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.query.categorymembers;
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        return randomArticle.title;
    } catch (error) {
        console.error('Failed to fetch featured articles:', error);
        return null;
    }
}

/**
 * Fetches text and HTML content of a Wikipedia page.
 * @param {string} pageTitle - The title of the Wikipedia page to fetch.
 */
async function getPage(pageTitle) {
    const endpoint = 'https://en.wikipedia.org/w/api.php';

    // Parameters for fetching plain text
    const textParams = new URLSearchParams({
        action: 'query',
        titles: pageTitle,
        prop: 'extracts',
        format: 'json',
        formatversion: 2,
        origin: '*',
        redirects: 1, // Automatically resolve redirects
        explaintext: true, // Get plain text, no HTML
    });

    // Parameters for fetching HTML content
    const htmlParams = new URLSearchParams({
        action: 'parse',
        page: pageTitle,
        format: 'json',
        origin: '*',
        redirects: 1,
    });

    try {
        // Fetch plain text
        const textResponse = await fetch(`${endpoint}?${textParams.toString()}`);
        const textData = await textResponse.json();
        const text = textData.query.pages[0]?.extract;
        const resolvedTitle = textData.query.pages[0]?.title;

        // Fetch HTML content
        const htmlResponse = await fetch(`${endpoint}?${htmlParams.toString()}`);
        const htmlData = await htmlResponse.json();
        const html = htmlData.parse?.text['*'];
        const htmlTitle = htmlData.parse?.title;

         const finalTitle = resolvedTitle || htmlTitle || pageTitle;


        return {
            title: finalTitle,
            text,
            html
        };
    } catch (error) {
        console.error('Error fetching Wikipedia content:', error);
        throw error;
    }
}

/**
 * Fetches text and HTML content of a random Wikipedia page.
 */
async function getRandomPage() {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        list: "random",
        rnlimit: "100"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var title;
    await fetch(url)
        .then(function(response){
            var toJson = response.json();
            return toJson;
        })
        .then(function(response) {
            var randoms = response.query.random;
            for (var r in randoms) {
                if (randoms[r].title.includes('User')) {
                    continue;
                }
                if (randoms[r].title.includes('Talk')) {
                    continue;
                }
                if (randoms[r].title.includes('Template')) {
                    continue;
                }
                if (randoms[r].title.includes('Category')) {
                    continue;
                }
                if (randoms[r].title.includes('Wikipedia')) {
                    continue;
                }
                title = randoms[r].title;
                break;
            }
        })
        .catch(function(error){console.log(error);});

    console.log('Getting page ' + title);
    return getPage(title);

}