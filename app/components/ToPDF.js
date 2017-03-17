import React from 'react';
import Status from './Status';
import ProgressBar from './ProgressBar';
import FileStore from '../stores/FileStore';

export default class ToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: '',
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
    this.textareaOnBlur = this.textareaOnBlur.bind(this);
    this.isValidURL = this.isValidURL.bind(this);
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
      this.setState({
        pdfButtonStatus: state
      }, res);
    });
  }

  inputChange(ev){
    this.setState({
      progressBar: 0,
    });
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

  inputClean() {
    FileStore.cleanAll();
    this.setState({
      progressBar: 0,
    });
  }

  textareaOnBlur() {
    FileStore.setAll(this.removeWhitespacesAndEmptyLines(this.state.urls));
  }

  isValidURL(str) {
    let a = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
  }

  removeWhitespacesAndEmptyLines(urls) {
    return urls.split('\n').map(e=>e.replace(/ /g, '')).filter(e=>e!=='').join('\n');
  }

  getPDF() {
    document.body.classList.add('busy');
    this.setPDFButtonStatus(false);
    this.setState({
      progressBar: 0.1,
    }, () => {
      this.updateArrayDomains();
      const numberOfLineBreaks = (this.state.urls.match(/\n/g).filter(e=>this.isValidURL(e)) || []).length + 1;
      let linksDownloaded = 0;
      if (this.state.urls != '') {
        this.setState({
          working: 'Loading page'
        });

        const promises = this.state.urls.split('\n').filter(url => this.isValidURL(url)).map((url, index) => {
          return new Promise((res) => {
            pdfFunctions.toPDF(url.replace(/ /g, '')).then(() => {
              let final = this.state.arrayDomains;
              final[index].status = 1;
              linksDownloaded++;
              this.setProgressBar(linksDownloaded, numberOfLineBreaks);
              this.setState({
                arrayDomains: final,
                working: '',
              });
              res();
            });
          });
        });

        Promise.all(promises).then(() => {
          this.setPDFButtonStatus(true);
          document.body.classList.remove('busy');
          new Notification('Ready!', {
            title: 'Ready',
            body: 'Your pdfs are ready!'
          });
        });

        FileStore.setAll(this.state.urls);
      }
    });
  }

  render() {
    let domains = this.state.arrayDomains.map((domain, index) => <Status title={domain.url} status={domain.status} progressBar={this.state.progressBar} key={index} working={this.state.working} validUrl={this.isValidURL(this.state.urls.split('\n')[index])} url={this.state.urls.split('\n')[index]} />);
    return (
      <div id="container" >
        <div className="links">
          <textarea id="urls" rows="10" onBlur={this.textareaOnBlur} onChange={this.inputChange} value={this.state.urls} className="textarea"></textarea>
        </div>
        <div className="buttons unselectable">
          <button id="pdf" disabled={!this.state.pdfButtonStatus} onClick={this.getPDF}><i className="fa fa-download" aria-hidden="true"></i> Get pdf</button>
          <button onClick={this.inputClean} disabled={!this.state.pdfButtonStatus}><i className="fa fa-eraser" aria-hidden="true"></i> Clear</button>
        </div>
        <div>
          <div className="unselectable">
            <button onClick={this.openDownloads}><i className="fa fa-folder-open" aria-hidden="true"></i> Open Download Folder</button>
          </div>
          <ProgressBar value={this.state.progressBar} />
          <div className="linkStatus">
            {domains}
          </div>
        </div>
      </div>
    );
  }
}
