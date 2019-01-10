import React from 'react';
import io from 'socket.io-client';

import styles from '../styles/styles.scss';

class Button extends React.Component{
    static defaultProps = {
        id: 0,
        onClick: ()=>{}
    };

    render() {
        return (
            <div className="button" id={"button-" + this.props.id} onClick={this.props.handleClick}>
                {this.props.message}
            </div>
        )
    }
}

class Quiz extends React.Component {
    state = {
        socket: io('http://localhost:3000'),
        question: null
    };

    constructor(props) {
        super(props);
        this.state.socket.on('question', (question) => {
            console.log("GOT QUESTION ", question);
            this.setState({question: question});
        })
    }

    buttonClick = (e, id) => {
        this.state.socket.emit('click', id);
    };

    renderButtons() {
        return this.state.question.answers.map((answer, id) => {
                return <Button key={id} id={id} handleClick={(e) => this.buttonClick(e, id)} message={answer}/>
            }
        );
    }

    render() {
        if(this.state.question) {
            return (
                <div>
                    <h2>{this.state.question.question}</h2>
                    <div>
                        {this.renderButtons()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    No question yet..
                </div>
            )
        }
    }
}

export default () => (
    <div>
      <Quiz />
    </div>
)
