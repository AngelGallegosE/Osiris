import React from 'react';
import ReactDOM from 'react-dom';

export default class ToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: ''
    };
    this.inputChange = this.inputChange.bind(this);
    this.getPDF = this.getPDF.bind(this);
  }

  inputChange(ev){
    this.setState({
      urls : ev.target.value
    });
  }
  getPDF(){
    let array = this.state.urls.split('\n').map((url)=>pdfFunctions.toPDF(url));
  }

  render() {
    return (
      <div>
        <textarea id="urls" rows="10" onChange={this.inputChange} value={this.state.urls}></textarea>
        <button id="pdf" onClick={this.getPDF}>Get PDF(s)</button>
      </div>
      );
  }
}
