const createPlayer = (playerName, symbol) => {
  const name = `Player: ${playerName}`;
  const id = playerName;
  const getPlayerSymbol = () => symbol;

  return { name, id, getPlayerSymbol };
};

const initInterface = (game) => {
  const gameBoard = game.getGameBoard();

  const gameOverContainer = document.getElementById("game-over-container");
  const gameboardParent = document.getElementById("gameboard");
  const winnerElement = document.getElementById("winner");
  const resetGameBtn = document.getElementById("reset-btn");
  gameOverContainer.style.visibility = "collapse";
  winnerElement.style.visibility = "collapse";

  const addFieldElements = (gameboardFields) => {
    const fields = [];
    gameboardFields.forEach((_, index) => {
      const fieldElement = document.createElement("button");
      fieldElement.id = `field${index}`;
      fieldElement.classList.add("field");
      gameboardParent.appendChild(fieldElement);
      fields.push(fieldElement);
    });
    return fields;
  };

  const fieldBtns = addFieldElements(gameBoard);

  const showGameOver = (winner) => {
    gameOverContainer.style.visibility = "visible";
    if (!winner) {
      winnerElement.style.visibility = "collapse";
      return;
    }
    const { name } = winner;
    winnerElement.style.visibility = "visible";
    winnerElement.textContent = `${name} has won!`;
  };

  const highlightWinningFields = (indexes) => {
    indexes.forEach((index) => {
      const highlightField = fieldBtns.find(
        (field) => field.id === `field${index}`
      );
      highlightField.classList.add("field-winner");
    });
  };

  const onGameOver = (winner, matchingIndexes) => {
    showGameOver(winner);
    if (!matchingIndexes) return;
    highlightWinningFields(matchingIndexes);
  };

  const resetFieldButtons = () => {
    fieldBtns.forEach((fieldBtn) => {
      fieldBtn.textContent = "";
      fieldBtn.classList.remove("field-winner");
      fieldBtn.disabled = false;
    });
  };

  const hideGameOver = () => {
    gameOverContainer.style.visibility = "collapse";
    winnerElement.style.visibility = "collapse";
  };

  // EVENT LISTENERS
  // add button listeners
  const addFieldBtnListener = (btn) =>
    btn.addEventListener("click", handleFieldBtnClick);

  const addFieldBtnListeners = (fields) => {
    fields.forEach((field) => addFieldBtnListener(field));
  };

  const handleFieldBtnClick = (e) => {
    const { target: btn } = e;
    const { id } = btn;

    btn.disabled = true;

    const fieldIndex = id.charAt(5);
    game.handlePlayerMove(fieldIndex, updateInterface, onGameOver);
  };

  const updateInterface = (fieldIndex, symbol) => {
    if (!fieldBtns[fieldIndex]) return;
    fieldBtns[fieldIndex].textContent = symbol;
  };

  const onResetGame = () => {
    resetFieldButtons();
    hideGameOver();
    game.resetGame();
  };

  addFieldBtnListeners(fieldBtns);

  resetGameBtn.addEventListener("click", onResetGame);

  return {
    fieldBtns,
    onGameOver,
    updateInterface,
  };
};

const initGame = (player1, player2) => {
  let currentPlayer = player1;

  const gameBoard = Array(9).fill(null);

  const getGameBoard = () => gameBoard;

  const resetGame = () => gameBoard.fill(null);

  const arrayMatches = (elements) =>
    elements.every((element) => element && element === elements[0]);

  // win conditions
  // three in a row
  const threeInARow = (board) => {
    const boardCopy = [...board];
    const boardSize = Math.sqrt(boardCopy.length);

    for (let i = 0; i < boardCopy.length; i += boardSize) {
      const elements = boardCopy.slice(i, i + boardSize);
      const indexes = Array.from(new Array(i + boardSize - i).keys()).map(
        (num) => num + i
      );

      if (arrayMatches(elements)) return indexes;
    }
    return false;
  };

  // column
  const threeInAColumn = (board) => {
    const boardCopy = [...board];
    const boardSize = Math.sqrt(boardCopy.length);

    for (let i = 0; i < boardSize; i++) {
      const elements = [
        boardCopy[i],
        boardCopy[i + boardSize],
        boardCopy[i + boardSize * 2],
      ];

      const indexes = [i, i + boardSize, i + boardSize * 2];
      if (arrayMatches(elements)) return indexes;
    }
    return false;
  };

  // diagonal TL to BR
  const threeDiagonallyTopLeftToBottomRight = (board) => {
    const boardCopy = [...board];
    let left = 0;
    const boardSize = Math.sqrt(boardCopy.length);
    const elements = [];
    const indexes = [];

    for (let i = 0; i < boardCopy.length; i += boardSize) {
      const index = i + left;
      elements.push(boardCopy[index]);
      indexes.push(index);
      left++;
    }
    if (arrayMatches(elements)) return indexes;
    return false;
  };

  // Diagonally BL to TR
  const threeDiagonallyBottomLeftToTopRight = (board) => {
    const boardCopy = [...board];
    const boardSize = Math.sqrt(boardCopy.length);
    const elements = [];
    const indexes = [];
    let right = boardSize - 1;

    for (let i = 0; i < boardCopy.length; i += boardSize) {
      const index = i + right;
      elements.push(boardCopy[index]);
      indexes.push(index);
      right--;
    }
    if (arrayMatches(elements)) return indexes;
    return false;
  };

  const checkWinConditions = (gameBoard) => {
    const winConditions = [
      threeInARow(gameBoard),
      threeInAColumn(gameBoard),
      threeDiagonallyTopLeftToBottomRight(gameBoard),
      threeDiagonallyBottomLeftToTopRight(gameBoard),
    ];

    if (winConditions.every((condition) => condition === false)) return false;
    return winConditions.find((condition) => condition !== false);
  };

  const checkAllFieldsClaimed = (gameBoard) => {
    return gameBoard.every((field) => field !== null);
  };

  // runs on btn click
  const handlePlayerMove = (
    fieldIndex,
    updateInterface,
    gameOverCallback = () => {}
  ) => {
    const player = currentPlayer;
    const symbol = player.getPlayerSymbol();

    gameBoard[fieldIndex] = symbol;
    updateInterface(fieldIndex, symbol);

    const matchingIndexes = checkWinConditions(gameBoard);

    // winner
    if (matchingIndexes) {
      gameOverCallback(player, matchingIndexes);
      return;
    }

    // tie
    const fieldsLeft = checkAllFieldsClaimed(gameBoard);
    if (fieldsLeft) {
      gameOverCallback();
      return;
    }

    const nextRoundPlayer = player.id === player1.id ? player2 : player1;
    currentPlayer = nextRoundPlayer;
  };

  return {
    getGameBoard,
    handlePlayerMove,
    resetGame,
  };
};

const startGame = (() => {
  const player1 = createPlayer(1, "x");
  const player2 = createPlayer(2, "o");

  const game = initGame(player1, player2);
  initInterface(game);
})();
