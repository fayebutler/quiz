import React from 'react';
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
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
    static async getInitialProps (context) {
        const { id } = context.query;
        const res = await fetch(`${SERVER_URL}/api/${id}`);
        const data = await res.json();

        return {
            question: data
        }
    }

    buttonClick = (e, id) => {
        this.props.socket.emit(EVENTS.SELECT_ANSWER, {'choice_num': id, 'name': this.props.name});
    };

    renderButtons() {
        return this.props.question.answers.map((answer, id) => {
                return <Button key={id} id={id} handleClick={(e) => this.buttonClick(e, id)} message={answer}/>
            }
        );
    }

    render() {
      console.log("router " , this.props.router);
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

export default withRouter(Quiz);
