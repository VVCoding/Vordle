const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const words = [
    "SUPER",
    "EMAIL",
    "TRIED",
    "TRIES",
    "FOCUS",
    "GIZMO",
    "ABUSE",
    "ADULT",
    "AGENT",
    "ANGER",
    "BEACH",
    "BIRTH",
    "BLOCK",
    "BOARD",
    "BRAIN",
    "BREAD",
    "BREAK",
    "BROWN",
    "BUYER",
    "CAUSE",
    "CHAIN",
    "CHAIR",
    "CHEST",
    "CHIEF",
    "CHILD",
    "CHINA",
    "CLAIM",
    "COAST",
    "COURT",
    "COVER",
    "CREAM",
    "CRIME",
    "CROWD",
    "CROWN",
    "DANCE",
    "DEATH",
    "DEPTH",
    "DOUBT",
    "DRAFT",
    "DREAM",
    "DRINK",
    "DRIVE",
    "EARTH",
    "ENTRY",
    "FAITH",
    "FAULT",
    "FIELD",
    "FIGHT",
    "FINAL",
    "FORCE",
    "FRAME",
    "FRANK",
    "FRONT",
    "FRUIT",
    "GROUP",
    "GUIDE",
    "HEART",
    "HORSE",
    "HOTEL",
    "HOUSE",
    "IMAGE",
    "INDEX",
    "INPUT",
    "JUDGE",
    "KNIFE",
    "LAYER",
    "LIGHT",
    "LIVES",
    "LUNCH",
    "OPENS",
    "MARCH",
    "MAJOR",
    "MATCH",
    "METAL",
    "MODEL",
    "MONEY",
    "MONTH",
    "MOUTH",
    "MUSIC",
    "NIGHT",
    "NOISE",
    "NORTH",
    "NOVEL",
    "NURSE",
    "OTHER",
    "OWNER",
    "PANEL",
    "PARTY",
    "PHASE",
    "PHONE",
    "PILOT",
    "PITCH",
    "PLACE",
    "PLANE",
    "PLANT",
    "PLATE",
    "POINT",
    "POINT",
    "POWER",
    "THIEF",
    "PRICE",
    "PRIDE",
    "PRIZE",
    "RADIO",
    "RANGE",
    "RATIO",
    "REPLY",
    "TABLE",
    "SAUCE",
    "RIGHT",
    "RIVER",
    "ROUND",
    "ROUTE",
    "RUGBY",
    "SCALE",
    "SCOPE",
    "SCORE",
    "SHAPE",
    "SHARE",
    "SHIFT",
    "SHIRT",
    "SHOCK",
    "SIGHT",
    "SOCKS",
    "SUMON",
    "SMILE",
    "SMITH",
    "SMOKE",
    "SOUND",
    "SPACE",
    "SPITE",
    "SPORT",
    "SQUAD",
    "STAGE",
    "STEAM",
    "STOCK",
    "STORE",
    "STONE",
    "STUDY",
    "STYLE",
    "SUGAR",
    "THING",
    "TOUCH",
    "TOWER",
    "TRACK",
    "TRADE",
    "TRAIN",
    "TRIAL",
    "TREND",
    "UNCLE",
    "UNITY",
    "VALUE",
    "VIDEO",
    "VOICE",
    "WASTE",
    "WATCH",
    "WATER",
    "WHILE",
    "WHITE",
    "WHOLE",
    "WOMAN",
    "WORLD",
    "YOUTH",
    "YOURS",
    "THEIR",
    "OUGHT",
    "WHOSE",
    "ADMIT",
    "ADOPT",
    "ALTER",
    "ARGUE",
    "ARISE",
    "AVOID",
    "BEGIN",
    "BLAME",
    "BREAK",
    "BRAVE",
    "BRING",
    "BUILD",
    "BURST",
    "VOIDS",
    "WRECK",
    "RINGS",
    "CLEAN",
    "CLEAR",
    "CLIMB",
    "CLOSE",
    "COUNT",
    "ENJOY",
    "ENTER",
    "EXIST",
    "IMPLY",
    "LAUGH",
    "LEARN",
    "RAISE",
    "REACH",
    "RELAX",
    "STICK",
    "BORED",
    "WEARY",
    "STUDY",
    "TEACH",
    "THANK",
    "THINK",
    "THROW",
    "TOUCH",
    "TANKS"
]
let wordle = words[Math.floor(Math.random()*words.length)];
console.log(wordle)

optionwinmessage = [ "Splendid", "Magnificent", "Wonderful", "Great Job", "Good Job", "Fantaboulastic"]
let winmessage = optionwinmessage[Math.floor(Math.random()*optionwinmessage.length)];

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL',
]

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let currentRow = 0
let currentTile = 0
let gameOver = false

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})


const handleClick = (letter) => {
    console.log("Clicked " + letter)
    if(!gameOver){
        if(letter === "DEL"){
            deleteLetter()
            return
        }

        if(letter === "ENTER"){
            checkRow()
            return
        }

        addLetter(letter)
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if(currentTile > 4) {
        FlipTile()
        if(wordle == guess){
            showMessage(winmessage)
            gameOver = true
            return
        } else{
            if(currentRow >= 5){
                showMessage('You ran out of tries: the word was ' + wordle)
                gameOver = true
                return
            }
            
        }
    }
    if(currentRow < 5){
        currentRow++
        currentTile = 0
    }
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const FlipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' +currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile =>{
        guess.push({letter:tile.getAttribute('data'), color:'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if(guess.letter == wordle[index]){
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter,'')
        }
    })

    guess.forEach(guess =>{
        if (checkWordle.includes(guess.letter)){
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)  
        }, 500 * index)
    })
}


const showMessage = (message) =>{
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(()=> messageDisplay.removeChild(messageElement), 2000)
}
const deleteLetter = () => {
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
        tile.textContent = ""
        guessRows[currentRow][currentTile] = ""
        tile.setAttribute('data', "")
    }
}
const addLetter = (letter)=>{
    if(currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-'+currentRow+"-tile-"+currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div') 
    rowElement.setAttribute('id', 'guessRow-'+guessRowIndex)
    guessRow.forEach((_guess, guessIndex) =>{
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

