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

const __gameBegin = function() {
    $('.cheat').addClass('disabled')
    if(document.documentElement.clientHeight <= 568) {
        $('html').addClass('smallScreen')
    }
    if(localStorage.game != undefined) {
        loadGame()
    }else {
        gameInit()
    }
}

__gameBegin()
