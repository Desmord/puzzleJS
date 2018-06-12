class GameManager {

    constructor(transitionManagerd) {

        this.transitionManager = transitionManager;
        this.gameBoard = document.querySelector(`.gameBoard`);
        this.bctx = this.gameBoard.getContext(`2d`);
        this.image = new Image();

    }

    clearElement() {

        this.bctx.clearRect(0, 0, this.gameBoard.width, this.gameBoard.width);
        this.bctx.beginPath();

    }

    setCloseEvent() {


        // na probe bo trzeba normalny przycisk zrobic
        document.querySelector(`#koniec`).addEventListener(`click`, () => {

            this.clearElement();
            this.transitionManager.endGame();

        });

    }


    drawImage() {

        this.gameBoard.width = this.gameBoard.clientWidth;
        this.gameBoard.height = this.gameBoard.clientWidth;

        this.bctx.drawImage(this.image, 0, 0, this.gameBoard.width, this.gameBoard.width);

    }

    loadNewImage(){

        this.image.src = `https://source.unsplash.com/random/${this.gameBoard.clientWidth}x${this.gameBoard.clientWidth}#`+ new Date().getTime();

    }

    setEvents() {

        this.setCloseEvent();
        this.image.addEventListener(`load`, this.drawImage.bind(this), false);

    }


    init() {

        setTimeout(() => {

            this.loadNewImage();

        }, 600);

    }

    // css dla wczytywaina 
    // css dal menu
    // resize ze zmiana wielkosci i odswiezaniem obrazu


    // przy wczytyani gry tez odrazu jedno zdj
    // przy zamknieciu zmian zdj lub/i na przycisk
}