import React from 'react';
import FileStore from '../stores/FileStore';

export default class Status extends React.Component {
  render() {
    return <div> 
      {this.props.title} - <div className={this.props.status==1?"greenStatus":"redStatus"}></div>
    </div>
  }
}
