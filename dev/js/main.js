const backGroundAnimation = new SquaresAnimationManager(document.querySelector(`.backgorundCanvas`)),
    transitionManager = new TransitionManager(),
    startMenuEvents = new StartMenuManager(transitionManager),
    gameMenuEvents = new GameMenuManager(transitionManager);

const init = () => {

    backGroundAnimation.startAnimation();
    startMenuEvents.setEvents();
    gameMenuEvents.setEvents();

}

init();