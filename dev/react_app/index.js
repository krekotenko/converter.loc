import React from 'react'
import ReactDOM from 'react-dom';
import Converter from "./components/Converter";
const render = () =>
    ReactDOM.render(
        <Converter/>,
        document.getElementById('root')
    );

render();

