/**
 * Class manages displaying squares motion animations in the canvas element specified in the constructor.
 * Given element style must be already computed to properly get the element's size.
 */
class BackgroundAnimationManager {

    /**
     * Create animation manager
     * @param {DOM element} container 
     */
    constructor(container) {
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.container = container;
        this.squares = [];
        this.containerGraphicContext = this.container.getContext(`2d`);
        this.draw = this.draw.bind(this); // bind "this" to be able to call this function again using window.requestAnimationFrame within the same function
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

    clearElement() {
        this.containerGraphicContext.clearRect(0, 0, this.getWidth(), this.getHeight());
        this.containerGraphicContext.beginPath();
    }

    draw() {

        this.clearElement();
        //clear element
        //draw element
        //update element position itd...

        window.requestAnimationFrame(this.draw);

    }

    startAnimation() {
        this.updateNumberSquare();
        //resize window event - update array
        window.requestAnimationFrame(this.draw);
    }

    //1. aktualicaja liczby kwadratow
    //2 czy wychodzi - if height jest wieszke niz top od kranca


}


let obiektProbny = new BackgroundAnimationManager(document.querySelector(`.backgorundCanvas`));
//przy zmianie rozdzielczosci aktualizacja ilosci kwadratow
obiektProbny.startAnimation();