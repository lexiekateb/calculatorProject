let input = new Array();
var lastOp = true;
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;

document.addEventListener("keydown", function(e){

    e.preventDefault();
    let k = e.key;
    
    if(k === "+" || k === "*" || k === "/" || k === ".") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input.push(k);
            lastOp = true;
        }
    }
    else if(k === "-") {
        if(lastOp) {
            if(input[input.length - 1] === "-") {
                input = input.slice(0, input.length - 1);
                input.push("+");
            }
            else {
                alert("You may not enter two operations in a row.");
            }
        }
        else {
            input.push("-");
            lastOp = true;
        }
    }
    else if(k === "1" || k === "2" || k === "3" || k === "4" || k === "5" || k === "6" || k === "7" || k === "8" || k === "9" || k === "0") {
        if(input[input.length-1] === ")") {
            input.push("*");
        }
        input.push(k);
        lastOp = false;
    }
    else if(e.key === "Backspace") {
        input = deleteLast(input);
    }
    else if(e.key === "(") {
        if(!lastOp) {
            input.push("*");
            input.push("(");
            numOPar++;
            lastOp = true;
        }
        else if (input[input.length-1] === ")") {
            input.push("*");
            input.push("(");
            numOPar++;
            lastOp = true;
        }
        else {
            input.push("(");
            numOPar++;
            lastOp = true;
        }
    }
    else if(e.key === ")") {
        if(lastOp) {
            alert("You must have a number after an operator.");
        }
        else {
            if(numOPar == 0) {
                alert("You must have an open parenthesis.");
            }
            else {
                input.push(")");
                numCPar++;
            }
        }
    }
    else {
        if(e.shiftKey) {
            //ignore
        }
        else {
            alert("Only numbers, parenthesis, and operands (+-/*) are valid inputs.");
        }
    }

    inputText = input.join("");

    document.getElementById("parTest").innerHTML = inputText;

    if(numOPar != numCPar) {
        console.log("entered if statement 1");
        document.getElementById("warning").innerHTML = "You must have the same number of open and closed parenthesis.";
        document.getElementById("input").innerHTML = inputText;
    }
    else if(lastOp == false) {
        console.log("entered if statement 2");
        res = solve(input);
        document.getElementById("input").innerHTML = inputText;
        document.getElementById("output").innerHTML = res;
    }
    else if(input[input.length-1] === ")") {
        console.log("entered if statement 3");
        res = solve(input);
        document.getElementById("input").innerHTML = inputText;
        document.getElementById("output").innerHTML = res;
    }
    else {
        document.getElementById("input").innerHTML = inputText;
        document.getElementById("warning").innerHTML = "";
    }
});

function butt(n) {
    if(n === "+" || n === "/" || n === "-" || n === "*" || n === ".") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            lastOp = true;
            input.push(n);
        }
    }
    else {
        lastOp = false;
        input.push(n);
    }

    res = solve(input);
    document.getElementById("input").innerHTML = input.join("");
    document.getElementById("output").innerHTML = res;
}

function clearField() {

    lastOp = true;
    lastNum = false;
    input = [];
    result = "";
    openPar = false;

    document.getElementById("input").innerHTML = input;
    document.getElementById("output").innerHTML = result;
}

function useAns() {
    if(lastOp) {
        input.push(result);
        evaluate(input);
        lastOp = false;
    }
    else {
        input.push(result);
        lastOp = false;
        document.getElementById("input").innerHTML = input.join("");
    }
}

function deleteLast(input) {

    input = input.slice(0, input.length - 1);
    let l = input[input.length - 1];

    console.log(l === "+" || l === "-" || l === "/" || l ==="*");

    if(l === "+" || l === "-" || l === "/" || l === "*" || l === ".") {
        lastOp = true;
    }
    else {
        lastOp = false;
    }

    return input;
}

function darkLight() {

    if(lMode) {
        document.getElementById("calcImg").src = "darkMode.png"
        lMode = false;
        document.body.className = "darkMode";
    }
    else {
        document.getElementById("calcImg").src = "lightMode.png"
        lMode = true;
        document.body.className = "lightMode";
    }

}

function MDAS(arr) {

    console.log("entered MDAS");

    let ans = 0;

    if(arr.length == 1) {
        return arr[0];
    }

    //checking for multiplication
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "*") {
            ans = (+arr[i-1] * +arr[i+1]);
            arr.splice(i-1, 3, ans);
            ans=0;
            i=0;
        }
    }

    //checking for divison
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "/") {
            ans = (+arr[i-1] / +arr[i+1]);
            arr.splice(i-1, 3, ans);
            ans=0;
            i=0;
        }
    }

    //checking for addition
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "+") {
            ans = (+arr[i-1] + +arr[i+1]);
            arr.splice(i-1, 3, ans);
            ans=0;
            i=0;
        }
    }

    //checking for subtraction
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "-") {
            ans = (+arr[i-1] - +arr[i+1]);
            arr.splice(i-1, 3, ans);
            ans=0;
            i=0;
        }
    }

    return arr[0];

}

function solve(input) {
    console.log("entered solve");
    let arr = new Array();
    arr = [...input];

    if(arr.length == 1) {
        return arr[0];
    }

    let fopen = 0;
    let res;

    for(i=0; i < arr.length; i++) {
        console.log(arr[0] === "(");
        if(arr[i] === "(") {
            console.log("identified first parenthesis");
            fopen = i;
            break;
        }
    }

    console.log("reached here 1");

    for(k = fopen + 1; k < arr.length; k++) {
        if(arr[k] === "(") {
            solve(arr.slice(k, arr.length));
        }

        console.log("reached here 2");

        if(arr[k] === ")") {
            console.log("checkpoint: checking for closed parenthesis");
            let rando = arr.slice(fopen+1, k);
            console.log(rando);
            res = MDAS(rando);
            console.log(fopen);
            console.log(k);
            arr.splice(fopen, k+1, res);
            console.log(arr);
            solve(arr);
        }
    }

    return MDAS(arr);
}