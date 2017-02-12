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
    $('#id-score-now').text('0')
    $('.success').text('')
    $('.fail').text('')
}

const newGame = function() {
    clearTable()
    clearText()
    gameInit()
}

$('.newGame').on('touchend', newGame)
