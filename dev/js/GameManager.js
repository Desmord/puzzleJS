class GameManager {

    constructor(transitionManager) {
        this.transitionManager = transitionManager;
    }


    setCloseEvent() {

        document.querySelector(`#koniec`).addEventListener(`click`, () => {

            this.transitionManager.endGame();

        });

    }

    setEvents() {

        this.setCloseEvent();
        
    }

    init(){



    }//wczytywanie od nowa zdjecia rozmiarow itd

    // init(){}do uruchomienia grty

    // przy wczytyani gry tez odrazu jedno zdj
    // przy zamknieciu zmian zdj lub/i na przycisk
}