"use strict";

// Global Variable
let gridSize = 16;

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
  gridSize = +e.target.value;
  if (gridSize > 100 || gridSize < 4) {
    return;
  }
  clearGrid();
  gridSizeLabel.textContent = `Grid Size: ${gridSize} * ${gridSize} (Min = 4 ; Max = 100)`;
  createGrid(gridSize);
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

// Check if mouse is down
let isMouseDown = false;
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

// DOM
const containerGrid = document.querySelector('.container-grid');

const gridSizeLabel = document.querySelector('label[for="size"]');

const gridSizeChangers = document.querySelectorAll('.change-size');
gridSizeChangers.forEach((element) => element.addEventListener('change', changeSize));

const clearGridButton = document.querySelector('.clear-grid-button');
clearGridButton.addEventListener('click', () => {
  clearGrid();
  createGrid(gridSize);
}); 

const showGridButton = document.querySelector('.show-grid');
showGridButton.addEventListener('click', showGridBorders);

const gridColorChoiceButton = document.querySelector('input[type="color"]');

const eraserButton = document.querySelector('.eraser');
eraserButton.addEventListener('click', eraserMode);

// On Load
window.onload = () => createGrid(gridSize);
