//------------------------------------------------Variables 
let player ={
//Should include a name and a highest score for the player 
playerChoice: [],
playerScore: 0
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
let scoreNum = document.querySelector('.scorenum')
let colors = ['Blue', 'Orange', 'Purple', 'Red', 'Green', 'Yellow']
let gameStart = false
let gameOver = false
let playerTurn = false
let audio = new Audio('./sound/audio.mp3')

//-------------------------------------------------------Functions 
function playMusic(){//-------------------------------------------
    if (gameStart){
        audio.loop = true
        audio.play()
    } else if (gameOver){
        audio.pause
    }
}
function startGame() {//-------------------------------------------
//This will make game start true and remove start game display 
startGameButton.style.display = 'none'
gameStart = true
playMusic()
}
function assignTileColors() { //--------------------------------------
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color;
      tile.addEventListener('click', function() {
      tile.style.backgroundColor = tile.dataset.color; // Set the background color when clicked
      });
    });
}
function flashTile(tileColor) {//-------------------------------------
    tiles.forEach(tile => {
        if (tile.dataset.color === tileColor) {
            tile.style.backgroundColor = tileColor;
            setTimeout(() => {
                tile.style.backgroundColor = ""; // Reset the background color after a brief delay
            }, 1000); // Adjust the duration the tile is lit up (in milliseconds)
        }
    });
}
function createSequence() {//------------------------------------------
    // Generate a random color from the colors array
    let randomIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomIndex];

    // Flash the tile with the random color
    flashTile(randomColor);
    rightSequence()

}
function beginSequence(){//-------------------------------------------
//call start game function start the squence of tiles and keep adding them as long as the user gets it right 
startGame()
assignTileColors()
createSequence()
checkRightOrWrong()
updateScore()

}
function checkRightOrWrong() {//---------------------------------------------
    // This will be called when the user clicks a tile
    if (player.playerChoice.length === 0) {
        return; // No user choice yet, do nothing
    }
    
    if (player.playerChoice[player.playerChoice.length - 1] === sequence()) {
        // User's latest choice matches the sequence
        if (player.playerChoice.length === colors.length) {
            // User completed the sequence
            player.playerScore++;
            updateScore();
            beginSequence();
        }
    } else {
        // User's choice doesn't match the sequence, end the game
        endGame();
    }
}
function endGame(){//------------------------------------------------
//This will end the game making the start game button reappear 
}
function updateScore(){//-------------------------------------------------
//This will update score if user gets sequence right and it will reset it back to 0 if user gets it wrong
if(rightSequence){
    scoreNum +=1
} else if (wrongSequence){
    scoreNum = 0
}
}

//--------------------------------------------------------------Event Listners
tiles.forEach(button => {
    button.addEventListener('click', checkRightOrWrong)
})
startGameButton.addEventListener('click', beginSequence)
