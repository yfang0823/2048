const gameInit = function() {
    var initNum = 2
    for (var i = 0; i < initNum; i++) {
        generateNewCell()
    }
}

gameInit()

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
}

$('.newGame').on('touchend', newGame)
