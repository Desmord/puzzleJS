const backGroundAnimation = new SquaresAnimationManager(document.querySelector(`.backgorundCanvas`)),
    transitionManager = new TransitionManager(),
    startMenuEvents = new StartMenuManager(transitionManager);

const init = () => {

    backGroundAnimation.startAnimation();
    startMenuEvents.setEvents();

}

init();