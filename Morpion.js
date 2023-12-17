document.addEventListener('DOMContentLoaded', ()=> {
    const board = document.getElementById('game');
    const cells = [];

    let currentPlayer = 'X';
    let gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function createCell(row, col) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.value = gameBoard[row][col]; // Ajout de l'attribut data-value
        cell.addEventListener('click', () => handleCellClick(row, col));
        return cell;
    }
    


    function renderBoard() {
        board.innerHTML = '';
        for (let row = 0; row < 3; row++) {
            const rowDiv = document.createElement('div');
            for (let col = 0; col < 3; col++) {
                const cell = createCell(row, col);
                cell.textContent = gameBoard[row][col];
                rowDiv.appendChild(cell);
                cells.push(cell);
            }
            board.appendChild(rowDiv);
        }
    }

    function isBoardFull() {
        return gameBoard.every(row => row.every(cell => cell !== ''));
    }

    function handleCellClick(row, col) {
        if (gameBoard[row][col] === '' && !checkWinner()) {
            gameBoard[row][col] = currentPlayer;
            renderBoard();
            document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.add('cell-clicked');

            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                setTimeout(()=>{
                    resetGame();
                },300)
            } else if (isBoardFull()) {
                alert("It's a tie!");
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Alternance entre 'X' et 'O'
                console.log(`Current player: ${currentPlayer}`);
            }
        }
    }

    function checkWinner() {
        // Verification des lignes et des colonnes
        for (let i = 0; i < 3; i++) {
            if (
                (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) ||
                (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer)
            ) {
                return true; 
            }
        }
    
        // Vérification des diagonales
        if (
            (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) ||
            (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer)
        ) {
            return true; 
        }
    
        return false; // Aucun gagnant
    }
    
    function resetGame() {
        // Réinitialisez le tableau et les états du jeu
        gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        renderBoard();
    }
    renderBoard();


});