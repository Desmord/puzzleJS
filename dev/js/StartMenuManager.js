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


    thumbDrag(e) {

        // przesuniecie niebieskiego paska na dol z-index?
        // jezdzenie niebieskiego paska // width czy transform?
        // wartosci brzegowe jesli za szybko wyjadzie sie za koniec
        // zmianie napisu lvl 
        // ustawianie lvl w zmiennje kasle
        // metoda zwracajaca wartosc lvl

        if (e.clientX > this.sliderTrack.getBoundingClientRect().x && e.clientX < this.sliderTrack.getBoundingClientRect().right) {

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderThumbX - e.clientX) * -1}px,0)`;

        } else if (1 == 1) {
            console.log(`tutaj jesli wyjade w lewo ustawianie na poczotku`);
        } else {
            console.log(`tutaj jesli wyjade w prawo to ustawianie na koncu`);
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