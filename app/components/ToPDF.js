import React from 'react';
import Status from './Status';
import ProgressBar from './ProgressBar';
import FileStore from '../stores/FileStore';

export default class ToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      arrayDomains:[],
      working: '',
      progressBar: 0,
      pdfButtonStatus: true,
    };
    this.inputChange = this.inputChange.bind(this);
    this.getPDF = this.getPDF.bind(this);
    this.updateUrlsAndArrayDomains = this.updateUrlsAndArrayDomains.bind(this);
    this.inputClean = this.inputClean.bind(this);
    this.setProgressBar = this.setProgressBar.bind(this);
  }

  componentWillMount(){
    FileStore.addChangeListener(this.updateUrlsAndArrayDomains);
    this.setState({
      urls: FileStore.getAll(),
      arrayDomains: FileStore.getAllUrlDomains()
    });
  }

  componentWillUnmount(){
    FileStore.removeChangeListener(this.updateUrlsAndArrayDomains);
  }

  updateUrlsAndArrayDomains() {
    return new Promise((res) => {
      this.setState({
        urls: FileStore.getAll(),
        arrayDomains: FileStore.getAllUrlDomains(),
      }, res);
    });
  }
  updateArrayDomains(){
    return new Promise((res) =>{
      this.setState({
        arrayDomains: FileStore.getAllUrlDomains(),
      }, res);
    });
  }
  setPDFButtonStatus(state){
    return new Promise((res) =>{
      //console.log('State: '+state);
      this.setState({
        pdfButtonStatus: state
      }, res);
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

  setProgressBar(linksDownloaded, total) {
    this.setState({
      progressBar: (linksDownloaded/total*100)
    });
  }

  inputClean(){
    FileStore.cleanAll();
    this.setState({
      progressBar: 0,
    });
  }
  getPDF() {
    this.setState({
      progressBar: 0.1,
    });
    this.setPDFButtonStatus(false)
      .then(this.updateArrayDomains())
      .then(() => {
        console.log('Get PDF :'+this.state.pdfButtonStatus);
        const numberOfLineBreaks = (this.state.urls.match(/\n/g) || []).length + 1;
        let linksDownloaded = 0;
        if (this.state.urls != '') {
          this.setState({
            working: 'Loading page'
          });
          this.state.urls.split('\n').map((url, index) => {
            pdfFunctions.toPDF(url.replace(/ /g, '')).then(() => {
              let final = this.state.arrayDomains;
              final[index].status = 1;
              linksDownloaded++;
              this.setProgressBar(linksDownloaded, numberOfLineBreaks);
              this.setState({
                arrayDomains: final,
                working: '',
              });
            });
          });
          FileStore.setAll(this.state.urls);
        }
      })
      .then(this.setPDFButtonStatus(true))
      .then(()=>{
        console.log('Get PDF :'+this.state.pdfButtonStatus);
      });
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
          <ProgressBar value={this.state.progressBar} />
          <div>
            {domains}
          </div>
        </div>
        
      </div>
    );
  }
}
