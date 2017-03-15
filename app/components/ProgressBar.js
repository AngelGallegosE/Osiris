import React from 'react';

class ProgressBar extends React.Component {
  render() {
    return (
      <div id="MainProgressBarContainer"> 
       <progress id="progressBar" value={this.props.value} max="100" className={this.props.value===0?'hidden':''}></progress>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  value: React.PropTypes.number
};

export default ProgressBar;