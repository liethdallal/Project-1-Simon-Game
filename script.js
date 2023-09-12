//------------------------------------------------Variables 
class Player{
//Should include a name and a highest score for the player 
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
const scoreNum = document.querySelector('.scorenum')
const colors = ['Blue', 'Orange', 'Purple', 'Red', 'Green', 'Yellow']
let gameStart = false
let gameOver = false
let audio = new Audio('./sound/audio.mp3')


//-------------------------------------------------------Functions 
function startGame() {
//This will make game start true and remove start game display 
startGameButton.style.display = 'none'
gameStart = true
playMusic()
}
function beginSequence(){
//call start game function start the squence of tiles and keep adding them as long as the user gets it right 
startGame()
assignTileColors()


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

function playMusic(){
    if (gameStart){
        audio.loop = true
        audio.play()
    } else if (gameOver){
        audio.pause
    }
}
function assignTileColors() {
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color;
      tile.addEventListener('click', function() {
      tile.style.backgroundColor = tile.dataset.color; // Set the background color when clicked
      });
    });
  }
  
//--------------------------------------------------------------Event Listners
tiles.forEach(button => {
    
    button.addEventListener('click', checkRightOrWrong)

})

startGameButton.addEventListener('click', beginSequence)