const alfy = require('alfy')
const whois = require('whois-json')
const isValidDomain = require('is-valid-domain')

;(async () => {
    const domain = isValidDomain(alfy.input)
    if (!domain) {
        alfy.output([{title: 'Waiting on a valid domain'}])
        return
    }

    const response = await whois(alfy.input, {follow: 2})
    if (!response.registrarUrl) {
        alfy.output([{
            title: 'No registrar found',
        }])
        return
    }

    alfy.output([{
        title: response.registrarUrl,
        subtitle: response.registrantOrganization.replace(/customer \d+/i, ''),
        arg: response.registrarUrl,
        mods: {
            shift: {
                valid: false,
                subtitle: response.reseller
            },
        }
    }])
})()

