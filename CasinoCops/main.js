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

  const buttons = document.querySelectorAll('.investigateButton');

  buttons.forEach(item => {
    let fontSize = 100; // Start with a large font size
    item.style.fontSize = fontSize + 'px';

    while (item.scrollHeight > item.offsetHeight || item.scrollWidth > item.offsetWidth) {
      fontSize -= 1;
      item.style.fontSize = fontSize + 'px';
    }
  });

}


function setupGrid() {
  const persons = document.querySelectorAll('.person');
  const grid = document.getElementById('personsGrid');
  const totalPersons = persons.length;
  let gridWidth = grid.clientWidth;

  // Initial guess for person size (square side length)
  let personSide = Math.sqrt(gridWidth * grid.clientHeight / totalPersons);
  personSide = personSide+10;

  // Calculate initial number of columns, rounding down
  let numColumns = Math.floor(gridWidth / personSide);

  // Check and adjust the number of columns to ensure the total height does not exceed 50vh
  let numRows = Math.ceil(totalPersons / numColumns);
  while (personSide * numRows > grid.clientHeight && numColumns < totalPersons) {
    numColumns++;
    personSide = gridWidth / numColumns; // Recalculate personSide based on new numColumns
    numRows = Math.ceil(totalPersons / numColumns); // Recalculate numRows
  }

  // Set the CSS Grid styles
  grid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  grid.style.gridAutoRows = `${personSide}px`; // Set the height of the rows based on the final personSide

  // Apply the calculated size to each .person element
  persons.forEach(person => {
    person.style.width = `${personSide-10}px`;
    person.style.height = `${personSide-10}px`;
  });
  setupButtons();
}

function setupButtons() {
  const persons = document.querySelectorAll('.investigateButton');
  const grid = document.getElementById('buttonContainer');
  const totalPersons = persons.length;
  let gridWidth = grid.clientWidth;

  // Initial guess for person size (square side length)
  let personSide = grid.clientHeight-10;

  // Calculate initial number of columns, rounding down
  let numColumns = Math.floor(gridWidth / personSide);
  if (numColumns > totalPersons) {
  	numColumns = totalPersons;
  }

  // Check and adjust the number of columns to ensure the total height does not exceed 50vh
  let numRows = Math.ceil(totalPersons / numColumns);
  while (personSide * numRows > grid.clientHeight-11 && numColumns < totalPersons) {
    numColumns++;
    personSide = gridWidth / numColumns; // Recalculate personSide based on new numColumns
    numRows = Math.ceil(totalPersons / numColumns); // Recalculate numRows
  }

  // Set the CSS Grid styles
  grid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  grid.style.gridAutoRows = `${personSide}px`; // Set the height of the rows based on the final personSide

  // Apply the calculated size to each .person element
  persons.forEach(person => {
    person.style.width = `${grid.clientWidth/totalPersons-10}px`;
    person.style.height = `${personSide-10}px`;
  });
}

// Run the function when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {setupGrid(); adjustFontSize();});

// Optionally, run the function when the window is resized or when items are dynamically added/removed
window.addEventListener('resize', () => {setupGrid(); adjustFontSize();});
