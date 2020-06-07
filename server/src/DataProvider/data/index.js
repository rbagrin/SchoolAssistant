const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const db = require('../../.config/db').mongoURI;

(async () => {
  try {
    
    await mongoose.connect(
        db,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

  } catch (e) {
    console.trace(e);
  }
})();

const Users = require('./models/Users.js');
const Faqs = require('./models/Faqs.js');
const News = require('./models/News.js');
const Tasks = require('./models/Tasks.js');


module.exports = {
    Users,
    Faqs,
    News,
    Tasks
}
