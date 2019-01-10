import React from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch'

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
    };

    buttonClick = (e, id) => {
        this.state.socket.emit('click', id);
    };

    renderButtons() {
        return this.props.question.answers.map((answer, id) => {
                return <Button key={id} id={id} handleClick={(e) => this.buttonClick(e, id)} message={answer}/>
            }
        );
    }

    render() {
        if(this.props.question) {
            return (
                <div>
                    <h2>{this.props.question.question}</h2>
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

Quiz.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/${id}`);
    const data = await res.json();

    return {
        question: data
    }
}

export default Quiz
