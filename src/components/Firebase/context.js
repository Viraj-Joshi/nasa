/*
 * we need to have a way to provide a firebase instance at the top-level
 * this is as opposed to creating a instance within fire.js and importing that instance 
 * in every react component. (probelm of multiple fire instances)
*/

import React from 'react';

//provides one instance at the top of the component tree
const FirebaseContext = React.createContext(null);

export default FirebaseContext;