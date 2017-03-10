import React from 'react';

class Status extends React.Component {
  render() {
    return (
      <div> 
        {this.props.title} - <div className={this.props.status==1 ? 'greenStatus' : 'redStatus'}></div>
      </div>
    );
  }
}

Status.propTypes = {
  title: React.PropTypes.string,
  status: React.PropTypes.number
};

export default Status;
