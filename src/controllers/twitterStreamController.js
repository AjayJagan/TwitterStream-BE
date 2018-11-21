const twitterService = require('../services/twitterService');
function getTwitterStream(req,res) {
  const {initSocket} = require('./socketcontroller');
  console.log('controller')
  console.log(initSocket());
  twitterService(initSocket());
}
module.exports={
  getTwitterStream,
}