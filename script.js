'use strict'
//------------------------------------------------Variables 
let player ={
playerName: '',
playerChoice: [],
playerScore: 0
}
const tilesContainer = document.querySelector('#tiles')
const tiles = document.querySelectorAll('.tile')
const startGameButton = document.querySelector('#startbutton')
let scoreNum = document.querySelector('#scorenum')
let colors = ['Blue', 'Orange', 'Green', 'Red']
let gameStart = false
let gameOver = false
let playerTurn = false
let audio = new Audio('./sound/audio.mp3')
let sequence = []


//-------------------------------------------------------Functions 

function playMusic(){
    audio.loop = true
    audio.play()
}

function stopMusic(){
    audio.pause()
}

function updateScore() {
    scoreNum.textContent = player.playerScore 
}

function startGame() {
    startGameButton.style.display = 'none'
    gameStart = true
    gameOver = false
    playMusic()
    assignTileColors()
    createSequence()
}

function assignTileColors() { 
    tiles.forEach(function assign(tile, index) {
      const colorIndex = index % colors.length
      const color = colors[colorIndex]
      tile.dataset.color = color
    })
}

function createSequence() {
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * colors.length)
        let randomColorArray = colors[randomIndex]
        sequence.push(randomColorArray)
        playFullSequence(0)
    }, 150)
   
  
   
}

function flashTile(tileColor) {
    tiles.forEach(tile => {
        if (tile.dataset.color === tileColor) {
            tile.style.backgroundColor = tileColor
            setTimeout(() => {
                tile.style.backgroundColor = ''
            }, 500) 
        }
    })
}

function playFullSequence(index) {
    if (index < sequence.length) {
        const colorToFlash = sequence[index]
        flashTile(colorToFlash)
        setTimeout(() => {
            playFullSequence(index + 1)
        }, 700)
    } else {
        playerTurn = true
    }
}


function checkRightOrWrong() {
    if (player.playerChoice.length === 0 ) {
        return 
    }
    
    if (player.playerChoice[player.playerChoice.length - 1] === sequence[player.playerChoice.length - 1] ) {
        console.log('yes')
        if (player.playerChoice.length === sequence.length) {
            player.playerScore++
            updateScore()
            player.playerChoice = []
            playerTurn = false 
            flashGreen()
            setTimeout(() => {
            createSequence()
            }, 1100)
            
            
           
        }
    } else {
        
        endGame()
    }
}

function flashGreen(){
    tiles.forEach((tile) => {
    tile.style.backgroundColor = 'green'
    setTimeout(() => {
        tile.style.backgroundColor = 'black'
    }, 500)
    })
 }

 function flashRed(){
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'red'
        setTimeout(() => {
            tile.style.backgroundColor = 'black'
        }, 500)
        })
 }

function endGame() {
    flashRed()
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

tiles.forEach((tile) => {
    tile.addEventListener('click', function() {
        if (!playerTurn) {
            return
        } if (playerTurn){
            tile.style.backgroundColor = tile.dataset.color
            setTimeout(() => {
            tile.style.backgroundColor = ""
            checkRightOrWrong()
        }, 200)
        }
    })
})

tiles.forEach((button) => {
    button.addEventListener('click', function () {
        if (!gameStart || !playerTurn || gameOver) {
            return
        } else {
            player.playerChoice.push(button.dataset.color)
            console.log(player.playerChoice)
        }
       
    })
})


