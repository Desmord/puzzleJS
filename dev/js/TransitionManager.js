class TransitionManager {

    constructor() {

        this.level = 3;
        this.startContainer = document.querySelector(`.startSettingsContainer`);
        this.gameContainer = document.querySelector(`.gameContainer`);
        this.gameBoard = document.querySelector(`.gameBoard`);
        this.gameMenu = document.querySelector(`.gameMenu`);
        this.orientation = `landscape`;

    }

    setLevel(lvl) {

        this.level = lvl;

    }

    setOrientation() {

        return new Promise((resolve, reject) => {

            if (window.innerWidth > window.innerHeight) {

                this.orientation = `landscape`;

            } else {

                this.orientation = `portrait`;

            }

            resolve();

        });

    }

    hideStartMenu() {

        return new Promise((resolve, reject) => {

            this.startContainer.classList.add(`fadeIn`);

            setTimeout(() => {

                this.startContainer.style.display = `none`;
                this.startContainer.classList.remove(`fadeIn`);

            }, 490);

            resolve();

        });

    }

    showStartMenu() {

        return new Promise((resolve, reject) => {





        });

    }

    setSize(properties) {

        this.gameBoard.style.width = `${properties.boardWidth}px`;
        this.gameBoard.style.height = `${properties.boardWidth}px`;
        this.gameBoard.style.marginRight = `${properties.margin}px`;

        this.gameMenu.style.width = `${properties.menuWidth}px`;
        this.gameMenu.style.height = `${properties.menuHeigth}px`;

    }

    setElementsSize() {

        return new Promise((resolve, reject) => {

            const windowWidth = window.innerWidth,
                windowHeight = window.innerHeight;

            let boardWidth = Number.parseInt(windowWidth * 0.55),
                margin = Number.parseInt(windowWidth * 0.05),
                menuWidth = Number.parseInt(windowWidth * 0.25),
                menuHeigth = Number.parseInt(windowHeight * 0.8);

            if (this.orientation === `landscape`) {

                // Adjusts the size depending on the height
                boardWidth = ((Number.parseInt(windowHeight * 0.8)) < boardWidth) ? Number.parseInt(windowHeight * 0.8) : boardWidth;
                menuHeigth = (boardWidth < menuHeigth) ? boardWidth : menuHeigth;

                this.setSize({
                    boardWidth,
                    margin,
                    menuWidth,
                    menuHeigth
                });

                // Orientation portrait
            } else {





            }

            resolve();

        });

    }

    showGame() {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                this.gameContainer.style.display = `flex`;

            }, 1000);

            resolve();

        });

    }

    startGame(lvl) {

        this.setLevel(lvl);


        //liczenie pozycji i rozmiaro moze w tej tablicy obietnic
        this.setOrientation().then(() => {

            return this.hideStartMenu();

        }).then(() => {

            return this.setElementsSize();

        }).then(() => {

            return this.showGame();

        }).catch((err) => {

            console.log(`bład`);

        });

    }

    endGame() {

    }
}