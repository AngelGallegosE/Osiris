import React from 'react';
import ReactDOM from 'react-dom';
import ToPDF from "./ToPDF";

export class App extends React.Component {
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
    document.getElementById('content')
);
