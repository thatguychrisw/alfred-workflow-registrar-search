const alfy = require('alfy')
const whois = require('whois-json')
const phoneNumber = require('awesome-phonenumber')
const isValidDomain = require('is-valid-domain')

;(async () => {
    const domain = alfy.input
    if (!isValidDomain(domain)) {
        return alfy.output([{title: 'Waiting on a valid domain', valid: false}])
    }

    let items = alfy.cache.get(domain, {ignoreMaxAge: true})

    if (!items) {
        const response = await whois(domain, {follow: 2})
        if (!response.registrarUrl) {
            return alfy.output([{title: 'No registrar found', valid: false}])
        }

        items = [{
            title: response.registrarUrl,
            subtitle: response.registrantOrganization.replace(/customer \d+/i, ''),
            arg: response.registrarUrl,
            mods: {
                shift: {
                    subtitle: `Reseller: ${response.reseller || 'none'}`
                },
            },
            variables: {
                url: response.registrarUrl,
                name: response.registrantOrganization.replace(/customer \d+/i, ''),
                phone: phoneNumber(response.registrantPhone || '').getNumber('national') || 'none',
                reseller: response.reseller || 'none',
            }
        }]
    }

    alfy.cache.set(domain, items)
    return alfy.output(items)
})()

