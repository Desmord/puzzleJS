const backGroundAnimation = new SquaresAnimationManager(document.querySelector(`.backgorundCanvas`)),
    transitionManager = new TransitionManager(),
    startMenuManager = new StartMenuManager(transitionManager),
    gameManager = new GameManager(transitionManager);

const init = () => {

    backGroundAnimation.startAnimation();
    startMenuManager.setEvents();
    gameManager.setDOMElementsEvents();

    transitionManager.setGameManager(gameManager);
    transitionManager.setMenuManager(startMenuManager);

}

init();