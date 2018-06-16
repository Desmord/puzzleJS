class GameManager {

    constructor(transitionManagerd) {

        this.transitionManager = transitionManager;
        this.gameCellArray = [];
        this.gameCellWidth = 0;
        this.level = 3;
        this.resizeEvent = null;
        this.gameBoard = document.querySelector(`.gameBoard`);
        this.image = new Image();

        // Binding events functions
        this.endDrag = this.endDrag.bind(this);
        this.closeGame = this.closeGame.bind(this);
        this.resizeGameBoard = this.resizeGameBoard.bind(this);
        this.gameCellsMousedown = this.gameCellsMousedown.bind(this);

    }

    setLevel(lvl) {

        this.level = lvl;

    }

    setGameCellWidth(width) {

        this.gameCellWidth = width;

    }

    setDOMElementsEvents() {
        // Menu events
        document.querySelector(`.menuButtons`).addEventListener(`mouseover`, this.hoverGameMenu);
        document.querySelector(`.menuButtons`).addEventListener(`mouseleave`, this.mouseLeaveGameMenu);
        document.querySelector(`#endGame`).addEventListener(`click`, this.closeGame);

        // Game board events
        document.querySelector(`.gameBoard`).addEventListener(`mousedown`, this.gameCellsMousedown);

        // Other events
        window.addEventListener(`resize`, this.resizeGameBoard);
        this.image.addEventListener(`load`, this.loadGame.bind(this), false);

    }

    closeGame() {

        this.transitionManager.endGame();

    }

    hoverGameMenu(e) {

        let tooltip = document.querySelector(`.tooltip`);

        if (e.target.id === `endGame`) {

            tooltip.innerHTML = e.target.getAttribute(`data-tooltip`);
            tooltip.style.opacity = `0.7`;

        } else if (e.target.id === `start`) {

            tooltip.innerHTML = e.target.getAttribute(`data-tooltip`);
            tooltip.style.opacity = `0.7`;

        } else if (e.target.id === `pause`) {

            tooltip.innerHTML = e.target.getAttribute(`data-tooltip`);
            tooltip.style.opacity = `0.7`;

        }

    }

    mouseLeaveGameMenu() {

        document.querySelector(`.tooltip`).style.opacity = `0`;

    }

    resizeGameBoard() {

        clearTimeout(this.resizeEvent);

        this.resizeEvent = setTimeout(() => {

            this.transitionManager.setElementsSize().then(() => {

                return this.removeBoard();

            }).then(() => {

                return this.createEmptyBoard();

            }).then(() => {

                return this.updateGameCellArray();

            }).then(() => {

                return this.drawCells();

            }).catch((err) => {

                console.log(err);

            });

        }, 200);

    }

    gameCellsMousedown() {

        document.addEventListener(`mouseup`, this.endDrag);
        document.addEventListener(`mousemove`, this.drag);

    }


    endDrag() {

        //tutaj zdarzenie   


        document.removeEventListener(`mouseup`, this.endDrag);
        document.removeEventListener(`mousemove`, this.drag);

    }

    drag(e) {

        try {
            // Checking if clicked element id game cell
            if (e.target.parentNode.classList.contains(`gameCell`)) {

                e.target.parentNode.style.webkitTransform = `translate(${((e.target.parentNode.offsetLeft - e.clientX) * -1)-(e.target.width / 2)}px
                                                        ,${((e.target.parentNode.offsetTop - e.clientY)* -1) - e.target.height / 2 }px)`;

            }

        } catch (err) {

            console.log(`Wyjechano poza obszar gry.`);

        }

    }

    loadGame() {

        this.clearGameArray().then(() => {

            return this.removeBoard();

        }).then(() => {

            return this.createEmptyBoard();

        }).then(() => {

            return this.createGameCellArray();

        }).then(() => {

            return this.shuffleCellsArray();

        }).then(() => {

            return this.drawCells();

        }).catch((err) => {

            console.log(err);

        });

    }

    init() {

        setTimeout(() => {

            this.loadNewImage();

        }, 600);

    }

    clearGameArray() {

        return new Promise((resolve, reject) => {

            this.gameCellArray = [];

            resolve();

        });

    }

    removeBoard() {

        return new Promise((resolve, reject) => {

            while (this.gameBoard.firstChild) {
                this.gameBoard.removeChild(this.gameBoard.firstChild);
            }

            resolve();

        });

    }

    loadNewImage() {

        this.removeBoard();

        this.image.src = `https://source.unsplash.com/random/${this.gameBoard.clientWidth}x${this.gameBoard.clientWidth}#` + new Date().getTime();

    }

    createEmptyBoard() {

        return new Promise((resolve, reject) => {

            const cellSize = Number.parseInt((this.gameBoard.clientWidth - (this.level * 2)) / this.level);

            this.setGameCellWidth(cellSize);

            for (let i = 0; i < this.level; i++) {
                for (let j = 0; j < this.level; j++) {

                    let gameCell = document.createElement(`div`);

                    gameCell.style.width = `${this.gameCellWidth}px`;
                    gameCell.style.height = `${this.gameCellWidth}px`;
                    gameCell.style.marginLeft = `2px`;
                    gameCell.style.marginTop = `2px`;
                    gameCell.classList.add(`gameCell`);

                    this.gameBoard.appendChild(gameCell);

                }
            }

            resolve();

        });

    }

    createGameCellArray() {

        return new Promise((resolve, reject) => {

            const cells = [...document.querySelectorAll(`.gameCell`)],
                parentLeft = cells[0].parentNode.offsetLeft,
                parentTop = cells[0].parentNode.offsetTop;

            let counter = 0;

            for (let i = 0; i < this.level; i++) {
                for (let j = 0; j < this.level; j++) {

                    let startX = cells[counter].offsetLeft - parentLeft,
                        startY = cells[counter].offsetTop - parentTop;

                    this.gameCellArray.push({
                        x: cells[counter].offsetLeft,
                        maxX: cells[counter].offsetLeft + this.gameCellWidth,
                        y: cells[counter].offsetTop,
                        maxY: cells[counter].offsetTop + this.gameCellWidth,
                        order: counter,
                        img: this.getImagePortion(this.image, this.gameCellWidth, startX, startY)
                    });

                    counter++;

                }
            }

            resolve();

        });

    }

    updateGameCellArray() {

        return new Promise((resolve, reject) => {

            const cells = [...document.querySelectorAll(`.gameCell`)],
                parentLeft = cells[0].parentNode.offsetLeft,
                parentTop = cells[0].parentNode.offsetTop;

            let order = [];

            //getting cells order
            for (let i = 0; i < this.gameCellArray.length; i++) {

                order.push(this.gameCellArray[i].order);

            }

            //ordering cells Array
            for (let i = 0; i < this.gameCellArray.length; i++) {

                let tempCell = this.gameCellArray[i];

                for (let j = 0; j < this.gameCellArray.length; j++) {

                    if (this.gameCellArray[j].order === i) {

                        this.gameCellArray[i] = this.gameCellArray[j];
                        this.gameCellArray[j] = tempCell;

                    }
                }
            }

            //updating gameCells size and position
            for (let i = 0; i < this.gameCellArray.length; i++) {

                let startX = cells[i].offsetLeft - parentLeft,
                    startY = cells[i].offsetTop - parentTop;

                this.gameCellArray[i].x = cells[i].offsetLeft;
                this.gameCellArray[i].maxX = cells[i].offsetLeft + this.gameCellWidth;
                this.gameCellArray[i].y = cells[i].offsetTop;
                this.gameCellArray[i].maxY = cells[i].offsetTop + this.gameCellWidth;
                this.gameCellArray[i].img = this.getImagePortion(this.image, this.gameCellWidth, startX, startY);

            }

            //setting cell back order
            for (let i = 0; i < this.gameCellArray.length; i++) {

                if (!this.gameCellArray[i].order == order[i]) {
                    // same order
                } else {

                    let tempCell = this.gameCellArray[i];

                    for (let j = 0; j < this.gameCellArray.length; j++) {

                        if (this.gameCellArray[j].order == order[i]) {

                            this.gameCellArray[i] = this.gameCellArray[j];
                            this.gameCellArray[j] = tempCell;

                        }
                    }
                }
            }

            resolve();

        });

    }


    getImagePortion(imgObj, size, startX, startY) {

        let tnCanvas = document.createElement(`canvas`),
            tnCanvasContext = tnCanvas.getContext(`2d`);

        tnCanvas.width = size;
        tnCanvas.height = size;

        let bufferCanvas = document.createElement(`canvas`),
            bufferContext = bufferCanvas.getContext(`2d`);

        bufferCanvas.width = this.gameBoard.clientWidth;
        bufferCanvas.height = this.gameBoard.clientWidth;

        bufferContext.drawImage(imgObj, 0, 0, this.gameBoard.clientWidth, this.gameBoard.clientWidth);
        tnCanvasContext.drawImage(bufferCanvas, startX, startY, size, size, 0, 0, size, size);

        return tnCanvas;

    }

    shuffleCellsArray() {

        return new Promise((resolve, reject) => {

            let counter = this.gameCellArray.length;

            while (counter > 0) {

                let index = Math.floor(Math.random() * counter);

                counter--;

                let temp = this.gameCellArray[counter];
                this.gameCellArray[counter] = this.gameCellArray[index];
                this.gameCellArray[index] = temp;

            }

            resolve();

        });

    }

    drawCells() {

        return new Promise((resolve, reject) => {

            const cells = [...document.querySelectorAll(`.gameCell`)];

            for (let i = 0; i < this.gameCellArray.length; i++) {

                cells[i].appendChild(this.gameCellArray[i].img);

            }

            resolve();

        });

    }

}