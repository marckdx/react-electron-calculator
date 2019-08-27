import React from 'react';

import './styles.css';

export default props => {
 
    return (<button className={
        `button 
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
        
        onClick={ () => props.operator && props.click(props.operator)}
        >
        {props.label}
    </button>);
 
}
