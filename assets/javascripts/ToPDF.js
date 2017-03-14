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

    getDomain: function (url) {
      // URL decomposition IDL attributes
      // http://w3c.github.io/html-reference/a.html
      const a = document.createElement('a');
      a.href = url;
      let final = isNaN(a.pathname.split('/').pop()) ?
        a.hostname.replace('www.', '') + '/' + a.pathname.split('/').pop() + a.search :
        a.hostname.replace('www.', '') + '/' + a.search +(a.pathname !== '/' ? a.pathname.replace(/\//g, '-') : 'index')
      return final;
    }
 }
})()
