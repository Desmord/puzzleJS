class StartMenuManager {

    constructor() {

        this.startButton = document.querySelector(`#startButton`);
        this.sliderThumb = document.querySelector(`.sliderThumb`);
        this.sliderTrack = document.querySelector(`.sliderTrack`);
        this.sliderShiftedTrack = document.querySelector(`.sliderShiftedTrack`);
        this.level = 3;
    }

    sliderThumbDragEvent() {

        const f1 = () => { //mozna przeniesc do osobnej finkcji w klasie

            console.log(`poruszono`);

        }

        const closeDrag = () => {

            document.removeEventListener(`mouseup`, closeDrag);
            document.removeEventListener(`mousemove`, f1);

        }

        const dragDown = (e) => {

            document.addEventListener(`mouseup`, closeDrag);

            document.addEventListener(`mousemove`, f1);

        }

        this.sliderThumb.addEventListener(`mousedown`, dragDown);

        // this.sliderThumb.addEventListener(`mousedown`, (e) => {


        //     document.addEventListener(`mousemove`, f1);



        // });

        // this.sliderThumb.addEventListener(`mouseout`,()=>{

        //     document.removeEventListener(`mousemove`, f1);

        // });


        //dragstart
        //dragend

    }

    startButtonEvent() {

        this.startButton.addEventListener(`click`, () => {

            console.log(`start`);

        });

    }

    setEvents() {

        this.startButtonEvent();
        this.sliderThumbDragEvent();

    }

}