import { parseUrl, buildUrl } from '../../src/lib/util';

describe('Util', ()=> {
    describe('.parseUrl/.buildUrl', ()=> {
        it('parses/builds standard URLs', ()=> {
            const matches = {
                'http://foo.com/?a=b&c=d': {
                    protocol: 'http:',
                    host    : 'foo.com',
                    port    : '',
                    path    : '/',
                    query   : { a: 'b', c: 'd' },
                    fragment: '',
                },
                'http://foo.com:50/asdf?ss=#fox': {
                    protocol: 'http:',
                    host    : 'foo.com',
                    port    : '50',
                    path    : '/asdf',
                    query   : { ss: '' },
                    fragment: 'fox',
                },
            };

            for (const url in matches) {
                const parsed = matches[url];
                expect(parseUrl(url)).toEqual(parsed);
                expect(buildUrl(parsed)).toEqual(url);
            }
        });
    });
});
