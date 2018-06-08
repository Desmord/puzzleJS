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
            console.log(`pokazywanie menu startowe`);
        });

    }

    setGameBoardSize() {

        return new Promise((resolve, reject) => {
            console.log(`ustawianie wielk tablicy`);
        });

    }

    setGameBoardPosition() {

        return new Promise((resolve, reject) => {
            console.log(`ustawianie pozycji tablicy`);
        });

    }

    setGameMenuSize() {

        return new Promise((resolve, reject) => {
            console.log(`ustawnie wielkosci menu`);
        });

    }

    setGameMenuPosition() {

        return new Promise((resolve, reject) => {
            console.log(`ustawnia pozycji menu`);
        });

    }

    showGameMenu() {

        return new Promise((resolve, reject) => {
            console.log(`pokazanie menu gey`);
        });

    }

    hideGameMenu() {

        return new Promise((resolve, reject) => {
            console.log(`howanie menu gry`);
        });

    }

    showGameBoard() {

        return new Promise((resolve, reject) => {
            console.log(`pokazanie tablicy gry`);
        });

    }

    hideGameBoard() {

        return new Promise((resolve, reject) => {
            console.log(`ukrycie tablicy gry`);
        });

    }

    startGame(lvl) {

        this.setLevel(lvl);

        this.setOrientation().then(() => {

            return this.hideStartMenu();

        }).then(() => {
            //tutaj kolejna promiska

        }).catch((err) => {
            console.log(`jakis blad`);
        });

    }

    endGame(){
        
    }
}