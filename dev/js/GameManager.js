class GameManager {

    constructor(transitionManagerd) {

        this.transitionManager = transitionManager;
        this.gameBoard = document.querySelector(`.gameBoard`);
        this.bctx = this.gameBoard.getContext(`2d`);
        this.image = new Image();
        this.level = 3;

    }

    setLevel(lvl) {

        this.level = lvl;

    }

    clearElement() {

        this.bctx.clearRect(0, 0, this.gameBoard.width, this.gameBoard.width);
        this.bctx.beginPath();

    }

    setCloseEvent() {

        document.querySelector(`#endGame`).addEventListener(`click`, () => {

            this.clearElement();
            this.transitionManager.endGame();

        });

    }

    drawImage() {

        this.gameBoard.width = this.gameBoard.clientWidth;
        this.gameBoard.height = this.gameBoard.clientWidth;

        this.bctx.drawImage(this.image, 0, 0, this.gameBoard.width, this.gameBoard.width);

    }

    loadNewImage() {

        this.image.src = `https://source.unsplash.com/random/${this.gameBoard.clientWidth}x${this.gameBoard.clientWidth}#` + new Date().getTime();

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

            } else  if (e.target.id === `pause`){

                tooltip.innerHTML = e.target.getAttribute(`data-tooltip`);
                tooltip.style.opacity = `0.7`;

            }

        });

        menu.addEventListener(`mouseleave`,()=>{

           document.querySelector(`.tooltip`).style.opacity = `0`;

        });

    }

    setEvents() {

        this.setCloseEvent();
        this.hoverEvents();

        this.image.addEventListener(`load`, this.drawImage.bind(this), false);

    }


    init() {

        setTimeout(() => {

            this.loadNewImage();

        }, 600);

    }

    // rysowanie napisu wczytywanie gry
    // rysowanie calej mapy  z podzialem na kwasdraty (po to zeby resize bylo latwe)
    // resize ze zmiana wielkosci i odswiezaniem obrazu


    // przy wczytyani gry tez odrazu jedno zdj
    // przy zamknieciu zmian zdj lub/i na przycisk
}