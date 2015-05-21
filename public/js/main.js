$(document).ready(function() {
    console.log('hello checkerzzz');
    $("div.piece").each(function(index, val) {
          piece = $(val);
          row = parseInt(piece.data('row'));
          col = parseInt(piece.data('col'));
          if ((index+row)%2){
            val.style.backgroundColor = 'red';
          }else{
            val.style.backgroundColor = 'black';
          }
        $(this).on('click', function(event) {

            gamePiece = $(this);
            playPiece(gamePiece.data("row"), gamePiece.data("col"));

        });
    });
});


function playPiece(row, col,success,failback) {
    var data = {
        user: 'eltahir',
        row: row,
        col: col
    };
    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: '/move',
        context: this
    }).done(function(response) {
        console.log(arguments)
        if (success)
            success(response);
    }).fail(function(response) {
        console.log(response);
        if (failback)
            failback(response);
    });
}