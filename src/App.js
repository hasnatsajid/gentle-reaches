import React, { Component } from 'react';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { I18nextProvider, withTranslation } from 'react-i18next';
import i18n from './translations/i18n';
import LanguageBtn from './cmp/LanguageBtn';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <div className="px-4 mt-4">{/* <LanguageBtn /> */}</div>
          <Switch>
            <Route path="/" exact>
              <div className="home">
                <h1 className="heading">Health Money</h1>
                <div className="hero-img">
                  <img src="/img/helm.png" alt="" />
                </div>
                <HomePage />
              </div>
            </Route>
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </I18nextProvider>
      </Provider>
    );
  }
}

export default withTranslation()(App);
