/*
 * 
 * 
 */


/**
 * 
 * @param {type} json_object the object to look the value of the key.
 * @param {type} word the value to match the value of the key
 * @returns {undefined} the json object that mactched the word
 */

function getJSONObject(json_object, word){
    var tokens = json_object.tokens;
    for(var i = 0 ; i < tokens.length; i++){
      //  console.log(tokens[i].word.toLowerCase() + "  vs "+ word);
        if(tokens[i].word_object.word.toLowerCase() === word.toLowerCase()){
         //   console.log("---");
            return tokens[i];
        }
    }
}
function clear_results(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var json_object_server = {"tokens":[{"word_object":{"word":"today","info":{"popularity":576,"sentimenal":"+"}},"synonyms":[],"antonyms":[]},{"word_object":{"word":"is","info":{"popularity":54992,"sentimenal":"N"}},"synonyms":[],"antonyms":[{"word":"cease","info":{"pos":"verb","popularity":128,"sentimenal":"N"}},{"word":"discontinue","info":{"pos":"verb","popularity":8,"sentimenal":"N"}},{"word":"refuse","info":{"pos":"verb","popularity":124,"sentimenal":"-"}},{"word":"reject","info":{"pos":"verb","popularity":56,"sentimenal":"-"}},{"word":"forsake","info":{"pos":"verb","popularity":75,"sentimenal":"-"}},{"word":"idle","info":{"pos":"verb","popularity":83,"sentimenal":"-"}},{"word":"lose","info":{"pos":"verb","popularity":277,"sentimenal":"-"}},{"word":"pass","info":{"pos":"verb","popularity":1324,"sentimenal":"N"}},{"word":"stop","info":{"pos":"verb","popularity":516,"sentimenal":"N"}},{"word":"depart","info":{"pos":"verb","popularity":186,"sentimenal":"N"}},{"word":"go","info":{"pos":"verb","popularity":4014,"sentimenal":"+"}},{"word":"leave","info":{"pos":"verb","popularity":975,"sentimenal":"N"}},{"word":"quit","info":{"pos":"verb","popularity":165,"sentimenal":"N"}},{"word":"die","info":{"pos":"verb","popularity":719,"sentimenal":"-"}},{"word":"halt","info":{"pos":"verb","popularity":55,"sentimenal":"N"}}]},{"word_object":{"word":"a","info":{"pos":"","popularity":0,"sentimenal":"N"}},"synonyms":[],"antonyms":[]},{"word_object":{"word":"good","info":{"popularity":3708,"sentimenal":"+"}},"synonyms":[],"antonyms":[]},{"word_object":{"word":"day","info":{"popularity":3855,"sentimenal":"+"}},"synonyms":[],"antonyms":[]},{"word_object":{"word":".","info":{"pos":"","popularity":0,"sentimenal":"N"}},"synonyms":[],"antonyms":[]}]};
        