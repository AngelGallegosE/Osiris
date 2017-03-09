import React from 'react';
import ReactDOM from 'react-dom';
import Status from "./Status";
import FileStore from '../stores/FileStore';

export default class ToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: FileStore.getAll(),
      arrayDomains: FileStore.getAllUrlDomains(),
    };
    this.inputChange = this.inputChange.bind(this);
    this.getPDF = this.getPDF.bind(this);
    this.updateUrls = this.updateUrls.bind(this);
    FileStore.addChangeListener(this.updateUrls)
    console.log(this.state.domains);
  }

  updateUrls() {
    console.log('updating...');
    this.setState({
      urls: FileStore.getAll(),
      arrayDomains: FileStore.getAllUrlDomains(),
    });
  }

  inputChange(ev){
    this.setState({
      urls : ev.target.value
    });
  }
  getPDF(){
    let array = this.state.urls.split('\n').map((url)=>{
      let domainName = pdfFunctions.getDomain(url);
      //ANTES
      console.log(domainName);
      pdfFunctions.toPDF(url).then(()=>{
        console.log("despues");
      })
    });

    FileStore.setAll(this.state.urls);
  }

  render() {
    let domains = this.state.arrayDomains.map((domain, index) => <Status title={domain} key={index} />);
    return (
      <div>
        <textarea id="urls" rows="10" onChange={this.inputChange} value={this.state.urls}></textarea>
        <button id="pdf" onClick={this.getPDF}>Get PDF(s)</button>
        {domains}
      </div>
      );
  }
}
