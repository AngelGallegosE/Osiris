import React from 'react';
import FileStore from '../stores/FileStore';

export default class Status extends React.Component {
  render() {
    return <div> 
      {this.props.title} - {this.props.status}
    </div>
  }
}
