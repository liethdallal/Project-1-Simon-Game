//------------------------------------------------Variables 
class Player{
//Should include a name and a highest score for the player 
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
const scoreNum = document.querySelector('.scorenum')
let gameStart = false
let gameOver = false



//-------------------------------------------------------Functions 
function startGame() {
//This will make game start true and remove start game display 
startGameButton.style.display = 'none'
gameStart = true
}
function beginSequence(){
//call start game function start the squence of tiles and keep adding them as long as the user gets it right 
startGame()
if(gameStart){
    console.log('yes')
} else {
    console.log('no')
}

}
function endSequence(){
//This will end the game making the start game button reappear 
}
function updateScore(){
//This will update score if user gets sequence right and it will reset it back to 0 if user gets it wrong
}
function rightSequence(){
//This will flash all tiles green 3 times if user gets sequence right 

}
function wrongSequence(){
//This will flash all tiles red 3 times if user gets a sequence wrong
}
function checkRightOrWrong(){
    //This will call both right and wrong sequnce depeding on click

}

//--------------------------------------------------------------Event Listners
tiles.forEach(button => {
    
    button.addEventListener('click', checkRightOrWrong)

})

startGameButton.addEventListener('click', beginSequence)