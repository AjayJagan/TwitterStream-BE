const TwitterStream = require('twitter-stream-api');
const config = require('../config');

function twitterStreamService(socket) {
  try {
    const Twitter = new TwitterStream(config.keys);
    socket.on('keyword', (data)=>{
        console.log(data.keyword)
    });
    Twitter.stream('statuses/filter', { track: 'javascript' });
    Twitter.on('data', (data) => {
      socket.emit('tweet', data);
      console.log(data);
    })
  }
  catch (e) {
    console.log(e)
  }

}

module.exports = twitterStreamService;