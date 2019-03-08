import React from 'react';
import ReactDOM from 'react-dom';

import './index.js';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import * as serviceWorker from './serviceWorker';

// a instance of firebase class is passed as value prop to React Context
ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}>
<App /> 
</FirebaseContext.Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
