import { location } from 'window';
import { parseUrl, buildUrl } from './util';

const LOCALHOST = 'localhost';

function replaceLocalhost(url, parsedReplacement) {
    if (parsedReplacement.host !== LOCALHOST) {
        const parsed = parseUrl(url);
        if (parsed && parsed.host === LOCALHOST) {
            parsed.host = parsedReplacement.host;
            return buildUrl(parsed);
        }
    }
    return url;
}

function injectOverrides(config) {
    const parsed = parseUrl(location.href);
    if (parsed) {
        for (const key in parsed.query) {
            if (key in config) {
                config[key] = replaceLocalhost(parsed.query[key], parsed);
            }
        }
    }
    return config;
}

function prepare(config) {
    return Object.freeze(injectOverrides(config));
}

export default prepare({
    VERSION: '0.0.0',
});
