class GameManager {

    constructor(transitionManagerd) {

        this.transitionManager = transitionManager;
        this.gameBoard = document.querySelector(`.gameBoard`);
        // this.bctx = this.gameBoard.getContext(`2d`);
        this.image = new Image();
        this.gameCellArray = [];
        this.gameCellWidth = 0;
        this.level = 3;

    }

    setLevel(lvl) {

        this.level = lvl;

    }

    setGameCellWidth(width) {

        this.gameCellWidth = width;

    }

    // clearElement() {

    //     this.bctx.clearRect(0, 0, this.gameBoard.width, this.gameBoard.width);
    //     this.bctx.beginPath();

    // }

    setCloseEvent() {

        document.querySelector(`#endGame`).addEventListener(`click`, () => {

            this.transitionManager.endGame();

        });

    }

    hoverEvents() {

        const menu = document.querySelector(`.menuButtons`);

        menu.addEventListener(`mouseover`, (e) => {

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

        });

        menu.addEventListener(`mouseleave`, () => {

            document.querySelector(`.tooltip`).style.opacity = `0`;

        });

    }

    // drawImage() {

    //     this.gameBoard.width = this.gameBoard.clientWidth;
    //     this.gameBoard.height = this.gameBoard.clientWidth;

    //     this.bctx.drawImage(this.image, 0, 0, this.gameBoard.width, this.gameBoard.width);

    // }

    // loadNewImage() {

    //     this.image.src = `https://source.unsplash.com/random/${this.gameBoard.clientWidth}x${this.gameBoard.clientWidth}#` + new Date().getTime();

    // }

    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //----------------------------------Malowanie planszy---------------------
    //------------------------------------------------------------------------

    removeBoard() {

        return new Promise((resolve, reject) => {

            while (this.gameBoard.firstChild) {
                this.gameBoard.removeChild(this.gameBoard.firstChild);
            }

            resolve();

        });

    }

    createEmptyBoard() {

        return new Promise((resolve, reject) => {

            const cellSize = Number.parseInt((this.gameBoard.clientWidth - (this.level * 2)) / this.level);

            this.setGameCellWidth(cellSize);

            for (let i = 0; i < this.level; i++) {
                for (let j = 0; j < this.level; j++) {

                    let gameCell = document.createElement(`canvas`);

                    gameCell.width = cellSize;
                    gameCell.height = cellSize;

                    gameCell.style.backgroundColor = `white`;
                    gameCell.style.marginLeft = `2px`;
                    gameCell.classList.add(`gameCell`);

                    this.gameBoard.appendChild(gameCell);

                }
            }

            resolve();

        });

    }

    createGameCellArray() {

        return new Promise((resolve, reject) => {

            const cells = [...document.querySelectorAll(`.gameCell`)];

            let counter = 0;

            for (let i = 0; i < this.level; i++) {
                for (let j = 0; j < this.level; j++) {

                    this.gameCellArray.push({
                        x: cells[counter].offsetLeft,
                        maxX: cells[counter].offsetLeft + this.gameCellWidth,
                        y: cells[counter].offsetTop,
                        maxY: cells[counter].offsetTop + this.gameCellWidth,
                        order: counter
                    });

                    counter++;

                }
            }

            resolve();

        });

    }

    shuffleCellsArray() {

        return new Promise((resolve, reject) => {

            console.log(`mieszamy`);
            resolve();
        });

    }


    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    setEvents() {

        this.setCloseEvent();
        this.hoverEvents();

        // this.image.addEventListener(`load`, this.drawImage.bind(this), false);

    }


    init() {

        setTimeout(() => {

            this.removeBoard().then(() => {

                return this.createEmptyBoard();

            }).then(() => {

                return this.createGameCellArray();

            }).then(()=>{

                return this.shuffleCellsArray();

            }).catch((err) => {

                console.log(err);

            });

            // this.loadNewImage();

        }, 600);

    }

    // rysowanie napisu wczytywanie gry
    // rysowanie calej mapy  z podzialem na kwasdraty (po to zeby resize bylo latwe)
    // resize ze zmiana wielkosci i odswiezaniem obrazu


    // przy wczytyani gry tez odrazu jedno zdj
    // przy zamknieciu zmian zdj lub/i na przycisk
}