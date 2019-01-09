import React from 'react';
import io from 'socket.io-client';

import styles from '../styles/styles.scss';

var socket = io('http://localhost:3000');
socket.emit("click", 1);
setTimeout(() => {
    socket.emit("click", 1);
}, 1000);

class Button extends React.Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("CLICK");
        this.socket.emit('click', this.props.id);
    }
    render() {
        return (
            <div className="button" id={"button-" + this.props.id} onClick={this.handleClick}>
                Button {this.props.id}
            </div>
        )
    }
}

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        var socket = io('http://localhost:3000');
        this.state = {socket: socket}
    }
  render() {
    return (
        <div>
            <Button id={1} socket={this.state.socket}/>
            <Button id={2} socket={this.state.socket}/>
        </div>
    )
  }
}

export default () => (
    <div>
      <Quiz name={"test"}/>
    </div>
)
