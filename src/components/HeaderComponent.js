import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    logout = () => {
        localStorage.clear();
    // you can also like localStorage.removeItem('Token');
        window.location.href = "/";
      }
     
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <Link to="/buildings" className="navbar-brand">Inai Project</Link>
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                    </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
