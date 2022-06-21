let input = new Array();
var lastOp = true;
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;
let answer = 0;
let userInput = "";
let enteredEnter = false;

document.addEventListener("keydown", function(e){

    e.preventDefault();
    let k = e.key;
    console.log("array at beginning of function: " + input);
    console.log("key pressed: " + k);
    console.log("registering enter: " + (k === "Enter"));
    
    if(k === "+" || k === "*" || k === "/") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input.push(userInput);
            input.push(k);
            lastOp = true;
            userInput = "";
        }
        console.log("array after adding operation: " + input);

    }
    else if(k === ".") {
        if(lastOp) {
            alert("You cannot add a decimal after an operation.");
        }
        else {
            userInput += ".";
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
            input.push(k);
            lastOp = true;
            userInput = "";
        }
    }
    else if(k === "1" || k === "2" || k === "3" || k === "4" || k === "5" || k === "6" || k === "7" || k === "8" || k === "9" || k === "0") {
        if(input[input.length-1] === ")") {
            input.push(userInput);
            input.push("*");
        }
        userInput += k;
        lastOp = false;
        console.log("array after adding number: " + input);

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
        userInput = "";
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
                userInput = "";
            }
        }
    }
    else if(k === "Enter") {
        enteredEnter = true;
        input.push(userInput);
        console.log("array after presssing enter: " + input);

        if(numCPar != numOPar) {
            alert("You do not have the same number of parenthesis.");
            //document.getElementById("input").innerHTML = input.join("");
        }
        else if(input[input.length-1] === ")") {
            answer = perform(input);
            //document.getElementById("input").innerHTML = input.join("");
            document.getElementById("output").innerHTML = answer;
            document.getElementById("warning").innerHTML = "";
            input = [answer];
            userInput = "";
        }
        else if(lastOp) {
            alert("You may not end with an operator.");
        }
        else {
            answer = perform(input);
            //document.getElementById("input").innerHTML = input.join("");
            document.getElementById("output").innerHTML = answer;
            document.getElementById("warning").innerHTML = "";
            input = [answer];
            userInput = "";
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

    document.getElementById("input").innerHTML = input.join("") + userInput;

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
    else if(input[input.length -1] === ")") {
        input.push("*");
        input.push(answer);
    }
    else {
        lastOp = false;
        input.push(n);
    }

    answer = perform(input);
    document.getElementById("input").innerHTML = input.join("");
    document.getElementById("output").innerHTML = answer;
}

function clearField() {

    lastOp = true;
    lastNum = false;
    input = [];
    result = "";
    openPar = false;
    enteredEnter = false;
    userInput = "";

    document.getElementById("input").innerHTML = input;
    document.getElementById("output").innerHTML = result;
}

function useAns() {
    if(lastOp) {
        input.push(answer);
        answer = perform(input);
        lastOp = false;
    }
    else {
        input = [answer];
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

    console.log(arr[0]);
    return arr[0];

}

function perform(input) {
    let stack = new Array();
    let nums = new Array();
    nums = [...input];
    let foundP = false;

    for(let i=0; i < nums.length; i++) {
        if(nums[i] === "(") {
            stack.push(i);
            foundP = true;
        }
        else if(nums[i] === ")") {
            idx = stack.pop() + 1;
            let patricia = MDAS(nums.slice(idx, i));
            nums.splice(idx-1, i-idx+2, patricia);
            i=idx;
        }
    }

    if(foundP == false) {
        let checking = MDAS(nums);
        console.log(checking);
        return checking;
    }

    let josh = perform(nums);
    return josh;
    
}