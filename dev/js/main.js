const startBackGroundSquaresAnimation = () => {

    let backGroundAnimation = new SquaresAnimationManager(document.querySelector(`.backgorundCanvas`));
    backGroundAnimation.startAnimation();

}

const setStartMenuEvents = ()=>{

    let startMenuEvents = new StartMenuManager();
    startMenuEvents.setEvents();
}

const init = () => {

    startBackGroundSquaresAnimation();
    setStartMenuEvents();
}


init();