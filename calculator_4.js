let input = "";
var lastOp = true;
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;

document.addEventListener("keydown", function(e){

    e.preventDefault();
    let k = e.key;
    console.log(e.key);
    
    if(k === "+" || k === "*" || k === "/" || k === ".") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input += k;
            lastOp = true;
        }
    }
    else if(k === "-") {
        if(lastOp) {
            if(input.charAt(input.length - 1) === "-") {
                input = input.slice(0, input.length - 1);
                input += "+";
            }
            else {
                alert("You may not enter two operations in a row.");
            }
        }
        else {
            input += "-";
            lastOp = true;
        }
    }
    else if(k === "1" || k === "2" || k === "3" || k === "4" || k === "5" || k === "6" || k === "7" || k === "8" || k === "9" || k === "0") {
        if(input.charAt(input.length - 1) === ")") {
            input += "*";
        }
        
        input += k;
        lastOp = false;
    }
    else if(e.key === "Backspace") {
        input = deleteLast(input);
    }
    else if(e.key === "(") {
        if(!lastOp) {
            input += "*";
            input += "(";
            numOPar++;
            lastOp = true;
        }
        else if (input[input.length-1] === ")") {
            input += "*";
            input += "(";
            numOPar++;
            lastOp = true;
        }
        else {
            input += "(";
            numOPar++;
            lastOp = true;
        }
    }
    else if(e.key === ")") {
        if(lastOp) {
            alert("You must have a number after an operator.");
        }
        else {
            if(numOPar = 0) {
                alert("You must have an open parenthesis.");
            }
            else {
                input += ")";
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

    if(numOPar != numCPar) {
        document.getElementById("warning").innerHTML = "You must have the same number of open and closed parenthesis.";
        document.getElementById("input").innerHTML = input;
    }
    else {
        solve(input);
    }
});

function butt(n) {
    if(n === "+" || n === "/" || n === "-" || n === "*" || n === ".") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            lastOp = true;
            input += n;
        }
    }
    else {
        lastOp = false;
        input += n;
    }

    solve(input);
}

function clearField() {

    lastOp = true;
    lastNum = false;
    input = "";
    result = "";
    openPar = false;

    document.getElementById("input").innerHTML = input;
    document.getElementById("output").innerHTML = result;
}

function useAns() {
    if(lastOp) {
        input += result;
        solve(input);
        lastOp = false;
    }
    else {
        input = result;
        lastOp = false;
        document.getElementById("input").innerHTML = result;
    }
}

function deleteLast(input) {

    input = input.slice(0, input.length - 1);
    let l = input.charAt(input.length - 1);

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
    let ans = 0;

    if(arr.length == 1) {
        return arr[0];
    }

    //checking for multiplication
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "*") {
            console.log(arr);
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
            console.log("hi im in the / loop");
            console.log(arr);
            ans = (+arr[i-1] + +arr[i+1]);
            arr.splice(i-1, 3, ans);
            console.log(arr);
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

    console.log(arr[0]);
    return arr[0];

}

function solve(input) {
    let arr = new Array();
    arr = input.split("");
    console.log(arr);

    let fopen = 0;
    let res;

    for(i=0; i < arr.length; i++) {
        if(arr[i] === "(") {
            fopen = i;
            break;
        }
    }

    for(i=fopen+1; i < arr.length; i++) {
        if(arr[i] === "(") {
            solve(arr.slice(i, arr.length));
        }
        if(arr[i] === ")") {
            res = MDAS(arr.slice(fopen+1, i));
            arr.splice(fopen, i, res);
            solve(arr);
        }
    }

    console.log("checkpoint 1");
    let result = MDAS(arr);

    document.getElementById("input").innerHTML = input;
    document.getElementById("output").innerHTML = result;
    document.getElementById("warning").innerHTML = "";
}