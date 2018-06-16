class TransitionManager {

    constructor() {

        this.level = 3;
        this.startContainer = document.querySelector(`.startSettingsContainer`);
        this.gameContainer = document.querySelector(`.gameContainer`);
        this.gameBoard = document.querySelector(`.gameBoard`);
        this.gameMenu = document.querySelector(`.gameMenu`);
        this.orientation = `landscape`;
        this.menuManager = null;
        this.gameManager = null;

    }

    setGameManager(manager) {

        this.gameManager = manager;

    }

    setMenuManager(manager) {

        this.menuManager = manager;

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

            this.startContainer.classList.add(`fadeOut`);

            setTimeout(() => {

                this.startContainer.style.display = `none`;
                this.startContainer.classList.remove(`fadeOut`);

            }, 490);

            resolve();

        });

    }

    showStartMenu() {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this.startContainer.style.display = `block`;
                this.startContainer.classList.add(`fadeIn`);

            }, 600);

            setTimeout(() => {

                this.startContainer.classList.remove(`fadeIn`);

            }, 1200);

            resolve();

        });

    }

    setSize(properties) {

        this.gameBoard.style.width = `${properties.boardWidth}px`;
        this.gameBoard.style.height = `${properties.boardWidth}px`;

        if (properties.marginRight) {

            this.gameBoard.style.marginRight = `${properties.marginRight}px`;
            this.gameBoard.style.marginBottom = `0px`;

        } else {

            this.gameBoard.style.marginBottom = `${properties.marginBottom}px`;
            this.gameBoard.style.marginRight = `0px`;

        }

        this.gameMenu.style.width = `${properties.menuWidth}px`;
        this.gameMenu.style.height = `${properties.menuHeigth}px`;

    }

    setElementsSize() {

        return new Promise((resolve, reject) => {

            const windowWidth = window.innerWidth,
                windowHeight = window.innerHeight;

            if (this.orientation === `landscape`) {

                let boardWidth = Number.parseInt(windowWidth * 0.55),
                    marginRight = Number.parseInt(windowWidth * 0.05),
                    menuWidth = Number.parseInt(windowWidth * 0.25),
                    menuHeigth = Number.parseInt(windowHeight * 0.8);

                // Adjusts the size depending on the height
                boardWidth = ((Number.parseInt(windowHeight * 0.8)) < boardWidth) ? Number.parseInt(windowHeight * 0.8) : boardWidth;
                menuHeigth = (boardWidth < menuHeigth) ? boardWidth : menuHeigth;

                this.setSize({
                    boardWidth,
                    marginRight,
                    marginBottom: 0,
                    menuWidth,
                    menuHeigth
                });

                // Orientation portrait
            } else {

                let marginBottom = Number.parseInt(windowHeight * 0.05),
                    boardWidth = Number.parseInt(windowHeight * 0.55),
                    menuHeigth = Number.parseInt(windowHeight * 0.2),
                    menuWidth = Number.parseInt(windowWidth * 0.8);

                // Adjusts the size depending on the width
                boardWidth = (boardWidth > Number.parseInt(windowWidth * 0.9)) ? Number.parseInt(windowWidth * 0.9) : boardWidth;

                this.setSize({
                    boardWidth,
                    marginRight: 0,
                    marginBottom,
                    menuWidth,
                    menuHeigth
                });

            }

            resolve();

        });

    }

    showGame() {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this.gameContainer.style.display = `flex`;
                this.gameContainer.classList.add(`fadeIn`);

            }, 600);

            setTimeout(() => {

                this.gameContainer.classList.remove(`fadeIn`);

            }, 1200);

            resolve();

        });

    }

    hideGame() {

        return new Promise((resolve, reject) => {

            this.gameContainer.classList.add(`fadeOut`);

            setTimeout(() => {
                this.gameContainer.style.display = `none`;
                this.gameContainer.classList.remove(`fadeOut`);

            }, 490);

            resolve();

        });

    }

    startGame(lvl) {

        this.setLevel(lvl);

        this.setOrientation().then(() => {

            return this.hideStartMenu();

        }).then(() => {

            return this.setElementsSize();

        }).then(() => {

            return this.showGame();

        }).then(() => {

            this.gameManager.setLevel(this.level);

            setTimeout(() => {

                this.gameManager.loadNewImage();

            }, 600);

        }).catch((err) => {

            console.log(`bład`);

        });

    }

    endGame() {

        this.hideGame().then(() => {

            return this.showStartMenu();

        });
    }

}