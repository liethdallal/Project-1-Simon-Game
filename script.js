'use strict'
//------------------------------------------------Variables 
let player ={
playerChoice: [],
playerScore: 0,
playerHighestScore: 0
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
let scoreNum = document.querySelector('#scorenum')
let highScoreElement = document.querySelector('#highestscorenum')
const volumeSlider = document.getElementById('volumeSlider')
let colors = ['Blue', 'Orange', 'Green', 'Red']
let gameStart = false
let gameOver = false
let playerTurn = false
let backgroundAudio = new Audio('./sound/background.mp3')
let tileAudios = new Audio('./sound/tile.mp3')
let correcto = new Audio('./sound/correct.mp3')
let wrong = new Audio('./sound/wrong.mp3')
backgroundAudio.volume = 1 //Used for inital volume of game
let highScore = 0
let sequence = []


//-------------------------------------------------------Functions 

function playMusic(){ //plays background music 
    backgroundAudio.loop = true
    backgroundAudio.play()
}

function stopMusic(){ //pauses background music 
    backgroundAudio.pause()
}

function updateScore() { //updates score after user action
    scoreNum.textContent = player.playerScore 
}

function updateHighScore() { //Updates only when user reaches a high score 
    const currentScore = parseFloat(scoreNum.innerHTML);
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreElement.textContent = highScore;
    }
}

function startGame() { //starts the game
    startGameButton.style.display = 'none'
    gameStart = true
    gameOver = false
    playMusic()
    assignTileColors()
    createSequence()
}

function assignTileColors() { //Used to assign colors to each tile 
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color
    })
}

function createSequence() { //Selects a random color and adds it to sequence 
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * colors.length)
        let randomColorArray = colors[randomIndex]
        sequence.push(randomColorArray)
        playFullSequence(0)
    }, 150)
}

function flashTile(tileColor) {//Used to flash the color on the screen for the user
    tiles.forEach(tile => {
        if (tile.dataset.color === tileColor) {
            tile.style.backgroundColor = tileColor
            setTimeout(() => {
                tile.style.backgroundColor = ''
            }, 500) 
        }
    })
}

function playFullSequence(index) {//plays sequence from the beggining 
    if (index < sequence.length) {
        const colorToFlash = sequence[index]
        flashTile(colorToFlash)
        tileAudios.play()
        setTimeout(() => {
            playFullSequence(index + 1)
        }, 600)
    } else {
        playerTurn = true
    }
}


function checkRightOrWrong() {//Used to check user answer 
    if (player.playerChoice.length === 0 ) {
        return 
    }
    if (player.playerChoice[player.playerChoice.length - 1] === sequence[player.playerChoice.length - 1] ) {
        correct()
    } else {
        endGame()
    }
}

function correct() { //Checks if user selects the right sequnce 
    if (player.playerChoice.length === sequence.length) {
        player.playerScore++
        updateScore()
        updateHighScore()
        player.playerChoice = []
        playerTurn = false 
        flash('green') //Flashes the tiles to show user correct sequence wa clicked 
        correcto.play()
        setTimeout(() => {
        createSequence()
        }, 1100)
    }
}

function flash(color) { //A way for the tiles to flash any color i want when needed
    tiles.forEach((tile) => {
        tile.style.backgroundColor = color
        setTimeout(() => {
            tile.style.backgroundColor = 'black'
        }, 500)
        })
}

function endGame() {//Resets all scores and displays 
    flash('red')
    wrong.play()
    gameOver = true
    playerTurn = false
    startGameButton.style.display = 'block' 
    player.playerChoice = []
    sequence = []
    player.playerScore = 0 
    updateScore()
    stopMusic() 
}



//--------------------------------------------------------------Event Listners

startGameButton.addEventListener('click', startGame)

tiles.forEach((tile) => { //only allows player to play on his turn 
    tile.addEventListener('click', function() {
        if (!playerTurn) {
            return
        } if (playerTurn){
            tileAudios.play()
            tile.style.backgroundColor = tile.dataset.color
            setTimeout(() => {
            tile.style.backgroundColor = ""
            checkRightOrWrong()
        }, 200)
        }
    })
})

tiles.forEach((button) => { //Collects player choices in order after click
    button.addEventListener('click', function () {
        if (!gameStart || !playerTurn || gameOver) {
            return
        } else {
            player.playerChoice.push(button.dataset.color)
        }
       
    })
})

volumeSlider.addEventListener('input', function () { //controls volume box
    const volume = volumeSlider.value / 100
    backgroundAudio.volume = volume
  })

 

