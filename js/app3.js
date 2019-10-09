class Game {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    this.fieldSize = 40;
    this.columnsPanelWidth = this.nonogram.columns.length;
    this.columnsPanelHeight = this.nonogram.columns[
      longestArray(this.nonogram.columns)
    ].length;
    this.rowsPanelHeight = this.nonogram.rows.length;
    this.rowsPanelWidth = this.nonogram.rows[
      longestArray(this.nonogram.rows)
    ].length;
  }

  //   nonogram = {
  //     columns: [
  //       [3, 2],
  //       [6, 3],
  //       [1, 1, 6],
  //       [9],
  //       [2, 1, 5],
  //       [1, 2, 4],
  //       [3, 1],
  //       [3, 2],
  //       [1, 3]
  //     ],
  //     rows: [
  //       [2],
  //       [3, 3],
  //       [2, 2, 1],
  //       [3, 2],
  //       [2, 3, 1],
  //       [4, 1],
  //       [3, 1],
  //       [4, 2],
  //       [5, 1],
  //       [5, 2],
  //       [7]
  //     ]
  //   };

  //   nonogram = {
  //     columns: [[2], [4], [4], [4], [2]],
  //     rows: [[1, 1], [5], [5], [3], [1]]
  //   };

  nonogram = {
    columns: [
      [1],
      [4, 2],
      [1, 2],
      [6, 1],
      [1, 2, 1],
      [5, 1, 1],
      [1, 2, 1, 1],
      [3, 1, 2],
      [1, 5],
      [2]
    ],
    rows: [
      [6],
      [1, 1, 1, 1],
      [2, 1, 2],
      [1, 1, 2, 1],
      [1, 1, 4],
      [1, 2, 1],
      [8],
      [1, 1],
      [1, 4],
      [2]
    ]
  };
  nonogramResult = { columns: [], rows: [] };

  renderEmptySquare() {
    const emptySquare = document.createElement("div");
    emptySquare.classList.add("empty");
    emptySquare.style.width = this.rowsPanelWidth * this.fieldSize + "px";
    emptySquare.style.height = this.columnsPanelHeight * this.fieldSize + "px";

    return emptySquare;
  }

  renderColumnsPanel() {
    const columnsPanel = document.createElement("div");
    columnsPanel.classList.add("columns");
    columnsPanel.style.width = this.columnsPanelWidth * this.fieldSize + "px";
    columnsPanel.style.height = this.columnsPanelHeight * this.fieldSize + "px";
    columnsPanel.style.gridTemplateColumns =
      "repeat(" + this.columnsPanelWidth + ", 1fr)";
    columnsPanel.style.gridTemplateRows =
      "repeat(" + this.columnsPanelHeight + ", 1fr)";

    this.drawColumnsPanelLabels(columnsPanel);

    return columnsPanel;
  }

  drawColumnsPanelLabels(container) {
    for (let i = 0; i < this.columnsPanelWidth; i++) {
      const columnLabel = document.createElement("div");
      columnLabel.classList.add("column-label");

      for (let j = 0; j < this.nonogram.columns[i].length; j++) {
        const columnLabelItem = document.createElement("span");
        columnLabelItem.classList.add("column-label__item");
        columnLabelItem.setAttribute(
          "style",
          "width: " + this.fieldSize + "px; height: " + this.fieldSize + "px;"
        );
        columnLabelItem.textContent = this.nonogram.columns[i][j];
        columnLabel.appendChild(columnLabelItem);
      }

      container.appendChild(columnLabel);
    }
  }

  renderRowsPanel() {
    const rowsPanel = document.createElement("div");
    rowsPanel.classList.add("rows");
    rowsPanel.style.width = this.rowsPanelWidth * this.fieldSize + "px";
    rowsPanel.style.height = this.rowsPanelHeight * this.fieldSize + "px";
    rowsPanel.style.gridTemplateColumns =
      "repeat(" + this.rowsPanelWidth + ", 1fr)";
    rowsPanel.style.gridTemplateRows =
      "repeat(" + this.rowsPanelHeight + ", 1fr)";
    console.log(this.rowsPanelWidth);

    this.drawRowsPanelLabels(rowsPanel);

    return rowsPanel;
  }

  drawRowsPanelLabels(container) {
    for (let i = 0; i < this.rowsPanelHeight; i++) {
      const rowLabel = document.createElement("div");
      rowLabel.classList.add("row-label");

      for (let j = 0; j < this.nonogram.rows[i].length; j++) {
        const rowLabelItem = document.createElement("span");
        rowLabelItem.classList.add("row-label__item");
        rowLabelItem.setAttribute(
          "style",
          "width: " + this.fieldSize + "px; height: " + this.fieldSize + "px;"
        );
        rowLabelItem.textContent = this.nonogram.rows[i][j];
        rowLabel.appendChild(rowLabelItem);
      }

      container.appendChild(rowLabel);
    }
  }

  renderPlayground() {
    const playGround = document.createElement("div");
    playGround.classList.add("playfield");
    playGround.style.width = this.columnsPanelWidth * this.fieldSize + "px";
    playGround.style.height = this.rowsPanelHeight * this.fieldSize + "px";
    playGround.style.gridTemplateColumns =
      "repeat(" + this.columnsPanelWidth + ", 1fr)";
    playGround.style.gridTemplateRows =
      "repeat(" + this.rowsPanelHeight + ", 1fr)";
    this.drawPlaygroundFields(playGround);

    return playGround;
  }

  drawPlaygroundFields(container) {
    let fieldNumber = 1;
    for (let i = 0; i < this.rowsPanelHeight; i++) {
      for (let j = 0; j < this.columnsPanelWidth; j++) {
        const field = document.createElement("div");
        field.classList.add("field");
        field.setAttribute("data-row", "row-" + (i + 1));
        field.setAttribute("data-column", "column-" + (j + 1));
        field.setAttribute("data-field", "field-" + fieldNumber);
        container.appendChild(field);
        fieldNumber++;
      }
    }
  }

  renderBoard(gameContainer) {
    this.gameContainer.style.height =
      (this.rowsPanelHeight + this.columnsPanelHeight) * this.fieldSize + "px";
    this.gameContainer.style.width =
      (this.columnsPanelWidth + this.rowsPanelWidth) * this.fieldSize + "px";
    gameContainer.appendChild(this.renderEmptySquare());
    gameContainer.appendChild(this.renderColumnsPanel());
    gameContainer.appendChild(this.renderRowsPanel());
    gameContainer.appendChild(this.renderPlayground());
  }

  checkColumns() {
    let columns = [];

    for (let i = 0; i < this.nonogram.columns.length; i++) {
      let singleColumn = [];

      for (let j = 0; j < this.nonogram.rows.length; j++) {
        const currentElement = this.gameContainer.querySelectorAll(
          "[data-column='column-" + (i + 1) + "']"
        )[j];
        singleColumn.push(+currentElement.classList.contains("clicked"));
        singleColumn = singleColumn;
      }
      columns.push(clearArray(singleColumn));
    }

    this.nonogramResult.columns = columns;
  }
  checkRows() {
    let rows = [];

    // Wszystkie kolumny po kolei
    for (let i = 0; i < this.nonogram.rows.length; i++) {
      let singleRow = [];

      // Wszystkie wiersze danej kolumny po kolei
      for (let j = 0; j < this.nonogram.columns.length; j++) {
        const currentElement = this.gameContainer.querySelectorAll(
          "[data-row='row-" + (i + 1) + "']"
        )[j];
        singleRow.push(+currentElement.classList.contains("clicked"));
        singleRow = singleRow;
      }
      rows.push(clearArray(singleRow));
    }

    this.nonogramResult.rows = rows;
  }

  winCheck() {
    this.checkColumns();
    this.checkRows();

    if (JSON.stringify(this.nonogram) === JSON.stringify(this.nonogramResult)) {
      alert("completed");
    } else {
      console.log("nope");
    }
  }

  play() {
    this.gameContainer.addEventListener("click", e => {
      if (e.target.classList.contains("field")) {
        e.target.classList.toggle("clicked");

        this.winCheck();
      }
      console.log(e);
    });
    this.gameContainer.addEventListener("contextmenu", () => {
      return false;
    });
  }

  setupGame() {
    this.renderBoard(this.gameContainer);

    this.play();
  }
}

const play = new Game(document.getElementById("board"));

play.setupGame();
console.log(
  play.columnsPanelWidth,
  play.columnsPanelHeight,
  play.rowsPanelHeight,
  play.rowsPanelWidth
);

function longestArray(array) {
  var lengths = array.map(function(a) {
    return a.length;
  });
  return lengths.indexOf(Math.max.apply(Math, lengths));
}

function clearArray(array) {
  return array.reduce((acc, status, index, self) => {
    const prevStatus = self[index - 1];

    if (status === 1) {
      if (prevStatus === 1) {
        acc[acc.length - 1]++;
      } else {
        return [...acc, status];
      }
    }
    return acc;
  }, []);
}
