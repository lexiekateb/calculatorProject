let input = new Array();
var lastOp = true;
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;
let answer = 0;
let userInput = "";

document.addEventListener("keydown", function(e){

    e.preventDefault();
    let k = e.key;
    
    if(k === "+" || k === "*" || k === "/" || k === ".") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input.push(userInput);
            input.push(k);
            lastOp = true;
        }
    }
    else if(k === "-") {
        if(lastOp) {
            if(input[input.length - 1] === "-") {
                input.push(userInput);
                input = input.slice(0, input.length - 1);
                input.push("+");
            }
            else {
                alert("You may not enter two operations in a row.");
            }
        }
        else {
            input.push(userInput);
            input.push("-");
            lastOp = true;
        }
    }
    else if(k === "1" || k === "2" || k === "3" || k === "4" || k === "5" || k === "6" || k === "7" || k === "8" || k === "9" || k === "0") {
        if(input[input.length-1] === ")") {
            input.push(userInput);
            input.push("*");
        }
        userInput += k;
        lastOp = false;
    }
    else if(k === "Backspace") {
        input = deleteLast(input);
    }
    else if(k === "(") {
        if(!lastOp) {
            input.push(userInput);
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
            input.push(userInput);
            input.push("(");
            numOPar++;
            lastOp = true;
        }
    }
    else if(k === ")") {
        if(lastOp) {
            alert("You must have a number after an operator.");
        }
        else {
            if(numOPar == 0) {
                alert("You must have an open parenthesis.");
            }
            else {
                input.push(userInput);
                input.push(")");
                numCPar++;
            }
        }
    }
    else {
        if(e.shiftKey) {
            //ignore
        }
        else if(k = "Enter") {
            input.push(userInput);

            if(numCPar != numOPar) {
                alert("You do not have the same number of parenthesis.")
            }
            else if(input[input.length-1] === ")") {
                answer = perform(input);
                document.getElementById("input").innerHTML = input.join("");
                document.getElementById("output").innerHTML = answer;
                document.getElementById("warning").innerHTML = "";
            }
            else if(lastOp) {
                alert("You may not end with an operator.");
            }
            else {
                answer = perform(input);
                document.getElementById("input").innerHTML = input.join("");
                document.getElementById("output").innerHTML = answer;
                document.getElementById("warning").innerHTML = "";
            }
        }
        else {
            alert("Only numbers, parenthesis, and operands (+-/*) are valid inputs.");
        }
    }

    if(numCPar != numOPar) {
        document.getElementById("warning").innerHTML = "You must have the same number of open and closed parenthesis.";
        document.getElementById("input").innerHTML = input.join("") + userInput;
    }
    else if(input[input.length-1] === ")") {
        answer = perform(input);
        document.getElementById("input").innerHTML = input.join("");
        document.getElementById("output").innerHTML = answer;
        document.getElementById("warning").innerHTML = "";
    }
    else if(lastOp) {
        document.getElementById("warning").innerHTML = "You may not end with an operator.";
        document.getElementById("input").innerHTML = input.join("") + userInput;
    }
    else {
        answer = perform(input);
        document.getElementById("input").innerHTML = input.join("");
        document.getElementById("output").innerHTML = answer;
        document.getElementById("warning").innerHTML = "";
    }


    if(lastOp) {
        userInput = "";
    }



    

    // inputText = input.join("");
    // if(numOPar != numCPar) {
    //     document.getElementById("warning").innerHTML = "You must have the same number of open and closed parenthesis.";
    //     document.getElementById("input").innerHTML = inputText;
    // }
    // else if(lastOp == false) {
    //     answer = perform(input);
    //     document.getElementById("input").innerHTML = inputText;
    //     document.getElementById("output").innerHTML = answer;
    //     document.getElementById("warning").innerHTML = "";
    // }
    // else if(input[input.length-1] === ")") {
    //     answer = perform(input);
    //     document.getElementById("input").innerHTML = inputText;
    //     document.getElementById("output").innerHTML = answer;
    //     document.getElementById("warning").innerHTML = "";

    // }
    // else {
    //     document.getElementById("input").innerHTML = inputText;
    //     document.getElementById("warning").innerHTML = "";
    //     document.getElementById("warning").innerHTML = "";

    // }
});