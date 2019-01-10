import React from 'react';
import io from 'socket.io-client';

import styles from '../styles/styles.scss';


class Master extends React.Component {
    state = {
        socket: io('http://localhost:3000')
    };

    constructor(props) {
        super(props);
        this.state.socket.on('login', (profile) => {

        });
        this.state.socket.on('click', (num) => {
            console.log("clicked the num ", num);
        });
    }

    start = () => {
        this.state.socket.emit('start', '');
    };

    render() {
        return (
            <div>
                <h1>Master</h1>
                <button onClick={this.start}>Start</button>
            </div>
        )
    }
}

export default () => (
    <div>
      <Master />
    </div>
)
