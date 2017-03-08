const remote = require('electron').remote
const main = remote.require('./main.js')
const button = document.createElement('button')
const phantom = require('phantom');

$(document).ready(() => {
  $('body').css({background:'red'})
  $('#pdf').click(()=> {
    //$('textarea#urls').html($('textarea#urls').html().trim());
    let array = $('#urls').val().split('\n').map((e)=>toPDF(e));
  })
})

async function toPDF(url){
  let progress = $()
  let nameFile = nameF(url);
  const instance = await phantom.create();
  const page = await instance.createPage();

  await page.property('viewportSize', {width: 1024, height: 600});
  const status = await page.open(url);
  console.log(`Page opened with status [${status}].`);

  console.log(nameFile)
  await page.render(`./downloads/${nameFile}.pdf`);
  await instance.exit();
}

function nameF(url) {
  return url.slice(url.indexOf('//') + 2, url.indexOf('.com'))
}
