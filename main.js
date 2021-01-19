var board = new Array();
var score = 0;
var conflict = new Array();

$(document).ready(function(){
    newgame();
});

function newgame(){
    init();
    //random generate number
    randomGen();
    randomGen();
}

function init() {
    //initial value of different grids
    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        conflict[i] = new Array();
        for(var j = 0; j < 4; j++){
            var cell = $("#g" + i + j);
            cell.css('left', 20 + 120 * j);
            cell.css('top', 20 + 120 * i);
            board[i][j] = 0;
            conflict[i][j] = false;
        }
    }

    //define tht position of grids
    updateBoard();
}

//update the numbers on the board
function updateBoard(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            conflict[i][j] = false;
            $('#g' + i + j).append('<div class = "number-cell" id = "n' + i + j + '"></div>');
            var nowCell = $('#n' + i + j);
            //invisible when 0
            if (board[i][j] == 0) {
                nowCell.css('width', 0);
                nowCell.css('height', 0);
                nowCell.css('left', '50px');
                nowCell.css('top', '50px');
            }
            //show contents
            else{
                nowCell.css('width', '100px');
                nowCell.css('height', '100px');
                nowCell.css('background-color', getBackground(board[i][j]));
                nowCell.text(board[i][j]);
                nowCell.css('left', 0);
                nowCell.css('top', 0);
                if (board[i][j] > 1000) {
                    nowCell.css('font-size', '40px');
                }
            }
        }
    }
}


//find all feasible grids
function updateFeasible(board){
    var feasible = new Array();
    var index = 0;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if (board[i][j] == 0) {
                feasible[index] = 4 * i + j;
                index++;
            }
        }
    }
    return feasible;
}

function randomGen() {
    var feasibleList = updateFeasible(board);
    if(feasibleList.length == 0){
        return false;
    }
    //random position
    var rand = feasibleList[parseInt(Math.random() * feasibleList.length)];
    var randx = rand % 4;
    var randy = parseInt(rand / 4);

    var randNum = Math.random() < 0.5 ? 2: 4;
    board[randy][randx] = randNum;
    //update board with animation
    showNumberAnime(randy, randx, randNum);
    return true;
}

$(document).keydown(function(event) { 
    switch (event.keyCode) {
        case 37: //left
            if(moveLeft()){
                setTimeout("randomGen()", 300);
                //randomGen();
                isOver();
            }
            break;

        case 38: //up
            if(moveUp()){
                setTimeout("randomGen()", 300);
                //randomGen();
                isOver();
            }
            break;

        case 39: //right
            if(moveRight()){
                setTimeout("randomGen()", 300);
                //randomGen();
                isOver();
            }
            break;

        case 40: //down
            if(moveDown()){
                setTimeout("randomGen()", 300);
                //randomGen();
                isOver();
            }
            break;
    
        default:
            break;
    }
});

function isOver() {
    if (!canMoveLeft(board) && !canMoveRight(board) && !canMoveUp(board) && !canMoveDown(board)) {
        gameOver();
    }
}

function gameOver(){
    alert("Game over!");
}


function moveLeft(){
    if(!canMoveLeft(board)) return false;
    //move left
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if (board[i][j] != 0) {
                for(var k = 0; k < j; k++){
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !conflict[i][k]){
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][k] * 2;
                        board[i][j] = 0;
                        conflict[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)) return false;
    //move left
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            if (board[i][j] != 0) {
                for(var k = 3; k > j; k--){
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !conflict[i][k]){
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][k] * 2;
                        board[i][j] = 0;
                        conflict[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)) return false;
    //move up
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                for(var k = 0; k < i; k++){
                    if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !conflict[k][j]){
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[k][j] * 2;
                        board[i][j] = 0;
                        conflict[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)) return false;
    //move down
    for(var i = 2; i >= 0; i--){
        for(var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                for(var k = 3; k > i; k--){
                    if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !conflict[k][j]){
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[k][j] * 2;
                        board[i][j] = 0;
                        conflict[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    setTimeout("updateBoard()", 200);
    return true;
}
