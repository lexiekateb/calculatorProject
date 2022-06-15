var n1 = 0;
var n2;
var op;
var lastOp = true;
var lastNum = false;
var input = "";
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;

document.addEventListener("keydown", function(e){

    e.preventDefault();
    
    if(e.key === "+") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input += "+";
            lastOp = true;
        }
    }
    else if(e.key === "-") {
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
    else if(e.key === "/") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input += "/";
            lastOp = true;
        }
    }
    else if(e.key === "*") {

        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input += "*";
            lastOp = true;
        }
    }
    else if(e.key === ".") {
        if(lastOp) {
            alert("You must have a number before and after the decimal.");
        }
        else {
            input += ".";
            lastOp = true;
        }
    }
    else if(e.key === "1") {
        input += "1";
        lastOp = false;
    }
    else if(e.key === "2") {
        input += "2";
        lastOp = false;
    }
    else if(e.key === "3") {
        input += "3";
        lastOp = false;
    }
    else if(e.key === "4") {
        input += "4";
        lastOp = false;
    }
    else if(e.key === "5") {
        input += "5";
        lastOp = false;
    }
    else if(e.key === "6") {
        input += "6";
        lastOp = false;
    }
    else if(e.key === "7") {
        input += "7";
        lastOp = false;
    }
    else if(e.key === "8") {
        input += "8";
        lastOp = false;
    }
    else if(e.key === "9") {
        input += "9";
        lastOp = false;
    }
    else if(e.key === "0") {
        input += "0";
        lastOp = false;
    }
    else if(e.key === "Backspace") {
        input = deleteLast(input);
    }
    else if(e.key === "(") {
        if(lastOp) {
            input += "(";
            numOPar++;
        }
        else {
            input += "*";
            input += "(";
            numOPar++;
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

    evaluate(input);

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

    evaluate(input);
}

function clearField() {
    n1 = 0;
    n2;
    op;
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
        evaluate(input);
        lastOp = false;
    }
    else {
        input = result;
        lastOp = false;
        document.getElementById("input").innerHTML = input;
    }
}

function evaluate(input) {

    //splitting input into operands and operators
    let ops = input.split(/[+/*-]/).filter(Boolean);        //operands
    let oper = input.split(/[\d\.]/).filter(Boolean);       //operators

    //let arr = Array.from(input);
    //result = perform(arr);
    result = performOperation(ops, oper);

    document.getElementById("input").innerHTML = input;
    document.getElementById("output").innerHTML = result;

}

function performOperation(ops, oper) {

    let n1 = +ops[0];
    let n2 = +ops[1];
    let o = oper[0];
    let i = 1;
    let k = 0;

    while(i < ops.length) {

        if(o === "+") {
            n1 = n1 + n2;
        }
        else if(o === "-") {
            n1 = n1 - n2;
        }
        else if(o === "*") {
            n1 = n1 * n2;
        }
        else if(o === "/") {
            n1 = n1 / n2;
        } 
        i++;
        k++;
        n2 = +ops[i];
        o = oper[k];

    }

    return n1.toFixed(5);

}

function deleteLast(input) {

    input = input.slice(0, input.length - 1);
    let l = input.charAt(input.length - 1);

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