import  React, { Component } from 'react';
import Card from '../cards/card';

const List = function(props) {    
    return (
        <div>
            {
            props.data && props.data.map(item => 
                <Card key={item.title} title={item.title} />)
            };
        </div>
    );
  
}

export default List;