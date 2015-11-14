import { React } from 'window';
import TestUtils from 'react-addons-test-utils';
const App = require('../../src/component/app');

describe('App', ()=> {
    it('it prints hello world', ()=> {
        const app = TestUtils.renderIntoDocument(<App />);
        const h3 = TestUtils.findRenderedDOMComponentWithTag(app, 'h3');
        expect(h3.textContent).toEqual('Hello, world!');
    });
});
