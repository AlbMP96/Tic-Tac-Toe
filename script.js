const player = (sign) => {
    const getSign = () => sign;

    return {getSign}
}

const gameBoard = (() => {

    let cells = [];

    const createGrid = (cell) => {
        const grid = document.querySelector('#grid');
        const cellDOM = document.createElement('div');

        cellDOM.classList.add('cell');
        cellDOM.setAttribute('id', cells.indexOf(cell));

        grid.appendChild(cellDOM);
    }

    const render = () => {

        for (let i = 1; i <= 9; i++) {
            cells.push('');
        }

        cells.forEach(cell => createGrid(cell));
    }

    return {
        render
    };
})();

gameBoard.render();