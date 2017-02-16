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

const newGame = function() {
    clearTable()
    clearText()
    clearScore()
    gameInit()
    saveGame()
}

const cheatGame = function() {
    if(paths.length > 0) {
        var last = paths.length - 1
        var lastTable = paths[last]
        paths.splice(last, 1)
        log('cheat! ', paths.length, lastTable)
        saveTable(lastTable)
    }else {
        log('no cheat path! ')
        $('.cheat').addClass('disabled')
        // 切换class，灰显悔棋按钮
    }
}

$('.new').on('touchend', newGame)
$('.cheat').on('touchend', cheatGame)

gameBegin()
