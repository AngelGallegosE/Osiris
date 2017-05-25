import React from 'react';

const Status = ({url, title, validUrl, working, status, progressBar}) => (
  <li className="collection-item dismissable" onMouseOver={() => { }} onClick={() => { pdfFunctions.openURL(url); }}>
    <div>{title}
      <a href="#!" className="secondary-content">
        {validUrl?
          <i data-tooltip='Valid Link' data-position="top" className="fa fa-check greenIconColor tooltipped" aria-hidden="true"></i>:
          <i data-tooltip='Invalid Link' data-position="top" className="fa fa-ban redIconColor tooltipped" aria-hidden="true"></i>
        }
        <div className={progressBar!==0?status==1 ? 'greenStatus' : 'redStatus':''}></div>
        {validUrl && progressBar!==0 && status===0? 'Loading Page':''}
        {status?
          <button id='previewPdfButton' onClick={() => { pdfFunctions.previewWindow(url); }}>
            <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
          </button>
          :'' 
        }
      </a>
    </div>
  </li>
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
