import React from 'react';
import ReactDOM from 'react-dom';
import ToPDF from "../components/ToPDF";
import Status from "../components/Status";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
     return <div>
        <ToPDF />
      </div>
  }
}

ReactDOM.render( < App / > ,
    document.getElementById('content'))