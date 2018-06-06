class StartMenuManager {

    constructor() {

        this.startButton = document.querySelector(`#startButton`);
        this.sliderThumb = document.querySelector(`.sliderThumb`);
        this.sliderTrack = document.querySelector(`.sliderTrack`);
        this.sliderShiftedTrack = document.querySelector(`.sliderShiftedTrack`);
        this.level = 3;
        this.endThumbDrag = this.endThumbDrag.bind(this);
        this.thumbDrag = this.thumbDrag.bind(this);
    }


    thumbDrag(e) {

        // console.log(this.sliderTrack.offsetWidth);
        // console.log(this.sliderTrack.getBoundingClientRect().x);
        // console.log(this.sliderTrack.getBoundingClientRect().right);
        // console.log(this.sliderShiftedTrack.getBoundingClientRect().top);

        // console.log(e.clientX);

        if (e.clientX > this.sliderTrack.getBoundingClientRect().x && e.clientX < this.sliderTrack.getBoundingClientRect().right) {

            // console.log((this.sliderTrack.getBoundingClientRect().left - e.clientX) * -1);

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderTrack.getBoundingClientRect().left - e.clientX) * -1}px)`; 




        }

    }

    endThumbDrag() {

        document.removeEventListener(`mouseup`, this.endThumbDrag);
        document.removeEventListener(`mousemove`, this.thumbDrag);

    }


    sliderThumbDragEvent() {

        this.sliderThumb.addEventListener(`mousedown`, (e) => {

            document.addEventListener(`mouseup`, this.endThumbDrag);
            document.addEventListener(`mousemove`, this.thumbDrag);

        });

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