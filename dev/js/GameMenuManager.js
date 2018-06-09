class GameMenuManager{

    constructor(transitionManager) {
        this.transitionManager = transitionManager;
    }

   setEvents(){
       document.querySelector(`#koniec`).addEventListener(`click`,()=>{

        this.transitionManager.endGame();

       });
   }

}