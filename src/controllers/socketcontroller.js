const io = require("socket.io");
const Twit = require("twitter-stream-api");
const config = require("../config");
let socket,
  tweetStream = new Twit(config.keys);

const initSocket = function(server) {
  socket = io(server);

  tweetStream.stream("statuses/filter", {
    track: "javascript"
  });

  socket.on("connection", c => {
    c.on("keyword", data => {
      console.log(data.keyword);
      tweetStream.close();
      tweetStream.stream("statuses/filter", {
        track: data.keyword
      });
    });

    tweetStream.on("data", data => {
      const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      console.log("emitting tweet");
      let datestr =data.created_at.split(" ");
      let monthNum=months.indexOf(datestr[1].toLowerCase()+'');
      let date = [parseInt(datestr[5]), parseInt(monthNum), parseInt(datestr[2])]
      let tweetObject = {
        id: data.id,
        name: data.user.name,
        screenName: data.user.screen_name,
        imageURL: data.user.profile_image_url,
        tweetDate: date,
        isVerified: data.verified,
        tweetText: data.text,
        replyCount: data.reply_count,
        retweetCount: data.retweetcount
      };
      socket.emit("tweet", tweetObject);
    });
    console.log("client connected");
  });
};

module.exports = { initSocket, socket };
