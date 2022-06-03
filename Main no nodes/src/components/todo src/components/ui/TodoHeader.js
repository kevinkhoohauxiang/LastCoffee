import React from 'react';
import InputWrapper from './InputWrapper';

export default function TodoHeader(props) {
    return (
        <header>
            <h1>Things To Do</h1>
            <InputWrapper {...props}/>
        </header>
    );
}
