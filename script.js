function Player(name, mark) {
    return { name, mark }
}


const Gameboard = (function () {
    let board = new Array(9).fill(null);

    const getBoard = () => board
    const addMark = (mark, cell) => board[cell] = mark
    const resetBoard = () => board = new Array(9).fill(null);

    return { getBoard, addMark, resetBoard }
})();


const GameController = (function () {
    let playerOne
    let playerTwo
    let currentPlayer
    let gameOver

    const newGame = (playerOneName, playerTwoName) => {
        playerOne = Player(playerOneName, 'X')
        playerTwo = Player(playerTwoName, 'O')
        Gameboard.resetBoard()
        displayController.clearHighlights()
        currentPlayer = playerOne
        gameOver = false
        displayController.setMessage(`${currentPlayer.name} Turn`)
    }

    const playRound = (cell) => {
        if (gameOver === false) {
            if (Gameboard.getBoard()[cell] === null) {
                Gameboard.addMark(currentPlayer.mark, cell)
                displayController.renderBoard()
                const winningCombo = checkWinner();
                if (winningCombo) {
                    gameOver = true
                    displayController.highlightCells(winningCombo)
                    displayController.setMessage(`Winner: ${currentPlayer.name}`);

                } else if (checkTie()) {
                    gameOver = true
                    displayController.setMessage('Tie!');

                } else {
                    switchPlayer()
                    displayController.setMessage(`${currentPlayer.name} Turn`)
                }
            }
        }
    }

    const checkWinner = () => {
        const board = Gameboard.getBoard()
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const [a, b, c] of winningCombinations) {
            if (
                board[a] !== null &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {
                return [a, b, c]
            }
        }
        return null
    }
    const checkTie = () => !Gameboard.getBoard().includes(null)
    const switchPlayer = () => currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne

    return { newGame, playRound }
})();

const displayController = (function () {
    const cells = document.querySelectorAll('.cell')
    const message = document.querySelector('#message')
    const restartBtn = document.querySelector('#restart')

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index]
        })
    }

    const setupListeners = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                GameController.playRound(index);
            });
        });

        restartBtn.addEventListener('click', () => {
            GameController.newGame('Player 1', 'Player 2');
            renderBoard();
        });
    };
    const setMessage = (msg) => {
        message.textContent = msg;
    }

    const highlightCells = (combo) => {
        combo.forEach(index => {
            cells[index].classList.add('highlight');
        });
    };

    const clearHighlights = () => {
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });
    };

    setupListeners()
    return { renderBoard, setMessage, highlightCells, clearHighlights }
})();

GameController.newGame('Player 1', 'Player 2')