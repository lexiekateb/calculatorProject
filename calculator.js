    function testing(input) {
        alert(input);
    }

    //will return true if the user input is valid and false if it is not
    function checkOK(input, ops, oper) {

        var regex = new RegExp(/[!@#$%^&(),;`~_='\"><?/{}\]\[]/, );
        var rex = regex.test(input);

        if(rex == true) {
            alert("The input can only contain numbers, whitespace, and operands (=-/*).");
            throw new Error("user input not valid");
        }

        //check that ops is at least 2 long and under 100 and oper is at least 1 long
        if(ops.length < 2) {
            alert("You have not entered 2 or more operands.")
            throw new Error("user input not valid");
        }
        if(ops.length > 100) {
            alert("You cannot have more than 100 operands.")
            throw new Error("user input not valid");
        }
        if(oper.length == 0) {
            alert("You must enter at least one operator.");
            throw new Error("user input not valid");
        }

        //check that there is one less operator than operand.
        if(oper.length >= ops.legnth) {
            alert("You have an invalid ratio of operators to operands.");
            throw new Error("user input not valid");
        }

    }

    //will return the solution to the user's given input
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
            else if(o == "*") {
                n1 = n1 * n2;
            }
            else if(o == "/") {
                n1 = n1 / n2;
            } 
            i++;
            k++;
            n2 = +ops[i];
            o = oper[k];

        }

        return n1.toFixed(5);

    }

    function performCalculation() {

        //taking user input from html form and removing any whitespace
        input = document.getElementById("userInput").value;
        input = input.replace(/\s/g, "");

        //splitting input into operands and operators
        let ops = input.split(/[+/*-]/).filter(Boolean);        //operands
        let oper = input.split(/[\d\.]/).filter(Boolean);       //operators

        alert(ops.length);
        alert(oper.length);
        alert(ops);
        alert(oper);

        //check that user input is valid
        let OK = checkOK(input, ops, oper);

        result = performOperation(ops, oper);

        document.getElementById("output").innerHTML = result;

    }