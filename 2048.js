var log = function() {
    console.log.apply(console, arguments)
}

var load = function() {
    log('load')
    $('table').find('span').text('1024')
}

load()
