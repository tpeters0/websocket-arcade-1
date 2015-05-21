
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checkers');

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection_error'));

var rowSchema = mongoose.Schema({
	row_id: Number,
    space0: String,
    space1: String,
    space2: String,
    space3: String,
    space4: String,
    space5: String,
    space6: String,
    space7: String
   });

var Row = mongoose.model('Row', rowSchema);

module.exports = {
	connect: function(callback){
    db.once('open', function(){
      console.log("Connection established to: ", db.name);
      // callback();
    });
  },
  Row: Row
};