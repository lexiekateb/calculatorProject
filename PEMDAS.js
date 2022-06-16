test = [1,"+","(", 1,"+", 1,")"];
solve(test);

function MDAS(arr) {
    let ans = 0;

    if(arr.length = 1) {
        return arr[0];
    }

    //checking for multiplication
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "*") {
            ans += (+arr[i-1] * +arr[i+1]);
            arr.splice(i-1, 3, ans);
        }
    }

    //checking for addition
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "+") {
            ans += (+arr[i-1] * +arr[i+1]);
            arr.splice(i-1, 3, ans);
        }
    }

    //checking for multiplication
    for(i=0; i < arr.length; i++) {
        if(arr[i] === "*") {
            ans += (+arr[i-1] * +arr[i+1]);
            arr.splice(i-1, 3, ans);
        }
    }

    return ans;

}


//insert to this function: arr = input.split();
//check the input and insert * when parenthesis:
    //touch ie (9+2)(2-1) is now (9+2)*(2-1)
    //have a number right next to it ie 2(3+4) is now 2*(3+4)


// function checkPars(arr) {
//     for(i=0; i < arr.length; i++) {
//         if(arr[i] === "(") {
//             if(arr[i-1] != null && (arr[i-1] === "1")) {
//                 arr.splice(i+1, 0, "*");
//             }
//         }
//     }
// }


function solve(arr) {
    let fopen = 0;
    let res;

    for(i=0; i < arr.length; i++) {
        if(arr[i] === "(") {
            fopen = i;
        }
    }

    for(i=fopen+1; i < arr.length; i++) {
        if(arr[i] === "(") {
            par(arr.slice(i, arr.length));
        }
        if(arr[i] === ")") {
            res = MDAS(arr.slice(fopen+1, i));
            arr.splice(fopen, i, res);
            par(arr);
        }
    }

    return MDAS(arr);

}