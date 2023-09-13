'use strict'
//------------------------------------------------Variables 
let player ={
//Should include a name and a highest score for the player 
playerChoice: [],
playerScore: 0
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
let scoreNum = document.querySelector('#scorenum')
let colors = ['Blue', 'Orange', 'Purple', 'Red', 'Green', 'Yellow']
let gameStart = false
let gameOver = false
let playerTurn = false
let audio = new Audio('./sound/audio.mp3')
let sequence = []


//-------------------------------------------------------Functions 
function playMusic(){//-------------------------------------------Assiting function 
        audio.loop = true
        audio.play()
}
function stopMusic(){
    audio.pause()
}
function startGame() {//------------------------------------------- Assiting function 
//This will make game start true and remove start game display 
startGameButton.style.display = 'none'
gameOver = false
gameStart = true
playMusic()
assignTileColors()
}
function assignTileColors() { //--------------------------------------Assisting function 
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color
      tile.addEventListener('click', function() {
        if(playerTurn){
      tile.style.backgroundColor = tile.dataset.color; // Set the background color when clicked
      checkRightOrWrong()
        }
      });
    });
}
function flashTile(tileColor) {//------------------------------------- Assisting function 
    tiles.forEach(tile => {
        if (tile.dataset.color === tileColor) {
            tile.style.backgroundColor = tileColor
            setTimeout(() => {
                tile.style.backgroundColor = "" // Reset the background color after a brief delay
            }, 1000) // Adjust the duration the tile is lit up (in milliseconds)
        }
    });
}
function createSequence() {//------------------------------------------ Asisting function 
    // Generate a random color from the colors array
    let randomIndex = Math.floor(Math.random() * colors.length)
    let randomColorArray = colors[randomIndex]
    sequence.push(randomColorArray)
    // Flash the tile with the random color
    flashTile(randomColorArray);
    playerTurn = false
    console.log(randomColorArray)
   

}

function beginSequence(){//------------------------------------------- Main Function 
//call start game function start the squence of tiles and keep adding them as long as the user gets it right 
startGame()
assignTileColors()
createSequence()
updateScore()

}
function checkRightOrWrong() {//---------------------------------------------Assisting function 
    // This will be called when the user clicks a tile
    if (player.playerChoice.length === 0) {
        return; // No user choice yet, do nothing
    }
    
    if (player.playerChoice[player.playerChoice.length - 1] === sequence[player.playerChoice.length - 1]) {
        // User's latest choice matches the sequence
        if (player.playerChoice.length === sequence.length) {
            // User completed the sequence
            player.playerScore++;
            updateScore()
            player.playerChoice = []
            beginSequence()
        }
    } else {
        
        endGame()
    }
}
function endGame() {//-----------------------------------------Assisting function 
    gameOver = true
    startGameButton.style.display = 'block' // Show the start game button
    player.playerChoice = []// Reset player's choice
    sequence = []// Reset the sequence
    player.playerScore = 0 // Reset the player's score
    updateScore()
    stopMusic() // Pause the audio
}
function updateScore() {//------------------------------------------------------Assiting function 
    scoreNum.textContent = player.playerScore; // Update the score displayed on the page
}

//--------------------------------------------------------------Event Listners
tiles.forEach((button) => {
    button.addEventListener('click', function () {
        if (!gameStart || playerTurn || gameOver) {
            return; 
        }
        player.playerChoice.push(button.dataset.color);
        checkRightOrWrong();
        console.log(player.playerChoice)
    });
});

startGameButton.addEventListener('click', beginSequence)
