"use strict";

const containerGrid = document.querySelector('.container-grid');

const gridSizeLabel = document.querySelector('label[for="size"]');
const gridSizeSlider = document.querySelector('input[type="range"]');
gridSizeSlider.addEventListener('change', changeSize);

const gridSizeEntry = document.querySelector('input[type="number"]');
gridSizeEntry.addEventListener('change', changeSize);

const showGridButton = document.querySelector('.show-grid');
showGridButton.addEventListener('click', showGridBorders);

// const gridSizeChangers = document.querySelectorAll('.change-size');
// gridSizeChangers.forEach((element) => element.addEventListener('change', changeSize));

const clearGridButton = document.querySelector('.clear-grid-button');
clearGridButton.addEventListener('click', () => {
  clearGrid();
  createGrid(+gridSizeSlider.value);
}); 

const gridColorChoiceButton = document.querySelector('input[type="color"]');

const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', eraserMode);

// Function Create Grid
function createGrid(size) {
  // Grid Style for Container
  containerGrid.style.display = 'grid';
  containerGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  containerGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < (size * size) ; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    containerGrid.appendChild(cell);
  }

  // Add event listener to cells
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => cell.addEventListener('mousemove', paint));
}

// Function Change Grid Size 
function changeSize(e) {
  let size = +e.target.value;
  if (size > 100 || size < 4) {
    return;
  }
  clearGrid();
  gridSizeLabel.textContent = `Grid Size: ${size} * ${size} (Min = 4 ; Max = 100)`;
  createGrid(size)
}

// Function Clear Grid
function clearGrid() {
  containerGrid.innerHTML = '';
}

// Function Change Color
function paint(e) {
  if (isMouseDown) {
    let color = gridColorChoiceButton.value;
    e.target.style.background = `${color}`;
  }   
}

// Function Eraser Mode
function eraserMode() {
  gridColorChoiceButton.value = '#ffffff';
}

// Function Show Grid Borders
function showGridBorders() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => cell.classList.toggle('cell--border-on'));
}

createGrid(+gridSizeSlider.value);

// 
let isMouseDown = false;
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);