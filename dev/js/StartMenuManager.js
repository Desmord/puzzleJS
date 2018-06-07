class StartMenuManager {

    constructor() {

        this.startButton = document.querySelector(`#startButton`);
        this.sliderThumb = document.querySelector(`.sliderThumb`);
        this.sliderThumbX = this.sliderThumb.getBoundingClientRect().x;
        this.sliderTrack = document.querySelector(`.sliderTrack`);
        this.sliderShiftedTrack = document.querySelector(`.sliderShiftedTrack`);
        this.level = 3;
        this.endThumbDrag = this.endThumbDrag.bind(this);
        this.thumbDrag = this.thumbDrag.bind(this);

    }

    setLevel(lvl) {
        this.level = lvl;
    }

    getLevel() {
        return this.level;
    }

    thumbDrag(e) {

        // przesuniecie niebieskiego paska na dol z-index?
        // jezdzenie niebieskiego paska // width czy transform?
        // zmianie napisu lvl 
        // ustawianie lvl w zmiennje kasle
        // metoda zwracajaca wartosc lvl
        //ustawianie od poczatku translate na 0 przy resize

        if (e.clientX > this.sliderTrack.getBoundingClientRect().x && e.clientX < this.sliderTrack.getBoundingClientRect().right) {

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderThumbX - e.clientX) * -1}px,0)`;

            // when the cursor moves out of the left side 
        } else if (this.sliderThumb.getBoundingClientRect().x < this.sliderTrack.getBoundingClientRect().x || e.clientX < this.sliderTrack.getBoundingClientRect().x) {

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderThumbX - this.sliderTrack.getBoundingClientRect().x) * -1}px,0)`;

            // when the cursor moves out of the right side 
        } else if (this.sliderThumb.getBoundingClientRect().x > this.sliderTrack.getBoundingClientRect().x + this.sliderTrack.getBoundingClientRect().width || e.clientX > this.sliderTrack.getBoundingClientRect().x + this.sliderTrack.getBoundingClientRect().width) {

            this.sliderThumb.style.webkitTransform = `translate(${this.sliderTrack.getBoundingClientRect().right - this.sliderThumbX}px,0)`;

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

    //resize aktualizacja x paskow przesowania
}