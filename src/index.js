import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import * as models from './models.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as createRematchPersist, getPersistor} from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistPlugin = createRematchPersist({
  throttle: 1000,
  version: 1
});

const store = init({
  models,
  plugins: [persistPlugin]
});


ReactDOM.render(
  <PersistGate persistor={getPersistor()}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root'));


// Hot reloading
if (module.hot) {
  // Reload rematch models
  module.hot.accept('./models', () => {
    Object.keys(models).forEach(modelKey => {
      console.log(`Reloading model ${modelKey}`);
      store.model({
        name: modelKey,
        ...models[modelKey]
      })
    });
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
