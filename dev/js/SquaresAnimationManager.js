/**
 * Class manages displaying squares motion animations in the canvas element specified in the constructor.
 * Given element style must be already computed to properly get the element's size.
 */
class SquaresAnimationManager {

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
        this.squaresNumber = 0;
        this.containerGraphicContext = this.container.getContext(`2d`);
        this.draw = this.draw.bind(this); // bind "this" to be able to call this function again using window.requestAnimationFrame within the same function
        this.colors = [
            [246, 114, 128], // red
            [192, 108, 132], // purple
            [53, 92, 125], // dark blue
            [69, 173, 168], // blue
            [153, 184, 152], // green
            [255, 255, 255], // white
            [253, 253, 150] // yellow
        ];
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
     * Return random color for the class color array
     * @return {Array} color in the form of an array
     */
    drawTheColor() {

        return this.colors[Math.floor(Math.random() * 7)];

    }

    createSquare() {

        let square = {
            actualAngle: 1,
            velocity: Math.random() * 1 + 0.01,
            rotationSpeed: Number.parseFloat(Math.random() * 0.01).toFixed(3),
            width: Number.parseInt(Math.random() * 80),
            x: (Math.random() * this.getWidth()) + 1,
            y: this.getHeight(),
            opacity: Math.random() * 0.20,
            color: this.drawTheColor()
        };

        if (Number.parseFloat(square.rotationSpeed) == 0) {
            square.rotationSpeed = Number.parseFloat(0.01);
        }

        return square;

    }

    /**
     * Function updates number fo squares displaying in container depending of the container width.
     * Minimal number of squares is 2
     */
    fillSquaresArray() {

        let array = [];

        this.squaresNumber = Number.parseInt(this.getWidth() / 100);

        // Minimal number of squares can not be less then 2
        if (this.squaresNumber < 4) {
            this.squaresNumber = 4;
        }

        for (let i = 0; i < this.squaresNumber; i++) {
            array[i] = this.createSquare();
        }

        this.squares = array;
    }

    clearElement() {

        this.containerGraphicContext.clearRect(0, 0, this.getWidth(), this.getHeight());
        this.containerGraphicContext.beginPath();

    }

    updateSquaresPosition() {

        this.squares = this.squares.map((val) => {

            val.y -= val.velocity;

            return val;

        });

    }

    updateSquaresRotationAngle() {

        this.squares = this.squares.map((val) => {

            if (Number.parseFloat(val.actualAngle) >= 359) {

                val.actualAngle = 1;
                return val;

            } else {

                val.actualAngle = Number.parseFloat(val.actualAngle) + Number.parseFloat(val.rotationSpeed);
                return val;

            }

        });

    }

    updateSquaresNumber() {

        let squares = this.squares.filter((square) => {

            return square.y + square.width * 2 > 1;

        });

        const numberSquaresToAdd = this.squaresNumber - squares.length;

        for (let i = 0; i < numberSquaresToAdd; i++) {
            squares.push(this.createSquare());
        }

        this.squares = squares;

    }

    drawSquares() {

        for (let i = 0; i < this.squares.length; i++) {

            this.containerGraphicContext.save();
            this.containerGraphicContext.beginPath();

            this.containerGraphicContext.translate(this.squares[i].x + this.squares[i].width, this.squares[i].y + this.squares[i].width);
            this.containerGraphicContext.rotate(this.squares[i].actualAngle + Math.PI / 180);
            this.containerGraphicContext.translate(-1 * this.squares[i].width, -1 * this.squares[i].width);
            this.containerGraphicContext.rect(this.squares[i].width / 2, this.squares[i].width / 2, this.squares[i].width, this.squares[i].width);
            this.containerGraphicContext.fillStyle = `rgba(${this.squares[i].color[0]},${this.squares[i].color[1]},${this.squares[i].color[2]},${this.squares[i].opacity})`;
            this.containerGraphicContext.fill();

            this.containerGraphicContext.restore();

        }

    }

    draw() {

        this.clearElement();
        this.drawSquares();
        this.updateSquaresPosition();
        this.updateSquaresRotationAngle();
        this.updateSquaresNumber();

        window.requestAnimationFrame(this.draw);

    }

    setResizeEvent() {

        let event;

        window.addEventListener(`resize`, () => {

            clearTimeout(event);

            event = setTimeout(() => {

                this.clearElement();

                this.setHeight(this.container.clientHeight);
                this.setWidth(this.container.clientWidth);
                this.container.width = this.width;
                this.container.height = this.height;

                this.fillSquaresArray();

            }, 200);

        });

    }

    startAnimation() {

        this.fillSquaresArray();
        this.setResizeEvent();

        window.requestAnimationFrame(this.draw);

    }

}

