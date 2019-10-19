let score = 0;
let startRows = 5;
let startCols = 5;
let maxRows = 9;
let maxCols = 9;
let minRows = 5;
let minCols = 5;
let numCorrectSquares = 3;
let downgradeFlag = false;
let correctClicked = 0;
let totalClicked = 0;
let totalSquares = startRows * startCols;

function generateSquares(row, columns) {
    let container = document.getElementById("squareHolder");
    container.textContent = "";
    correctClicked = 0;
    totalClicked = 0;
    updateFields();
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < columns; j++) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("onclick", "squareClick()");
            square.onclick = function() {
                squareClick(this);
            }
            container.appendChild(square);
        }
        container.appendChild(document.createElement("br"));
    }
    generateBlueSquares(numCorrectSquares);
    disableOnClick();
    setTimeout(revealAllCorrectSquares, 2000);
    setTimeout(flipHide, 4000);
    setTimeout(rotateContainer, 5500);
    setTimeout(toggleOff, 1000);
    setTimeout(enableOnClick, 6750);
}


function generateBlueSquares(numCorrectSquares) {
    let squareList = document.getElementsByClassName("square");
    let randomIndexList = [];
    while (randomIndexList.length < numCorrectSquares) {
        let r = Math.floor(Math.random() * squareList.length);
        if (randomIndexList.indexOf(r) === -1) {
            randomIndexList.push(r);
        }
    }
    console.log(randomIndexList);

    for (let i of randomIndexList) {
        squareList[i].classList.add('blue');
    }

    for (let i = 0; i < squareList.length; i++) {
        if (!squareList[i].classList.contains('blue')) {
            squareList[i].classList.add('red');
        }
    }

}

function squareClick(square) {
    let squareList = document.getElementsByClassName("square");
    let container = document.getElementById("squareHolder");


    if (square.classList.contains('blue')) {
        square.classList.remove('flipCorrect');
        square.classList.remove('flipHide');
        square.classList.remove('flipSlowCorrect');
        square.classList.add('flipCorrect');
        square.classList.remove('blue');
        correctClicked++;
        score++;
        totalClicked++;
        console.log(score);
        console.log(square.classList);
    } else if (square.classList.contains('red')) {
        downgradeFlag = true;
        square.classList.remove('flipIncorrect');
        square.classList.add('flipIncorrect');
        square.classList.remove('red');
        totalClicked++;
        subtractScore();
        console.log(score);
        console.log(square.classList);
    }

    updateFields();
    // check if all correct squares have been clicked
    if (correctClicked === numCorrectSquares && totalClicked === numCorrectSquares) {
        correctClicked = 0;
        totalClicked = 0;
        disableOnClick();
        setTimeout(levelUp, 2500);
    } else if (correctClicked === numCorrectSquares && totalClicked != numCorrectSquares) {
        correctClicked = 0;
        totalClicked = 0;
        disableOnClick();
        setTimeout(levelDown, 2500);
    } else if (totalClicked == numCorrectSquares && downgradeFlag) {
        correctClicked = 0;
        totalClicked = 0;
        disableOnClick();
        setTimeout(levelDown, 2500);
    }
}

function subtractScore() {
    if (score <= 1) {
        score = 0;
        updateFields();
        endgame();
    } else {
        score--;
    }
}

function revealAllCorrectSquares() {
    let squareList = document.getElementsByClassName("square");
    for (let square of squareList) {
        if (square.classList.contains('blue')) {
            square.classList.remove('flipSlowCorrect');
            square.classList.add('flipSlowCorrect');
        }
    }
}


function levelUp() {
    if (numCorrectSquares < startCols + 2) {
        numCorrectSquares++;
        generateSquares(startRows, startCols);
    } else if (numCorrectSquares == startCols + 2 && startCols == 9) {
        generateSquares(startRows, startCols);
    } else if (numCorrectSquares === startCols + 2) {
        startCols++;
        startRows++;
        generateSquares(startRows, startCols);
    }
}

function levelDown() {
    downgradeFlag = false;
    if (numCorrectSquares > startCols - 2) {
        numCorrectSquares--;
        generateSquares(startRows, startCols);
    } else if (numCorrectSquares == startCols - 2 && startCols == minCols) {
        generateSquares(startRows, startCols);
    } else if (numCorrectSquares === startCols - 2) {
        startRows--;
        startCols--;
        generateSquares(startRows, startRows);
    }

}

function endgame() {
    console.log('you lost');
}

function rotateContainer() {
    let container = document.getElementById("squareHolder");
    container.classList.remove('rotate');
    container.classList.add('rotate');
}

function toggleOff() {
    let container = document.getElementById("squareHolder");
    container.classList.remove('rotate');
    let squareList = document.getElementsByClassName("square");
    for (let square of squareList) {
        if (square.classList.contains('blue')) {
            square.classList.remove('flipSlowCorrect');
            square.classList.remove('flipCorrect');
            square.classList.remove('flipHide');
        } else if (square.classList.contains('red')) {
            square.classList.remove('flipIncorrect');
        }
    }
}

function flipHide() {
    let squareList = document.getElementsByClassName("square");
    for (let square of squareList) {
        if (square.classList.contains('blue')) {
            square.classList.remove('flipHide');
            square.classList.add('flipHide');
        }
    }
}

function clearBoard() {
    setTimeout(function() {
        let container = document.getElementById("squareHolder");
        container.textContent = "";
    }, 1000);
}

function updateFields() {
    let scoreHeading = document.getElementById("score");
    let blueTilesLeftHeading = document.getElementById("blueTilesLeft");
    let clicksLeftHeading = document.getElementById("clicksLeft");
    scoreHeading.textContent = scoreString + score;
    blueTilesLeftHeading.textContent = blueTilesLeftString + (numCorrectSquares - correctClicked);
    clicksLeftHeading.textContent = clicksLeftString + (numCorrectSquares - totalClicked);

}

function disableOnClick() {
    let squareList = document.getElementsByClassName("square");
    for (let square of squareList) {
        square.setAttribute('onClick', null);
    }
}

function enableOnClick() {
    let squareList = document.getElementsByClassName("square");
    for (let square of squareList) {
        square.setAttribute("onclick", "squareClick()");
        square.onclick = function() {
            squareClick(this);
        }
    }
}


generateSquares(5, 5);
