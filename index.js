const request = require('request');

const word = 'very';
const URL = `http://dict.youdao.com/w/eng/${word}`

request(URL,(error, response, body)=>{
  console.log('error:',error);
  console.log('statusCode:', response.statusCode);
  console.log('body:', body);
});
