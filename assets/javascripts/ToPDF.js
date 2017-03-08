window.pdfFunctions = (function(){
  return {
    toPDF: function(url){
      const remote = require('electron').remote
      const main = remote.require('./main.js')
      const phantom = require('phantom')
      let _this = this;
      async function toPDF(url) {
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
      }
    },
    getDomain: function(url){
        return url.slice(url.indexOf('//') + 2, url.indexOf('.com'))
    }     
 }
})()
   