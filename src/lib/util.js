const URL_PARTS = {
    PROTOCOL : 'protocol',
    AUTHORITY: 'authority',
    HOST     : 'host',
    PORT     : 'port',
    PATH     : 'path',
    SEARCH   : 'search',
    QUERY    : 'query',
    FRAGMENT : 'fragment',
};
const URL_MATCHER = /^([^\/]+\:|)(\/\/[^:\/?#]+(?:\:[0-9]+)?|)(\/[^?#]*)(\?[^#]*|)(#.*|)$/;
const AUTHORITY_MATCHER = /^\/\/([^:\/?#]+)(?:\:([0-9]+))?$/;
const URL_MATCHER_FIELDS = [null, URL_PARTS.PROTOCOL, URL_PARTS.AUTHORITY, URL_PARTS.PATH, URL_PARTS.SEARCH, URL_PARTS.FRAGMENT];
const AUTHORITY_INDEX = URL_MATCHER_FIELDS.indexOf(URL_PARTS.AUTHORITY);
const SEARCH_INDEX = URL_MATCHER_FIELDS.indexOf(URL_PARTS.SEARCH);
const FRAGMENT_INDEX = URL_MATCHER_FIELDS.indexOf(URL_PARTS.FRAGMENT);
const ENCODED_SPACE = /\+/g;
const DECODED_SPACE = '%20';

export function parseUrl(url) {
    const match = url.match(URL_MATCHER);
    if (!match) {
        return null;
    }

    const parsed = {};
    for (let i = 1; i < URL_MATCHER_FIELDS.length; i++) {
        if (i === AUTHORITY_INDEX) {
            const authorityMatch = match[i].match(AUTHORITY_MATCHER);
            if (authorityMatch) {
                parsed[URL_PARTS.HOST] = authorityMatch[1];
                parsed[URL_PARTS.PORT] = authorityMatch[2] || '';
            } else {
                parsed[URL_PARTS.HOST] = '';
                parsed[URL_PARTS.PORT] = '';
            }
        } else if (i === SEARCH_INDEX) {
            parsed[URL_PARTS.QUERY] = parseQuery(match[i]);
        } else if (i === FRAGMENT_INDEX) {
            parsed[URL_MATCHER_FIELDS[i]] = match[i].substr(1);
        } else {
            parsed[URL_MATCHER_FIELDS[i]] = match[i];
        }
    }

    return parsed;
}

export function buildUrl(parsed) {
    let url = '';
    if (parsed.fragment) {
        url = `#${parsed.fragment}${url}`;
    }
    if (parsed.query) {
        url = `${buildQuery(parsed.query)}${url}`;
    }
    if (parsed.path) {
        url = `${parsed.path}${url}`;
    }
    if (parsed.host) {
        if (parsed.port) {
            url = `:${parsed.port}${url}`;
        }
        url = `//${parsed.host}${url}`;
        if (parsed.protocol) {
            url = `${parsed.protocol}${url}`;
        }
    }
    return url;
}

export function parseQuery(search) {
    const parts = {};
    const query = search.substr(1).replace(ENCODED_SPACE, DECODED_SPACE);
    if (query) {
        const queryPattern = /(?:^|&)([^&=]*)=?([^&]*)/g;
        while (true) {
            const queryMatch = queryPattern.exec(query);
            if (!queryMatch) {
                break;
            }
            const key = decodeURIComponent(queryMatch[1] || '');
            if (key) {
                parts[key] = decodeURIComponent(queryMatch[2] || '');
            }
        }
    }
    return parts;
}

export function buildQuery(parts) {
    const query = Object.keys(parts).map((key)=> {
        const value = parts[key] || '';
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
    if (query) {
        return `?${query}`;
    } else {
        return '';
    }
}
