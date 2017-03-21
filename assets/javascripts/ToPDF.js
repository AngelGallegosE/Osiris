const {shell} = require('electron');
const app = require('electron').remote.app;
const path = require('path');
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
      const status = await page.open(url);
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
    getDomain: function (url) {
      // URL decomposition IDL attributes
      // http://w3c.github.io/html-reference/a.html
      const a = document.createElement('a');
      a.href = url;
      let final = isNaN(a.pathname.split('/').pop()) ?
        a.hostname.replace('www.', '') + '/' + a.pathname.split('/').pop() + a.search :
        a.hostname.replace('www.', '') + '/' + a.search +(a.pathname !== '/' ? a.pathname.replace(/\//g, '-') : 'index');
      return final;
    }
  };
})();
