import alfyTest from 'alfy-test'
import url from 'url'

const parseUrl = url.parse

test('it returns a registrar url for a valid domain', async () => {
    const alfy = alfyTest()

    const results = await alfy('google.com')
    const registrarUrl = parseUrl(results[0].title)

    expect(registrarUrl.hostname).toBeTruthy()
});

test('it handles invalid domains', async () => {
    const alfy = alfyTest()

    const results = await alfy('google=this=is=not=valid.com')

    expect(results[0].valid).toBeFalsy()
});

test('it uses cached responses', async () => {
    const alfy = alfyTest()

    const stub = [{
        title: 'cached',
        subtitle: 'cached',
        arg: 'cached',
        mods: {
            alt: {
                valid: false,
                subtitle: 'cached',
            },
        }
    }]
    alfy.cache.set('google.com', stub)

    const results = await alfy('google.com')

    expect(results[0].title).toEqual(stub[0].title)
});
