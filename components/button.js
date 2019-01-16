import React from "react";

class Button extends React.Component{
    static defaultProps = {
        id: 0,
        onClick: ()=>{}
    };

    render() {
        return (
            <div className="button" id={"button-" + this.props.id} onClick={this.props.handleClick}>
                <h4>{this.props.message}</h4>
            </div>
        )
    }
}

export default Button;
