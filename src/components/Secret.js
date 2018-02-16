import React, {Component} from "react";

export default class Secret extends Component {
    render() {
        const {logout} = this.props.auth;

        return (
            <div>
                This is a super secret area<br/>
                Back to <a href="/">Home</a><br/>
                Or <button onClick={logout}>Logout</button>
            </div>
        )
    }
}