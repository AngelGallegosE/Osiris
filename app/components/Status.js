import React from 'react';

class Status extends React.Component {
  render() {
    return (
      <div className="status unselectable"> 
        <a href="#" onClick={() => {pdfFunctions.openURL(this.props.url)}}>{this.props.title}</a> - {this.props.validUrl?<i data-tooltip='Valid Link' className="fa fa-check greenIconColor" aria-hidden="true"> </i>:<i data-tooltip='Invalid Link' className="fa fa-ban redIconColor" aria-hidden="true"> </i>} 
        <div className={this.props.progressBar!==0?this.props.status==1 ? 'greenStatus' : 'redStatus':''}></div>  
        {this.props.validUrl?this.props.working:''}
      </div>
    );
  }
}

Status.propTypes = {
  title: React.PropTypes.string,
  status: React.PropTypes.number,
  working: React.PropTypes.string,
  url: React.PropTypes.string,
  validUrl: React.PropTypes.bool,
  progressBar: React.PropTypes.number,
};

export default Status;
