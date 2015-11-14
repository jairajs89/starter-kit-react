import { document, ReactDOM } from 'window';
import App from 'component/app';

// Initialise UI
const wrap = document.body.querySelector('.app-wrap');
wrap.classList.remove('loading');
ReactDOM.render(<App foo='bar' />, wrap);
