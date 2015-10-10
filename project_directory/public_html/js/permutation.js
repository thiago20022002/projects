
/**                                                                                                                                                                                     
 File:  js/permutation.js
 Thiago G Goncalves, thiago_goncalves@student.u
 This program will find the permutation rank of a any sequence.
 
 The algorithm works as follow:                       
 
 (y  nPn) / r! , where                         
 'y' is the position of the of the given character in the sorted alphabet.  
 'n' is the number of characters in the alphabet.      
 'r' is the number of repeated letter in the sequence.
 
 E ((y  nPn) / r!) , (y-1  nPn) / r!) .....  
 Created on 10/3/15 by Thiago G Goncal
 */
/* will find the index of the given value from the given array and will remove the element.*/

function getOffset(arr, value) {
    var index;
    for (index = 0; index < arr.length; index++) {
        if (arr[index] == value) {
//Element found, now removing it;                                                                                                         
            arr.splice(index, 1);
            return index;
        }
    }
    return index;
}


/*                                                                                                                                                                                      
 Will find the denominator of a permutation problem from the given array.                                                                                                              
 if the character repeats it will take the factorial of how many times it repeats and multiply.                                                                                        
 AAB = 3! / 2! (AA)                                                                                                                                                                    
 AABBB = 5! / (2!(AA) * 3!(BBB))                                                                                                                                                       
 */

function denominator(arr) {
    var fact = 1;
    var haysack = [];
    for (var index = 0; index < arr.length; index++) {
        var count = 1;
        //check if factorial of the character has not been calculated.                                                                                                                  
        if (!(haysack.indexOf(arr[index]) > -1)) {
//compare against the same array for repeation.                                                                                                                             
            for (var index2 = 0; index2 < arr.length; index2++) {
//check if characters are same in value, but not in index.                                                                                                              
                if (arr[index] == arr[index2] && index != index2) {
                    count++;
                }
            }
            fact *= factorial(count);
        }
//factorial of calculated characters                                                                                                                                            
        haysack.push(arr[index]);
    }
    return fact;
}

//Will return the factorial of the given number.                                                                                                                                        
// factorial(4) = return 24;                                                                                                                                                            
function factorial(n) {
    var e = n;
    if (e == 1 | e == 0)
        return 1;
    while (n--) {
        if (n < 1)
            break;
        e *= n;
    }
    return e
}

function findRank(word) {
//This call will clean the div arithmetic in the client side.                                                                                                                       
    arithmetic_output("clean");
    var arr_word = word.split('');
    var arr_sort = word.split('').sort();
    var coefficient = arr_word.length - 1;
    var rank = 0;
    arithmetic_output("Word : [" + arr_word + "] ,    sorted : [" + arr_sort + "]");
    //peforming a loop on each character on the given sequence.                                                                                                                         
    for (var index = 0; index < arr_word.length; index++, coefficient--) {

//this will be variable to divide on the permutation series.                                                                                                                    
        var denum = denominator(arr_sort);
        //find what character index  on the alphabetically sorted array.                                                                                                                
        var off = getOffset(arr_sort, arr_word[index]);
        //the coefficient is length of the sequence - 1, on each loop.                                                                                                                  
        var fact = factorial(coefficient);
        // nPn / r!                                                                                                                                                                     
        var solution = ((off * fact) / denum);
        //add it to the rank.                                                                                                                                                           
        var rank = rank + solution;
        //string to print the output on the div.                                                                                                                                        
        var str = arr_word[index] + " : ( " + coefficient + "! * " + off + " ) / " + denum + " = " + solution + " + " + (rank - solution) + " = " + rank + " ; remove : " + arr_word[index] + " = [" + arr_sort + "]  ";
        //sent it to output                                                                                                                                                             
        arithmetic_output(str);
    }
//final result.                                                                                                                                                                     
    arithmetic_output("Rank = " + rank + " + (" + word + ") 1" + " = " + (rank + 1));
    return rank + 1;
}


/*Function will select the desired output div and append child with the content parameter.*/
function arithmetic_output(content) {

    var element = document.getElementById("arithmetic_output");
    /*will remove all elements from the given element.*/
    if (content == "clean") {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return;
    }
//create list item element and hold on to reference to append list items.                                                                                                           
    var elmt = document.createElement("li");
    elmt.setAttribute("class", "list-group-item");
    elmt.innerText = content;
    element.appendChild(elmt);
}

//the function to be called when an action is performed by the user.                                                                                                                    
function wordRankDiv() {
    var word = document.getElementById("str_input").value;
    document.getElementById("str_input").value = "";
    var element_result = document.getElementById("word_result");
    element_result.innerText = "RANK : " + findRank(word);
    var element_value = document.getElementById("word_value");
    element_value.setAttribute("class", "label label-info");
    element_result.setAttribute("class", "label label-success");
    element_value.innerText = "INPUT : " + word;
}