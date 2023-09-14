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
function stopMusic(){//-----------------------------------------Assisting function
    audio.pause()
}
function startGame() {//------------------------------------------- Main function 
//This will make game start true and remove start game display 
startGameButton.style.display = 'none'
gameStart = true
gameOver = false
playMusic()
assignTileColors()
createSequence()



}
function assignTileColors() { //--------------------------------------Assisting function 
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color
    })
}
function flashTile(tileColor) {//------------------------------------- Used in Creat Sequence only! 
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
    function playFullSequence(index) {
        if (index < sequence.length) {
            const colorToFlash = sequence[index];
            flashTile(colorToFlash);
            setTimeout(() => {
                playFullSequence(index + 1);
            }, 1000); // Adjust the duration (in milliseconds) between each flash
        } else {
            // When the full sequence has been played, allow the player's turn
            playerTurn = true;
        }
    }

    // Start playing the full sequence from the beginning
    playFullSequence(0);
}
function checkRightOrWrong() {//---------------------------------------------Assisting function 
    // This will be called when the user clicks a tile
    if (player.playerChoice.length === 0 ) {
        return; // No user choice yet, do nothing
    }
    
    if (player.playerChoice[player.playerChoice.length - 1] === sequence[player.playerChoice.length - 1] ) {
        console.log('yes')
        // User's latest choice matches the sequence
        if (player.playerChoice.length === sequence.length) {
            // User completed the sequence
            player.playerScore++;
            updateScore()
            player.playerChoice = []
            playerTurn = false 
            createSequence()
        }
    } else {
        
        endGame()
    }
}
function endGame() {//-----------------------------------------Assisting function 
    gameOver = true
    playerTurn = false
    startGameButton.style.display = 'block' // Show the start game button
    player.playerChoice = []// Reset player's choice
    sequence = []// Reset the sequence
    player.playerScore = 0 // Reset the player's score
    updateScore()
    stopMusic() // Pause the audio
}
function updateScore() {//------------------------------------------------------Used in end game and checkrightorwrong 
    scoreNum.textContent = player.playerScore; // Update the score displayed on the page
}

//--------------------------------------------------------------Event Listners
tiles.forEach((button) => {
    button.addEventListener('click', function () {
        if (!gameStart || !playerTurn || gameOver) {
            return; 
        } else {
            player.playerChoice.push(button.dataset.color);
            console.log(player.playerChoice);
        }
       
    })
})

tiles.forEach((tile) => {
    tile.addEventListener('click', function() {
        if (!playerTurn) {
            return; // Only allow the player to click during their turn
        } if (playerTurn){
            tile.style.backgroundColor = tile.dataset.color;
            setTimeout(() => {
            tile.style.backgroundColor = "";
            checkRightOrWrong();
        }, 700)
        }
    })
})
startGameButton.addEventListener('click', startGame)
