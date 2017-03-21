const {shell} = require('electron');
const app = require('electron').remote.app;
const path = require('path');
const fs = require('fs');
const phantom = require('phantom');

const pathDownloads = path.join(app.getPath('downloads'), 'Osiris');

window.pdfFunctions = (function(){
  return {
    instance: null,
    toPDF: async function(url) {
      let nameFile = this.getDomain(url);
      const {instance} = this;
      const page = await instance.createPage();
      await page.property('viewportSize', {width: 1024, height: 600});
      await page.open(url);
      await page.render(path.join(pathDownloads, `${nameFile}.pdf`));
      app.addRecentDocument(path.join(pathDownloads, `${nameFile}.pdf`));
    },
    initialiceInstance: async function() {
      this.instance = await phantom.create();
    },
    destroyInstance: async function() {
      this.instance && this.instance.exit();
    },
    openShell: function() {
      shell.openExternal(`file://${pathDownloads}`);
    },
    openURL: function(link) {
      shell.openExternal(link);
    },
    setProgressBar: function(progress) {
      app.emit('setProgressBar', progress);
    },
    previewWindow: function(location) {
      location = this.getDomain(location);
      //app.emit('previewWindow', location);
      app.emit('previewWindow', `file://${pathDownloads}/${location}.pdf`);
    },
    getDomain: function (url) {
      // URL decomposition IDL attributes
      // http://w3c.github.io/html-reference/a.html
      const a = document.createElement('a');
      a.href = url;
      let final = isNaN(a.pathname.split('/').pop()) ?
        a.hostname.replace('www.', '') + '/' + a.pathname.split('/').pop() + a.search :
        a.hostname.replace('www.', '') + '/' + a.search +(a.pathname !== '/' ? a.pathname.replace(/\//g, '-') : 'index');
      return final;
    },
    readFile: async function(path) {
      const readPromise = new Promise((res) => {
        fs.readFile(path, 'utf8', (err, data) => {
          res(data);
        });
      });
      const data = await Promise.resolve(readPromise);
      return data;
    }
  };
})();
