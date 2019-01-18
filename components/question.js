import React from 'react';
import Button from './button'

class Quiz extends React.Component {

    renderButtons() {
        return this.props.data.answers.map((answer, id) => {
                if (this.props.answer !== null) {
                  let classname = "answer";
                  this.props.answer === id ? classname += " selected" : ""
                  id === this.props.data.correct ? classname += " correct" : classname += " incorrect"
                  return <div key={id} id={id} className={classname}>{answer}</div>
                } else {
                  return <Button key={id} id={id} handleClick={(e) => this.props.buttonClick(e, id)} message={answer}/>
                }
            }
        );
    }

    render() {

        if(this.props.data) {
            return (
                <div>
                    <h2>{this.props.data.question}</h2>
                    { this.props.data.image ?
                        <div className="image"><img src={this.props.data.image} /></div>
                        : ''
                    }
                    <div className="button-container">
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
