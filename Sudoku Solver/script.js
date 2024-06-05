document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('sudoku-grid');
    const solveButton = document.getElementById('solve-btn');
    const size = 9;

    // Create a 9x9 grid of inputs
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        cell.appendChild(input);
        gridContainer.appendChild(cell);
    }

    const inputs = Array.from(gridContainer.getElementsByTagName('input'));

    function getGrid() {
        return inputs.map(input => parseInt(input.value) || 0);
    }

    function setGrid(grid) {
        inputs.forEach((input, i) => input.value = grid[i] || '');
    }

    function isValid(grid, row, col, num) {
        for (let x = 0; x < size; x++) {
            if (grid[row * size + x] === num || grid[x * size + col] === num ||
                grid[(Math.floor(row / 3) * 3 + Math.floor(x / 3)) * size + (Math.floor(col / 3) * 3 + x % 3)] === num) {
                return false;
            }
        }
        return true;
    }

    function solve(grid) {
        for (let i = 0; i < size * size; i++) {
            if (grid[i] === 0) {
                const row = Math.floor(i / size);
                const col = i % size;
                for (let num = 1; num <= size; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[i] = num;
                        if (solve(grid)) return true;
                        grid[i] = 0;
                    }
                }
                return false;
            }
        }
        return true;
    }

    solveButton.addEventListener('click', () => {
        const grid = getGrid();
        if (solve(grid)) {
            setGrid(grid);
        } else {
            alert('No solution exists');
        }
    });
});