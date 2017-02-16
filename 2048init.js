const gameInit = function() {
    var initNum = 2
    for (var i = 0; i < initNum; i++) {
        generateNewCell()
    }
}

const loadGame = function() {
    var game = JSON.parse(localStorage.game)
    var arr = game.table
    if(game.score == '') {
        score = 0
    }else {
        score = parseInt(game.score)
    }
    if(game.record == '') {
        record = 0
    }else {
        record = parseInt(game.record)
    }
    saveTable(arr)
    updateScore()
}

const gameBegin = function() {
    $('.cheat').addClass('disabled')
    if(localStorage.game != undefined) {
        loadGame()
    }else {
        gameInit()
    }
}

const clearTable = function() {
    var zeroArr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    saveTable(zeroArr)
}

const clearText = function() {
    $('.success').text('')
    $('.fail').text('')
}

const clearScore = function() {
    $('#id-score-now').text('0')
    score = 0
}

const clearPaths = function() {
    paths = []
    $('.cheat').addClass('disabled')
}

const newGame = function() {
    clearTable()
    clearText()
    clearScore()
    clearPaths()
    gameInit()
    saveGame()
}

const cheatGame = function() {
    var length = paths.length
    if(length > 0) {
        var last = length - 1
        var lastTable = paths[last].table
        var lastScore = paths[last].score
        score = parseInt(lastScore)
        paths.splice(last, 1)
        log('cheat! ', paths.length, lastTable, lastScore)
        saveTable(lastTable)
        updateScore()
        if(paths.length == 0) {
            $('.cheat').addClass('disabled')
        }
    }else {
        log('no cheat path! ')
    }
}

$('.new').on('touchend', newGame)
$('.cheat').on('touchend', cheatGame)

gameBegin()
