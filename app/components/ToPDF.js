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
      urls : ev.target.value
    });
  }

  getPDF(){
    this.setState({
      working: ' Loading page'
    });
    this.state.urls.split('\n').map((url,index)=>{
      pdfFunctions.getDomain(url);
      pdfFunctions.toPDF(url).then(()=>{
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

  render() {
    let domains = this.state.arrayDomains.map((domain, index) => <Status title={domain.url} status={domain.status} key={index} working={this.state.working} />);
    return (
      <div>
        <textarea id="urls" rows="10" onChange={this.inputChange} value={this.state.urls}></textarea>
        <button id="pdf" onClick={this.getPDF}>Get PDF(s)</button>
        {domains}
      </div>
    );
  }
}
