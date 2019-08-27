import React, { Component, useState } from 'react'
import './styles.css'

import Button from '../Button'
import Display from '../Display';


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component
{
   state = { ...initialState }

    constructor(props){
        super(props);

        this.addDigit = this.addDigit.bind(this);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.removeLastDigit = this.removeLastDigit.bind(this);
    }

    clearMemory(){
        this.setState({ ...initialState});
    }

    setOperation(operation)
    {
        if(this.state.current === 0)
        {
            this.setState({ operation, current: 1, clearDisplay: true});
        }else{
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values  = [...this.state.values];
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
            }catch(err){
                values[0] = this.state.values[0];
            }

            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values 
            });
        }
    }

    removeLastDigit()
    {
        const index = this.state.current;
        let displayValue = this.state.displayValue.toString();
        const values = this.state.values;

        if(displayValue.length > 1)
        {
            displayValue = displayValue.substring(0, displayValue.length - 1);
            values[index] = parseFloat(displayValue);
        }else{
            displayValue = '0';
        }
        
        this.setState({ current: index, values, displayValue: displayValue });
        
    }

    addDigit(n)
    {

        if(n === '.' && this.state.displayValue.includes('.')) { return; }
        
        const isEmpty = n === '.' && this.state.displayValue == '0';

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = isEmpty ? '0' + n :  currentValue  + n;
        this.setState({displayValue, clearDisplay: false});

        if(n !== '.')
        {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [ ...this.state.values];
            values[i] = newValue;
            this.setState({values});
            console.log(values);
        }
    }

    render(){      
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} operator="c" double/>
                <Button label="⌫" click={this.removeLastDigit} operator="c" />
                <Button label="÷" click={this.setOperation} operator="/" operation/>
                <Button label="7" click={this.addDigit} operator="7" />
                <Button label="8" click={this.addDigit} operator="8" />
                <Button label="9" click={this.addDigit} operator="9" />
                <Button label="x" click={this.setOperation}  operator="*" operation/>
                <Button label="4" click={this.addDigit} operator="4" />
                <Button label="5" click={this.addDigit} operator="5" />
                <Button label="6" click={this.addDigit} operator="6" />
                <Button label="-"  click={this.setOperation} operator="-" operation/>
                <Button label="1" click={this.addDigit} operator="1" />
                <Button label="2" click={this.addDigit} operator="2" />
                <Button label="3" click={this.addDigit} operator="3" />
                <Button label="+" click={this.setOperation}  operator="+" operation/>
                <Button label="0" click={this.addDigit} operator="0" double/>
                <Button label="," click={this.addDigit} operator="." />
                <Button label="=" click={this.setOperation} operation operator="="/>
            </div>
        )
    }
}