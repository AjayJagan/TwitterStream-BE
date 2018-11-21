const twitterStreamController = require('../controllers/twitterStreamController');

function initRoutes(app){
  app.get('/', twitterStreamController.getTwitterStream);
}

module.exports=initRoutes;

