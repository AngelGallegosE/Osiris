import React from 'react';
import ReactDOM from 'react-dom';
import ToPDF from '../components/ToPDF';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <ToPDF />
      </div>
    );
  }
}

ReactDOM.render( < App / > , document.getElementById('content'));
