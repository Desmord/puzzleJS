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
                rotationSpeed: Number.parseFloat(Math.random() * 1).toFixed(2),
                width: Number.parseInt(Math.random() * 100),
                x: (Math.random() * this.getWidth()) + 1,
                // y: this.getHeight(),
                y: 100,
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

        this.squares.forEach((val) => {

            this.containerGraphicContext.beginPath();
            this.containerGraphicContext.rect(val.x, val.y, val.width, val.width);



            // this.containerGraphicContext.rotate(this.squares[i].actualAngle * Math.PI / 180);

            // this.containerGraphicContext.translate(this.getWidth() / 2, this.getHeight() / 2);
            // this.containerGraphicContext.translate(this.squares[i].width / 2, this.squares[i].width / 2);
            // this.containerGraphicContext.translate(0.1,0.1);

            // this.containerGraphicContext.rotate(0.01 * Math.PI / 180);
            this.containerGraphicContext.rotate(1 * Math.PI / 180);
            //  this.containerGraphicContext.translate(0,-.2);


            this.containerGraphicContext.fillStyle = `rgba(255,255,255,${val.opacity})`;
            this.containerGraphicContext.fill();


            // this.containerGraphicContext.translate(-0.2,-0.2);

            // this.containerGraphicContext.translate((this.getWidth() / 2) * -1, (this.getHeight() / 2) * -1);
            // this.containerGraphicContext.translate((this.squares[i].width / 2) * -1, (this.squares[i].width / 2) * -1);

        });

    }

    draw() {

        this.clearElement();
        // this.drawSquares();
        // this.updateSquaresVelocity();

        // window.requestAnimationFrame(this.draw);

        this.containerGraphicContext.beginPath();
        this.containerGraphicContext.rect(this.squares[1].x, this.squares[1].y, this.squares[1].width, this.squares[1].width);
        this.containerGraphicContext.fillStyle = `rgba(255,255,255,${this.squares[1].opacity})`;
        this.containerGraphicContext.fill();

        console.log(this.squares[1].rotationSpeed);
        console.log(this.squares[1].x);
        console.log(`-----------------------------------------`);

        ///------------------------------------------------------------------------

        this.containerGraphicContext.beginPath();
        this.containerGraphicContext.rotate(5 * Math.PI / 180);

        // console.log(this.squares[1].x.toFixed(2));
        // console.log(this.squares[1].rotationSpeed);

        // console.log(Number.parseFloat(this.squares[1].x.toFixed(2)) + Number.parseFloat(this.squares[1].rotationSpeed));
        // console.log(typeof Number.parseFloat(this.squares[1].x.toFixed(2)) * Number.parseFloat(Math.cos(5 * Math.PI / 180)));
        // console.log(typeof Number.parseFloat(this.squares[1].x.toFixed(2)));
        let x = Number.parseFloat(this.squares[1].x.toFixed(2));
        let y = Number.parseFloat(this.squares[1].y.toFixed(2));
        let x2 = Number.parseFloat(Math.cos(5 * Math.PI / 180));
        let y2 = Number.parseFloat(Math.sin(5 * Math.PI / 180));
        let xWynik = (x * x2) - (y * y2);
        let przesuniecieX = x - xWynik;
        let noweX = x + przesuniecieX;

        // let x2s = Number.parseFloat(Math.sin(5 * Math.PI / 180));
        // let y2s = Number.parseFloat(Math.cos(5 * Math.PI / 180));
        // let xWynik2 = (x * x2s) + (y * y2s);
        // let przesuniecieX2 = x - xWynik2;
        // let noweX2 = y + przesuniecieX2;
        // console.log(noweX2);


        //albo transform albo przesuniecie przy recie
        this.containerGraphicContext.rect(noweX, this.squares[1].y, this.squares[1].width, this.squares[1].width);

        this.containerGraphicContext.fillStyle = `rgba(255,255,255,${this.squares[1].opacity})`;
        this.containerGraphicContext.fill();

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