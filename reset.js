const alfy = require('alfy')

// see info.plist <dict><string></string></div>
alfy.cache.path = alfy.cache.path.replace('fr.chatard.jetbrains.workflow', 'com.alfredapp.thatguychrisw.registrar.search')

console.info('Resetting workflow...')

console.log(`${alfy.cache.size} items cached`)

alfy.cache.clear()
console.log('Cache cleared (ok)')

console.log('Completed')
