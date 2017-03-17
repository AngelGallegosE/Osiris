const path = require('path');
const app = require('electron').remote.app;
const {shell} = require('electron');

const Vue = require('vue/dist/vue.js');

const pathDownloads = path.join(app.getPath('downloads'), 'Osiris');
const getFiles = () => {
  return new Promise((resolve) => {
    const walk = require('walk');
    let files = [];

    const walker  = walk.walk(pathDownloads, { followLinks: false });

    walker.on('file', function(root, stat, next) {
      files = [ ...files, `${root.split('/').slice(-1)}/${stat.name}`];
      next();
    });

    walker.on('end', function() {
      resolve(files.filter(file => file.endsWith('.pdf')));
    });

  });

};


const menubar = new Vue({
  el: '#menubar',
  data: {
    message: 'Hello Vue!',
    files: []
  },
  methods: {
    openFile: shell.openItem
  }
});

getFiles().then((files) => {
  menubar.files = files.map((file) => ({
    name: file,
    path: `${pathDownloads}/${file}`
  }));
});

