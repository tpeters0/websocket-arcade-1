var express = require("express");
var app = express();
var bodyParser = require("body-parser")


var orm = require('./db.js');
	orm.connect();
var Row = orm.Row;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get("/:move?", function(req,res){
	var move = req.params.move
	if(move){
		var data = move.split("_")
		playSquare(data[0], data[1], data[2])
	}

    res.render('index');
});
app.post('/move', function(req,res){
  if(!req.body.user || !req.body.row || !req.body.col){
    res.send("Error: [oid, name] are required.  Found: '" + Object.keys(req.body) + "'");
    return;
  }
  playSquare(req.body.user,req.body.row, req.body.col, function(err,data){
     if(err){
      console.error('Error Saving', err);
      res.send('Error saving');
    }else{
      res.send(data);
    }
  })
});

app.listen(3000, function(){
  console.log("listening on 3000");
  newGame();
});

function newGame(){
    Row.collection.remove();
    for(x = 0; x < 8; x++){
      new Row({row_id: x, space0: "", space1: "", space2: "", space3: "", space4: "", space5: "", space6: "", space7: ""}).save();
    };
};

function playSquare(user, row, col,callback){
		var newData = {}
		newData['space' + col] = user
	    Row.update({row_id: row}, newData,callback);
}