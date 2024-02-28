var data = [];

const scripts = ['lvl1.js', 'lvl2.js', 'lvl3.js','lvl4.js']; // List of scripts to load
scripts.forEach(script => {
    const scriptTag = document.createElement('script');
    scriptTag.src = `levels/${script}`;
    document.body.appendChild(scriptTag);
});
