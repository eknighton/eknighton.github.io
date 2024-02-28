var data = [];
const scripts = ['lvl1.js', 'lvl2.js', 'lvl3.js','lvl4.js','lvl5.js']; // List of scripts to load

const scriptPromises = scripts.map(script => {
    return new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        scriptTag.src = `levels/${script}`;
        scriptTag.onload = resolve; // Resolve the promise when the script is loaded
        scriptTag.onerror = reject; // Reject the promise if there's an error loading the script
        document.body.appendChild(scriptTag);
    });
});

Promise.all(scriptPromises).then(() => {
    console.log('All dependent scripts have loaded.');
    dataLoaded()
    // Now it's safe to execute code that depends on these scripts
}).catch(error => {
    console.error('A script failed to load:', error);
});
