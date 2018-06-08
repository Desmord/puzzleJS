class TransitionManager {

    constructor() {

        this.level = 3;
        this.startContainer = document.querySelector(`.startSettingsContainer`);
        this.gameContainer = document.querySelector(`.gameContainer`);

    }

    setLevel(lvl){

        this.level = lvl;

    }

    hideStartMenu(){

        return new Promise((resolve,reject)=>{

            this.startContainer.classList.add(`fadeIn`);

            setTimeout(()=>{

                this.startContainer.style.display = `none`;
                this.startContainer.classList.remove(`fadeIn`);

            },490);

            resolve();

        });

    }

    showStartMenu(){

        return new Promise((resolve,reject)=>{
            console.log(`pokazywanie menu startowe`);
        });

    }

    setGameBoardSize(){

        return new Promise((resolve,reject)=>{
            console.log(`ustawianie wielk tablicy`);
        });

    }

    setGameBoardPosition(){

        return new Promise((resolve,reject)=>{
            console.log(`ustawianie pozycji tablicy`);
        });

    }

    setGameMenuSize(){

        return new Promise((resolve,reject)=>{
            console.log(`ustawnie wielkosci menu`);
        });

    }

    setGameMenuPosition(){

        return new Promise((resolve,reject)=>{
            console.log(`ustawnia pozycji menu`);  
        });

    }

    showGameMenu(){

        return new Promise((resolve,reject)=>{
            console.log(`pokazanie menu gey`);
        });

    }

    hideGameMenu(){

        return new Promise((resolve,reject)=>{
            console.log(`howanie menu gry`);
        });

    }

    showGameBoard(){

        return new Promise((resolve,reject)=>{
            console.log(`pokazanie tablicy gry`);
        });

    }

    hideGameBoard(){

        return new Promise((resolve,reject)=>{
            console.log(`ukrycie tablicy gry`);
        });

    }

    startGame(lvl) {

        this.setLevel(lvl);

        this.hideStartMenu().then(()=>{

        });

    }
}

// let zmienna = loadFieldsData().then(result =>{
//     return setFieldsData(result);
// }).then(result =>{
//     return loadInfoData(result);      
// }).then(result => {
//     callback(result);
// }).catch(error => {
//     console.log("Wystąpił błąd:" + error);
// });   