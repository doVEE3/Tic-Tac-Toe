// Factory function for creating a TicTacToe game
function createTicTacToe() {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const playerText = document.getElementById('playerText');
    const boxes = document.querySelectorAll('.box');
    const restartBtn = document.getElementById('restartBtn');
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Private method to check if there's a winner
    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    // Private method to update the display for the current player
    function updatePlayerText() {
        playerText.textContent = `${currentPlayer}'s Turn`;
    }

    // Private method to handle a box click
    function handleBoxClick(index) {
        if (board[index] !== '' || !gameActive) {
            return; // Ignore if the box is already taken or the game is over
        }

        board[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;

        // Check for a win or a draw
        if (checkWinner()) {
            playerText.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            playerText.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            // Switch players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerText();
        }
    }

    // Private method to restart the game
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        updatePlayerText();

        boxes.forEach(box => {
            box.textContent = '';
        });
    }

    // Add event listeners to the boxes
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
    });

    // Add event listener to the restart button
    restartBtn.addEventListener('click', restartGame);

    // Initialize the player text
    updatePlayerText();

    // Return public methods (if needed)
    return {
        restartGame
    };
}

// Create a new game instance when the page loads
const game = createTicTacToe();
