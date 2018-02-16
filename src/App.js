import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import Secret from "./components/Secret";
import NotFound from "./components/NotFound";
import Callback from "./components/Callback"
import Auth from "./Auth";

const auth = new Auth();

class App extends Component {
    render() {

        let mainComponent = "";
        switch (this.props.location) {
            case "":
                mainComponent = <Main {...this.props} />;
                break;
            case "callback":
                mainComponent = <Callback />;
                break;
            case "secret":
                mainComponent = auth.isAuthenticated() ? <Secret {...this.props} /> : <NotFound/>;
                break;
            default:
                mainComponent = <NotFound />;
                break;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React, {this.props.name}</h1>
                </header>
                {mainComponent}
            </div>
        );
    }
}

export default App;
