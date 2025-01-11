import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './model/store';
var root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(_jsx(Provider, { store: store, children: _jsx(App, {}) }));
}
else {
    console.log('ID root could not be found on the page.');
}
