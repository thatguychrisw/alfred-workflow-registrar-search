const alfy = require('alfy')
const whois = require('whois-json')
const isValidDomain = require('is-valid-domain')

;(async () => {
    const domain = alfy.input
    if (!isValidDomain(domain)) {
        alfy.output([{title: 'Waiting on a valid domain', valid: false}])
        return
    }

    let items = alfy.cache.get(domain, {ignoreMaxAge: true})

    if (!items) {
        const response = await whois(alfy.input, {follow: 2})
        if (!response.registrarUrl) {
            alfy.output([{
                title: 'No registrar found',
            }])
            return
        }

        items = [{
            title: response.registrarUrl,
            subtitle: response.registrantOrganization.replace(/customer \d+/i, ''),
            arg: response.registrarUrl,
            mods: {
                shift: {
                    subtitle: response.reseller
                },
            }
        }]
    }


    alfy.cache.set(domain, items)
    alfy.output(items)
})()

