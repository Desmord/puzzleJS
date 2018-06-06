const startBackGroundSquaresAnimation = () => {

    let backGroundAnimation = new SquaresAnimationManager(document.querySelector(`.backgorundCanvas`));
    backGroundAnimation.startAnimation();

}

const init = () => {

    startBackGroundSquaresAnimation();

}


init();