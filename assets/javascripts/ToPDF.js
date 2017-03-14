const {shell} = require('electron')
const app = require('electron').remote.app
const os = require('os');
const path = require('path');

window.pdfFunctions = (function(){
  return {
    toPDF: async function(url){
      const remote = require('electron').remote
      const main = remote.require('./main.js')
      const phantom = require('phantom')
      let _this = this;
      let progress = $()
      let nameFile = _this.getDomain(url);
      const instance = await phantom.create();
      const page = await instance.createPage();
      await page.property('viewportSize', {width: 1024, height: 600});
      const status = await page.open(url);
      console.log(`Page opened with status [${status}].`);
      console.log(nameFile)
      await page.render(`./downloads/${nameFile}.pdf`);
      await instance.exit();
    },

    getDomain: function(url){
      return url.slice(url.indexOf('//') + 2, url.indexOf('.com'))
    },
    openShell: function() {
      const pathDownloads = path.join(app.getPath('downloads'), 'Osiris');
      console.log(pathDownloads);
      shell.openExternal(`file://${pathDownloads}`);
    }
 }
})()
