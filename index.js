var express = require("express");
var app = express();

var orm = require('./db.js');
	orm.connect();
var Row = orm.Row;


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

function playSquare(user, row, col){
		var newData = {}
		newData['space' + col] = user
	    Row.update({row_id: row}, newData, function(doc){
    });
}