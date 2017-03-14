import React from 'react';
import Status from './Status';
import FileStore from '../stores/FileStore';

export default class ToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      arrayDomains:[],
      working: '',
    };
    this.inputChange = this.inputChange.bind(this);
    this.getPDF = this.getPDF.bind(this);
    this.updateUrls = this.updateUrls.bind(this);
    this.inputClean = this.inputClean.bind(this);
  }

  componentWillMount(){
    FileStore.addChangeListener(this.updateUrls);
    this.setState({
      urls: FileStore.getAll(),
      arrayDomains: FileStore.getAllUrlDomains()
    });
  }

  componentWillUnmount(){
    FileStore.removeChangeListener(this.updateUrls);
  }

  updateUrls() {
    this.setState({
      urls: FileStore.getAll(),
      arrayDomains: FileStore.getAllUrlDomains(),
    });
  }

  inputChange(ev){
    this.setState({
      urls: ev.target.value
    });
  }

  openDownloads() {
    pdfFunctions.openShell();
  }

  inputClean(){
    FileStore.cleanAll();
  }
  getPDF(){
    if (this.state.urls!='') {
      this.setState({
        working: 'Loading page'
      });
      this.state.urls.split('\n').map((url, index) => {
        pdfFunctions.toPDF(url.replace(/ /g, '')).then(() => {
          let final = this.state.arrayDomains;
          final[index].status = 1;
          this.setState({
            arrayDomains: final,
            working: '',
          });
        });
      });
      FileStore.setAll(this.state.urls);
    }
  }

  render() {
    let domains = this.state.arrayDomains.map((domain, index) => <Status title={domain.url} status={domain.status} key={index} working={this.state.working} />);
    return (
      <div id="container">
        <div className="links">
          <textarea id="urls" rows="10" onChange={this.inputChange} value={this.state.urls} className="textarea"></textarea>
        </div>
        <div className="buttons">
          <button id="pdf" disabled={this.state.working=='Loading page'} onClick={this.getPDF}>Get PDF(s)</button>
          <button onClick={this.inputClean}>Clear</button>
          
        </div>
        <div>
          <div>
            <button onClick={this.openDownloads}>Open Download Folder</button>
          </div>
          <div>
            {domains}
          </div>
        </div>
        
      </div>
    );
  }
}
