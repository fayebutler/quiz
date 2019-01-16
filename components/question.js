import React from 'react';
import { SERVER_URL, EVENTS } from '../constants'

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

    renderButtons() {
        return this.props.data.answers.map((answer, id) => {
                return <Button key={id} id={id} handleClick={(e) => this.props.buttonClick(e, id)} message={answer}/>
            }
        );
    }

    render() {
        if(this.props.data) {
            return (
                <div>
                    <h2>{this.props.data.question}</h2>
                    <div>
                        {this.renderButtons()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                  Waiting for question...
                </div>
            )
        }
    }
}

export default Quiz;
