function showNumberAnime(i, j, randNum){
    var nowCell = $('#n' + i + j);
    nowCell.css('background-color', getBackground(randNum));
    nowCell.text(randNum);

    nowCell.animate({
        width: "100px",
        height: "100px",
        left: 0,
        top: 0
    }, 100);
}

function showMoveAnimate(row1, col1, row2, col2) {
    var nowCell = $('#n' + row1 + col1);
    nowCell.animate({
        left: 120 * (col2 - col1),
        top: 120 * (row2 - row1)
    }, 200);
}


function updateScore(score) {
    $('#score').text(score);
}