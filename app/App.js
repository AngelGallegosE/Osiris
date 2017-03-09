import React from 'react';
import ReactDOM from 'react-dom';
import ToPDF from "./ToPDF";
import Status from "./components/Status";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
     return <div>
        <ToPDF />
        <Status />
      </div>
  }
}

ReactDOM.render( < App / > ,
    document.getElementById('content')
);
