import React from 'react';
import Button from './button'

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
