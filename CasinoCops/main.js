var currScene = 'startScene';

startScene.init();

function adjustFontSize() {
  const gridItems = document.querySelectorAll('.person');

  gridItems.forEach(item => {
    let fontSize = 100; // Start with a large font size
    item.style.fontSize = fontSize + 'px';

    while (item.scrollHeight > item.offsetHeight || item.scrollWidth > item.offsetWidth) {
      fontSize -= 1;
      item.style.fontSize = fontSize + 'px';
    }
  });
}

function adjustPersonItemsToFit() {
    const grid = document.getElementById('personsGrid');
    const personItems = document.querySelectorAll('.person');
    let itemSize = 150; // Initial item size
    const itemMargin = 10; // Margin around items

    const gridStyle = window.getComputedStyle(grid);
    const gridPaddingHorizontal = parseFloat(gridStyle.paddingLeft) + parseFloat(gridStyle.paddingRight);
    const availableWidth = grid.offsetWidth - gridPaddingHorizontal;

    let itemsPerRow = Math.floor(availableWidth / (itemSize + itemMargin * 2));

    while (itemsPerRow * (itemSize + itemMargin * 2) > availableWidth) {
        itemSize--; // Decrease item size
        itemsPerRow = Math.floor(availableWidth / (itemSize + itemMargin * 2));
    }

    personItems.forEach(item => {
        item.style.width = `${itemSize}px`;
        item.style.height = `${itemSize}px`;
    });
}

// Run the function when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {adjustPersonItemsToFit(); adjustFontSize();});

// Optionally, run the function when the window is resized or when items are dynamically added/removed
window.addEventListener('resize', () => {adjustPersonItemsToFit(); adjustFontSize();});
