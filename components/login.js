import React from 'react';
import { EVENTS } from '../constants'

class Login extends React.Component {
    state = {
      name: null
    }

    handleSubmit = (event) => {
        const form = event.target;
        // If the form is not valid, return.
        if (!form.checkValidity()) {
          return;
        }

        event.preventDefault();

        const fd = new FormData(form);
        const player = {};

        for (let key of fd.keys()) {
          player[key] = fd.get(key);
        }
        console.log(player);

        this.props.socket.emit(EVENTS.JOIN, player['name'])

        this.setState({name: player['name']})
        this.props.handleLogin(player);
    };

    render() {
        return (
           <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  maxLength="32"
                  id="name"
                  name="name"
                  placeholder="First name"
                  required
                  className="text-field"
                />
                <input className="button" type="submit"/>
              </form>
           </div>
        );
    }
}

export default Login
