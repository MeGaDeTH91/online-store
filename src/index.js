import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoreNavigation from './store-navigation';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <StoreNavigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
