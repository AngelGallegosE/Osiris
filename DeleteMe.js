isValidURL = (str)=>{
  let a  = document.createElement('a');
  a.href = str;
  return (a.host && a.host != window.location.host);
};

let a = '   \n \n   http://www.vim.org/\nhttp://stackoverflow.com/questions/42702291/mongoose-multiple-3-level-deep-population\n\n   dd   f  '
//let b = a.split('\n').map(e=>isValidURL(e.trim()));
let b = a.split('\n').map(e=>e.trim()).filter(e=>isValidURL(e));
// console.log(a,b);

let c = a.split('\n').map(e=>e.trim()).map(isValidURL);
let d = a.split('\n').map(e=>e.replace(/ /g, '')).filter(e=>e!=='').join('\n')
console.log(c);