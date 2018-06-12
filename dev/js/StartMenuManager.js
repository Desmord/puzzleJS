class StartMenuManager {

    constructor(transitionManager) {

        this.transitionManager = transitionManager;
        this.sliderContainer = document.querySelector(`.sliderContainer`);
        this.startButton = document.querySelector(`#startButton`);
        this.sliderThumb = document.querySelector(`.sliderThumb`);
        this.sliderThumbX = this.sliderThumb.getBoundingClientRect().x;
        this.sliderTrack = document.querySelector(`.sliderTrack`);
        this.sliderShiftedTrack = document.querySelector(`.sliderShiftedTrack`);
        this.label = document.querySelector(`.startSettingsContainer :nth-child(3)`);
        this.level = 3;
        this.endThumbDrag = this.endThumbDrag.bind(this);
        this.thumbDrag = this.thumbDrag.bind(this);
        this.resetSliderAndLevel = this.resetSliderAndLevel.bind(this);

    }

    setLevel(lvl) {

        this.level = lvl;

    }

    getLevel() {

        return this.level;

    }

    setLabelText(text) {

        this.label.innerHTML = `Poziom: &nbsp; ${text}`;

    }

    resetSliderTransformations() {

        this.sliderThumb.style.webkitTransform = `translate(0px,0)`;

    }

    resetTrackSliderWidth() {

        this.sliderShiftedTrack.style.width = `30%`;

    }

    resetLevel() {

        this.setLevel(3);
        this.setLabelText(3);

    }

    resetSliderAndLevel() {

        // Updating slider thumb X 
        this.sliderThumbX = this.sliderThumb.getBoundingClientRect().x;

        this.resetSliderTransformations();
        this.resetTrackSliderWidth();
        this.resetLevel();

    }

    calculateLevel() {

        let sliderRange = this.sliderTrack.getBoundingClientRect().width,
            thumbPosition = this.sliderThumb.getBoundingClientRect().x,
            sliderPosition = this.sliderTrack.getBoundingClientRect().x,
            thumbShift = thumbPosition - sliderPosition,
            lvl = Number.parseInt((thumbShift / (sliderRange / 10)) + 1);

        if (lvl <= 0) {
            return 1;
        } else if (lvl >= 11) {
            return 10;
        } else {
            return lvl;
        }

    }

    thumbDrag(e) {

        if (e.clientX > this.sliderTrack.getBoundingClientRect().x && e.clientX < this.sliderTrack.getBoundingClientRect().right) {

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderThumbX - e.clientX) * -1}px,0)`;
            this.sliderShiftedTrack.style.width = `${(this.sliderTrack.getBoundingClientRect().x - e.clientX)* -1}px`;

            this.setLevel(this.calculateLevel());


            // when the cursor moves out of the left side 
        } else if (this.sliderThumb.getBoundingClientRect().x < this.sliderTrack.getBoundingClientRect().x || e.clientX < this.sliderTrack.getBoundingClientRect().x) {

            this.sliderThumb.style.webkitTransform = `translate(${(this.sliderThumbX - this.sliderTrack.getBoundingClientRect().x) * -1}px,0)`;

            this.setLevel(1);


            // when the cursor moves out of the right side 
        } else if (this.sliderThumb.getBoundingClientRect().x > this.sliderTrack.getBoundingClientRect().x + this.sliderTrack.getBoundingClientRect().width || e.clientX > this.sliderTrack.getBoundingClientRect().x + this.sliderTrack.getBoundingClientRect().width) {

            this.sliderThumb.style.webkitTransform = `translate(${this.sliderTrack.getBoundingClientRect().right - this.sliderThumbX}px,0)`;

            this.setLevel(10);

        }

        this.setLabelText(this.getLevel());

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

            this.transitionManager.startGame(this.getLevel());

        });

    }

    resizeWindowEvent() {

        window.addEventListener(`resize`, this.resetSliderAndLevel);

    }

    sliderTrackClickEvent() {

        this.sliderContainer.addEventListener(`click`, this.thumbDrag);

    }

    setEvents() {

        this.startButtonEvent();
        this.sliderTrackClickEvent();
        this.sliderThumbDragEvent();
        this.resizeWindowEvent();

    }

}