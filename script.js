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
        currentPlayer = playerOne
        gameOver = false
    }

    const playRound = (cell) => {
        if (gameOver === false) {
            if (Gameboard.getBoard()[cell] === null) {
                Gameboard.addMark(currentPlayer.mark, cell)
                console.log(Gameboard.getBoard());

                if (checkWinner()) {
                    gameOver = true
                    console.log(`Winner ${currentPlayer.name}`);

                } else if (checkTie()) {
                    gameOver = true
                    console.log('Tie!');

                } else {
                    switchPlayer()
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

        return winningCombinations.some(([a, b, c]) => {
            return (
                board[a] !== null &&
                board[a] === board[b] &&
                board[b] === board[c]
            );
        });
    };
    const checkTie = () => !Gameboard.getBoard().includes(null)
    const switchPlayer = () => currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne

    return { newGame, playRound }
})();

GameController.newGame('P1', 'P2')