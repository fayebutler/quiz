import React from "react";

class Button extends React.Component{
    static defaultProps = {
        id: 0,
        onClick: ()=>{},
        disabled: false
    };

    render() {
        if (this.props.disabled) {
          return (
            <div className="button disabled" id={"button-" + this.props.id}>
                <h4>{this.props.message}</h4>
            </div>
          )
        } else {
          return (
            <div className="button" id={"button-" + this.props.id} onClick={this.props.handleClick}>
                <h4>{this.props.message}</h4>
            </div>
          )
        }
    }
}

export default Button;
