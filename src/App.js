// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/configureStore";
import Rute from "./Routes";
import { Provider } from "react-redux";
class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Rute />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
