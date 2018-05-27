class BackgroundAnimationManager {

    constructor(container) {
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.container = container;
        this.squares = [];
        this.containerGraphicContext = this.container.getContext(`2d`);
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height
    }

    /**
     * Function updates number fo squares displaying in container depending of the container width.
     * Minimal number of squares is 2
     */
    updateNumberSquare() {

        let squareNumber = Number.parseInt(this.getWidth() / 200),
            array = [];

        // Minimal number of squares can not be less then 2
        if (squareNumber < 2) {
            squareNumber = 2;
        }

        for (let i = 0; i < squareNumber; i++) {
            array[i] = {
                x: Math.floor(Math.random() * this.getWidth()) + 1,
                y: 0, //this heigth
                velocity: Number.parseInt(Math.random() * 10),
                rotationSpeed: Number.parseInt(Math.random() * 10),
                width: Number.parseInt(Math.random() * 100),
                opacity: Math.random() * 0.3
            };
        }

        this.squares = array;
    }
    //1. aktualicaja liczby kwadratow
    //2 czy wychodzi - if height jest wieszke niz top od kranca

}


let obiektProbny = new BackgroundAnimationManager(document.querySelector(`.backgorundCanvas`));
//przy zmianie rozdzielczosci aktualizacja ilosci kwadratow
obiektProbny.updateNumberSquare();
console.log(obiektProbny.squares);