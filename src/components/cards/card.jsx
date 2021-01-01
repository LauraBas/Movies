import { Component } from "react";

const Card = function(props) {
    return (
        <div>    
            <p>{props.title}</p>        
            <button onClick={() => props.deleteClick(props.id)}>Delete</button>
        </div>
    )
};

export default Card;