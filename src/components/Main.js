import React, {Component} from "react";

export default class Main extends Component {
    render() {
        const {isAuthenticated, login} = this.props.auth;
        return(
            <div>
                Hello {this.props.name}<br/>
                Do you want to see the <a href="/secret">Secret Area</a> ?<br/>
                {!isAuthenticated() &&
                    <div>
                        Please login first<br/>
                        <button onClick={login}>Login</button>
                    </div>
                }
            </div>
        )
    }
}