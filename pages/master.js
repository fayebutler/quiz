import React from 'react';
import {connect} from 'react-redux'
import { EVENTS } from '../constants'

import styles from '../styles/styles.scss';


class Master extends React.Component {

    constructor(props) {
        super(props);
        this.props.socket.emit(EVENTS.MASTER_JOIN);
        this.props.socket.on(EVENTS.JOIN, (profile) => {
          console.log("someone joined ", profile);
        });
        this.props.socket.on(EVENTS.SELECT_ANSWER, (data) => {
            console.log("someone clicked ", data);
        });
    }

    start = () => {
        this.props.socket.emit('start');
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

export default Master
