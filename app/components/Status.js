import React from 'react';

const Status = ({url, title, validUrl, working, status, progressBar}) => (
  <div className="status unselectable">
    <a href="#" onMouseOver={() => { }} onClick={() => { pdfFunctions.openURL(url); }}>
      {title} 
    </a> - 
    {validUrl?
      <i data-tooltip='Valid Link' className="fa fa-check greenIconColor tooltip" aria-hidden="true"> </i>:
      <i data-tooltip='Invalid Link' className="fa fa-ban redIconColor tooltip" aria-hidden="true"> </i>
    }
    <div className={progressBar!==0?status==1 ? 'greenStatus' : 'redStatus':''}></div>
    {validUrl && progressBar!==0 && status===0? 'Loading Page':''}
    {status?
      <button id='previewPdfButton' onClick={() => { pdfFunctions.previewWindow(url); }}>
        <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
      </button>
      :'' 
    }
  </div>
);

Status.propTypes = {
  title: React.PropTypes.string,
  status: React.PropTypes.number,
  working: React.PropTypes.string,
  url: React.PropTypes.string,
  validUrl: React.PropTypes.bool,
  progressBar: React.PropTypes.number,
};
export default Status;
