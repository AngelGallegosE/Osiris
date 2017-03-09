var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var register_errors = null;

class UrlStore extends EventEmitter {
  constructor() {
    super()
    this.urls = 'http://www.vim.org/\nhttp://stackoverflow.com/questions/42702291/mongoose-multiple-3-level-deep-population'
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getRegisterErrors() {
    return register_errors;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return this.urls;
  }

  getAllUrlDomains(){
    
    //Return an array of url objects: [{url:'vim', 'status':0}, {url:'slack', status:0 }];
    return this.urls.split('\n').map((url)=> url.slice(url.indexOf('//') + 2, url.indexOf('.com'))).map(url => {
      return {'url': url,'status':0};
    });
  }
  setAll(urls) {
    this.urls = urls;
    this.emitChange();
  }
}

const urlStore = new UrlStore;
export default urlStore;