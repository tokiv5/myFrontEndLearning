//return background color
function getBackground(num) {
    var level = Math.log2(num) - 1;
    var red = 140 - 10 * level;
    var blue = 180 - 10 * level;
    var green = 220 - 10 * level;
    return "rgb(" + red + ", " + blue + ", " + green + ")";
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++){
        for (var j = 1; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++){
        for (var j = 2; j >= 0; j--){
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--){
        for (var j = 0; j < 4; j++){
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) return true;
            }
        }
    }
    return false;
}

function noBlockHorizontal(i, k, j, board) {
    for (var m = k + 1; m < j; m++){
        if (board[i][m] != 0) return false;
    }
    return true;    
}

function noBlockVertical(i, k, j, board){
    for (var m = k + 1; m < i; m++){
        if (board[m][j] != 0) return false;
    }
    return true;
}
