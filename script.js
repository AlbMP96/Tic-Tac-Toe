const player = (sign) => {
    let playerSign = sign

    return {
        get sign() {
            return playerSign;
        }
    }
}

const cell = (sign) => {
    let cellSign = sign;

    return {
        get sign() {
            return cellSign;
        },

        set sign(sign) {
            cellSign = sign
        }

    }
}

const gameBoard = (() => {

    let cells = [];

    const createCells = () => {
        for (let i = 1; i <= 9; i++) {
            const cellObj = cell('');

            cells.push(cellObj);
        }
    }

    createCells();

    const render = () => {
        const grid = document.querySelector('#grid');
        const cell = document.querySelectorAll('.cell');
        cell.forEach(cell => grid.removeChild(cell));

        cells.forEach(cell => createGrid(cell));
    }

    const createGrid = (cell) => {
        const grid = document.querySelector('#grid');
        const cellDOM = document.createElement('div');

        cellDOM.classList.add('cell');
        cellDOM.setAttribute('id', `cell-${cells.indexOf(cell)}`);

        cellDOM.textContent = cell.sign;

        cellDOM.addEventListener('click', () => {
            if (gameLogic.finishedGame == false && cell.sign == '') {
                gameLogic.playRound(cell);
                gameLogic.checkWin();
                render();
            }
        });

        grid.appendChild(cellDOM);
    }

    const restart = () => {
        document.querySelector('#restart').addEventListener('click', () => {
            cells.splice(0, cells.length);
            createCells();
            render();
            document.querySelector('#winner').textContent = '';
        })
    }

    restart();

    return {
        render,
        get cells() {
            return cells;
        }
    }

})();

const gameLogic = (() => {
    const playerX = player('X');
    const playerO = player('O');
    const players = [playerX, playerO];

    let finishedGame = false;

    let round = 1;

    const playRound = (cell) => {
        cell.sign = playerTurn();
        round++;
    }

    const playerTurn = () => {
        return round % 2 === 1 ? playerX.sign : playerO.sign;
    }

    const checkWin = () => {
        const cells = gameBoard.cells;

        const winCon = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        winCon.forEach(index => {
            for (let i = 0; i <= 1; i++) {
                if (cells[index[0]].sign == players[i].sign && cells[index[1]].sign == players[i].sign && cells[index[2]].sign == players[i].sign) {
                    document.querySelector('#winner').textContent = `${players[i].sign} wins`;
                    finishedGame = true;
                }
            }
        })
    }

    return {
        playRound,
        checkWin,
        get finishedGame() {
            return finishedGame;
        }
    }
})();

gameBoard.render();