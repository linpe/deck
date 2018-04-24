import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DeckManager from './deck-manager/app';
import SaveToDeck from './save-to-deck/app';
import database from './config';
import './util/variables.css';
import './util/reset.css';
import './util/fonts.css';
import './util/base.css';

// if (process.env.NODE_ENV === 'development') {
//   function renderDevApp() {
//     const DevApp = ({ database }) => {
//       return (
//         <Router>
//           <div>
//             <Link to="/deck-manager">Show Deck Manager</Link>
//             <Link to="/save-to-deck">Show Deck Popup</Link>
//             <Switch>
//               <Route path="/deck-manager" render={() => <DeckManager database={database} />} />
//               <Route path="/save-to-deck" render={() => <SaveToDeck database={database} />} />
//             </Switch>
//           </div>
//         </Router>
//       );
//     };
//
//     ReactDOM.render(<DevApp database={database} />, document.getElementById('deck-entry-point'));
//   }
//   renderDevApp();
// } else {
//   let App;
//   if (window.location.protocol === 'chrome-extension:') {
//     App = DeckManager;
//   } else {
//     const entryPoint = document.createElement('div');
//     entryPoint.id = 'deck-entry-point';
//     document.body.appendChild(entryPoint);
//
//     App = SaveToDeck;
//   }
//
//   ReactDOM.render(<App database={database} />, document.getElementById('deck-entry-point'));
// }

ReactDOM.render(<DeckManager database={database} />, document.getElementById('deck-entry-point'));
