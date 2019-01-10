import React from 'react';
import io from 'socket.io-client';

import styles from '../styles/styles.scss';


class Login extends React.Component {

    handleSubmit = (event) => {
        const form = event.target;
        // If the form is not valid, return.
        if (!form.checkValidity()) {
          return;
        }

        // Prevent the form from requesting a refresh/navigation change if the form is valid.
        event.preventDefault();

        const fd = new FormData(form);
        const player = {};

        for (let key of fd.keys()) {
          player[key] = fd.get(key);
        }


    };
    render() {
        return (
           <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  maxLength="32"
                  autoComplete="fname"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                />
                <input type="submit"/>
              </form>
           </div>
        );
    }
}

export default () => (
    <Login />
)
