import React from 'react';
import ReactDOM from 'react-dom';
import DeckManager from './deck-manager/app';
import SaveToDeck from './save-to-deck/app';
import database from './config';

let App;

if (process.env.NODE_ENV === 'development' || window.location.protocol === 'chrome-extension:') {
  App = DeckManager;
} else {
  const entryPoint = document.createElement('div');
  entryPoint.id = 'deck-entry-point';
  document.body.appendChild(entryPoint);

  App = SaveToDeck;
}

ReactDOM.render(<App database={database} />, document.getElementById('deck-entry-point'));
