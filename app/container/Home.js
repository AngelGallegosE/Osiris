import React from 'react';
import ReactDOM from 'react-dom';
import ToPDF from '../components/ToPDF';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <div id="logo"><h1>Osiris</h1></div>
        <ToPDF />
      </div>
    ); 
  }
}

ReactDOM.render( < App / > , document.getElementById('content'));