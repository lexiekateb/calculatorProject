let input = new Array();
var lastOp = true;
var lMode = true;
var result = "";
var openPar = false;
var numOPar = 0;
var numCPar = 0;
let answer = 0;
let userInput = "";

//listens for keydown and performs mathematical operation when Enter is pressed
document.addEventListener("keydown", function(e){

    e.preventDefault();
    let k = e.key;
    

    if(k === "+" || k === "*" || k === "/") {                           //checking for operands
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else if(input[input.length - 1] === ")") {                      //if ) is last entered, add *
            input.push(k);
            lastOp = true;
        }
        else {
            input.push(userInput);
            input.push(k);
            lastOp = true;
            userInput = "";
        }
    }
    else if(k === ".") {                                                //checking decimals
        if(lastOp) {
            alert("You cannot add a decimal after an operation.");
        }
        else {
            userInput += ".";
            lastOp = true;
        }
    }
    else if(k === "-") {                                                //checking subtraction
        if(lastOp) {
            if(input[input.length - 1] === "-") {                       //if two -, then turn to + (allows for negative numbers)
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
        if(input[input.length-1] === ")") {                             //if ) is last entered, push *
            input.push("*");
        }
        userInput += k;
        lastOp = false;
    }
    else if(k === "Backspace") {                                        //checking for backspace
        input = deleteLast(input);
    }
    else if(k === "(") {                                                //checking for open parenthesis
        if(input.length == 0) {                                         //if length is 0, no need to push userInput
            input.push("(");
            lastOp = true;
            numOPar++;
        }
        else if(!lastOp) {                                              //if a number was last entered, push * before (
            input.push(userInput);
            input.push("*");
            input.push("(");
            numOPar++;
            lastOp = true;
        }
        else if (input[input.length-1] === ")") {                       //if ) is last entered, push *
            input.push("*");
            input.push("(");
            numOPar++;
            lastOp = true;
        }
        else if(lastOp) {                                               //if an operator is inputted last, no need to push userInput
            input.push("(");
            numOPar++;
        }
        else {
            input.push(userInput);
            input.push("(");
            numOPar++;
            lastOp = true;
        }
        userInput = "";
    }
    else if(k === ")") {                                                //checking for closed parenthesis
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
    else if(k === "Enter") {                                            //checking for Enter (aka perform the operation)
        input.push(userInput);
        if(numCPar != numOPar) {
            alert("You do not have the same number of parenthesis.");
        }
        else if(input[input.length-1] === ")") {                        //even if lastOp is true, if its a ), input is valid
            answer = perform(input);
            document.getElementById("output").innerHTML = answer;
            document.getElementById("warning").innerHTML = "";
            input = [];
            userInput = answer;
        }
        else if(lastOp) {
            alert("You may not end with an operator.");
        }
        else {
            answer = perform(input);
            document.getElementById("output").innerHTML = answer;
            document.getElementById("warning").innerHTML = "";
            input = [];
            userInput = answer;
        }
    }
    else {
        if(e.shiftKey) {                                                //allows for Shift + key presses
            //ignore
        }
        else {
            alert("Only numbers, parenthesis, and operands (+-/*) are valid inputs.");
        }
    }

    document.getElementById("input").innerHTML = input.join("") + userInput;    //updates input field

});

//provides functionality for buttons on the calculator
function butt(n) {
    if(n === "+" || n === "/" || n === "*") {
        if(lastOp) {
            alert("You may not enter two operations in a row.");
        }
        else {
            input.push(userInput);
            input.push(n);
            lastOp = true;
            userInput = "";
        }
    }
    else if(n === "-") {
        if(lastOp) {
            if(input[input.length - 1] === "-") {                       //if two -, then turn to + (allows for negative numbers)
                input.push(userInput);
                input = input.slice(0, input.length - 1);
                input.push("+");
            }
        }
        else {
            input.push(userInput);
            input.push(n);
            lastOp = true;
            userInput = "";
        }
    }
    else if(input[input.length -1] === ")") {
        input.push("*");
        userInput += n;
    }
    else {
        lastOp = false;
        userInput += n;
    }

    document.getElementById("input").innerHTML = input.join("") + userInput;

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
        lastOp = false;
        document.getElementById("input").innerHTML = input.join("") + userInput;
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