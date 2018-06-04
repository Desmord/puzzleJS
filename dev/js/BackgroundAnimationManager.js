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


        this.probaKonta = 1;
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
                actualAngle: 1,
                velocity: Math.random() * 2,
                rotationSpeed: Number.parseFloat(Math.random() * 0.03).toFixed(3),
                //sprawdzenie czy jest 00
                width: Number.parseInt(Math.random() * 100),
                x: (Math.random() * this.getWidth()) + 1,
                // y: this.getHeight(),
                y: (Math.random() * this.getHeight()) + 1,
                opacity: Math.random() * 0.25
            };
        }

        this.squares = array;
    }

    clearElement() {

        this.containerGraphicContext.clearRect(0, 0, this.getWidth(), this.getHeight());
        this.containerGraphicContext.beginPath();

    }

    updateSquaresVelocity() {

        this.squares = this.squares.map((val) => {

            val.y -= val.velocity;

            return val;

        });

    }

    drawSquares() {

        for (let i = 0; i < this.squares.length; i++) {

            this.containerGraphicContext.save();

            this.containerGraphicContext.fillStyle = `rgba(255,255,255,${this.squares[i].opacity})`;
            this.containerGraphicContext.translate(this.squares[i].x + this.squares[i].width, this.squares[i].y + this.squares[i].width);
            this.containerGraphicContext.rotate(this.squares[i].actualAngle + Math.PI / 180);
            this.containerGraphicContext.translate(-1 * this.squares[i].width, -1 * this.squares[i].width);
            this.containerGraphicContext.rect(this.squares[i].width / 2, this.squares[i].width / 2, this.squares[i].width, this.squares[i].width);
            this.containerGraphicContext.fill();

            this.containerGraphicContext.restore();


            //tutaj update velocity ()squere
            //tutaj update rotation ()squere


            if (Number.parseFloat(this.squares[i].actualAngle) >= 359) {
                this.squares[i].actualAngle = 1;
            } else {
                this.squares[i].actualAngle = Number.parseFloat(this.squares[i].actualAngle) + Number.parseFloat(this.squares[i].rotationSpeed);
            }
        }

    }

    draw() {

        this.clearElement();
        this.drawSquares();
        // this.updateSquaresVelocity();

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

obiektProbny.startAnimation();