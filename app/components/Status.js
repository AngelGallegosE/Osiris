import React from 'react';

class Status extends React.Component {
  render() {
    return (
      <div className="status"> 
        {this.props.title} - <div className={this.props.status==1 ? 'greenStatus' : 'redStatus'}></div>  {this.props.working}
      </div>
    );
  }
}

Status.propTypes = {
  title: React.PropTypes.string,
  status: React.PropTypes.number,
  working: React.PropTypes.string
};

export default Status;
