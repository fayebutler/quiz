import React from 'react';
import { withRouter } from 'next/router'
import { EVENTS } from '../constants'

import styles from '../styles/styles.scss';


class Login extends React.Component {
    state = {
      name: null
    }

    componentDidMount() {
      console.log('mounting');
      console.log(this.state);

      this.nextQuestion = this.nextQuestion.bind(this);
      this.props.socket.on(EVENTS.NEXT_QUESTION, this.nextQuestion)
    }

    nextQuestion(detail) {
      console.log("next question");
      let num = detail['question_num'];
      console.log(this);
      console.log(this.state);
      console.log(num);
      if(this.state.name) {
        console.log("got name now push question");
        let url = `/question/${num}?name=${this.state.name}`;
        let as = `/question/${num}`;
        console.log(url, as);
        this.props.router.push(url, as)
      }

    }



    handleSubmit = (event) => {
        const form = event.target;
        // If the form is not valid, return.
        if (!form.checkValidity()) {
          return;
        }

        event.preventDefault();

        const fd = new FormData(form);
        const player = {};

        for (let key of fd.keys()) {
          player[key] = fd.get(key);
        }
        console.log(player);

        this.props.socket.emit(EVENTS.JOIN, player['name'])

        this.setState({name: player['name']})
        console.log(this.state);
    };

    render() {
        return (
           <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  maxLength="32"
                  id="name"
                  name="name"
                  placeholder="First name"
                  required
                />
                <input type="submit"/>
              </form>
           </div>
        );
    }
}

export default withRouter(Login)
