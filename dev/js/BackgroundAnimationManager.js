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
        this.container.width = this.width;
        this.container.height = this.height;
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
                actualAngle: 0,
                velocity: Math.random() * 2,
                rotationSpeed: Number.parseInt(Math.random() * 10),
                width: Number.parseInt(Math.random() * 100),
                x: (Math.random() * this.getWidth()) + 1,
                y: this.getHeight(),
                opacity: Math.random() * 0.25
            };
        }

        this.squares = array;
    }

    clearElement() {

        this.containerGraphicContext.clearRect(0, 0, this.getWidth(), this.getHeight());
        this.containerGraphicContext.beginPath();

    }

    updateSquares() {

        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].y -= this.squares[i].velocity;
        }

    }

    drawSquares() {

        for (let i = 0; i < this.squares.length; i++) {
            this.containerGraphicContext.beginPath();
            this.containerGraphicContext.rect(this.squares[i].x, this.squares[i].y, this.squares[i].width, this.squares[i].width);

            // this.containerGraphicContext.rotate(this.squares[i].actualAngle * Math.PI / 180);
            
            this.containerGraphicContext.fillStyle = `rgba(255,255,255,${this.squares[i].opacity})`;
            this.containerGraphicContext.fill();
        }

    }

    draw() {

        this.clearElement();
        this.drawSquares();
        this.updateSquares();

        window.requestAnimationFrame(this.draw);

    }

    startAnimation() {

        this.updateNumberSquare();
        console.log(this.squares);
        //resize window event - update array
        window.requestAnimationFrame(this.draw);

    }

    //1. aktualicaja liczby kwadratow
    //2 czy wychodzi - if height jest wieszke niz top od kranca


}


let obiektProbny = new BackgroundAnimationManager(document.querySelector(`.backgorundCanvas`));

obiektProbny.startAnimation();