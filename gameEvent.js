/*
  事件绑定
*/
var startX
var startY
var endX
var endY

// 禁止屏幕滚动
$('table').on('touchmove', function(event){
    event.preventDefault()
})

// 捕捉触屏开始
$('table').on('touchstart', function(event){
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
    // log('touchstart', startX, startY)
})

// 捕捉触屏结束
$('table').on('touchend', function(event){
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY
    // log('touchend', endX, endY)
    var d = judgeDirection(startX, startY, endX, endY)
    var changed = false
    if(d != '') {
        changed = handleDirection(d)
    }
    // log('table changed ? ', changed)
    if(changed == true) {
        generateNewCell()
        updateScore()
        saveGame()
        var success = judgeSuccess()
        // log('success ? ', success)
        var full = judgeFull()
        if(full == true) {
            judgeEnd(success)
        }
    }
})

// 绑定动画结束事件：删除动画CSS
$('table').find('span').on('animationend', function(event){
    log('animation end')
    var s = event.target
    var num = s.innerHTML
    var className = 'n' + num
    s.classList = className
})

$('.new').on('touchend', newGame)
$('.cheat').on('touchend', cheatGame)
