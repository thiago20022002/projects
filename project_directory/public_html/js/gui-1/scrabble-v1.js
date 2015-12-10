
/**
 File:  js/gui-1/scrabble-v1.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This file contains the utility functions needed to the scrabble board perform.
 
 some of the  work were inspired by Jesse H. Heines.
 
 Created on 12/7/15 by Thiago Goncalves 
 */


//image dimension to be cropped out of the image.
var dimension_x = 91;
var dimension_y = 91;
var d_x = 6;
var d_y = 6;

var MAX_TILES = 7;



//Jesse Heines Data sctructure, I changed added a property to work with my program.
var ScrabbleTiles = [];
ScrabbleTiles["A"] = {"letter": "A", "value": 1, "original_distribution": 9, "number_remaining": 9};
ScrabbleTiles["B"] = {"letter": "B", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["C"] = {"letter": "C", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["D"] = {"letter": "D", "value": 2, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles["E"] = {"letter": "E", "value": 1, "original_distribution": 12, "number_remaining": 12};
ScrabbleTiles["F"] = {"letter": "F", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["G"] = {"letter": "G", "value": 2, "original_distribution": 3, "number_remaining": 3};
ScrabbleTiles["H"] = {"letter": "H", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["I"] = {"letter": "I", "value": 1, "original_distribution": 9, "number_remaining": 9};
ScrabbleTiles["J"] = {"letter": "J", "value": 8, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles["K"] = {"letter": "K", "value": 5, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles["L"] = {"letter": "L", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles["M"] = {"letter": "M", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["N"] = {"letter": "N", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles["O"] = {"letter": "O", "value": 1, "original_distribution": 8, "number_remaining": 8};
ScrabbleTiles["P"] = {"letter": "P", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["Q"] = {"letter": "Q", "value": 10, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles["R"] = {"letter": "R", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles["S"] = {"letter": "S", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles["T"] = {"letter": "T", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles["U"] = {"letter": "U", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles["V"] = {"letter": "V", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["W"] = {"letter": "W", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["X"] = {"letter": "X", "value": 8, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles["Y"] = {"letter": "Y", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles["Z"] = {"letter": "Z", "value": 10, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles["_"] = {"letter": "SPACE", "value": 0, "original_distribution": 2, "number_remaining": 2};

// data structure where I store all the words
var dictionary = {words: []};

//letter that have been drawn.
var letters_drawn = 0;


//indeces of tripple word
var tipple_word_index = [
    1, 8, 15, 106, 120, 211, 218, 225
];

//indices of tripple letter
var tipple_letter_index = [
    (15 + 6), (15 + 10),
    (75 + 2), (75 + 6), (75 + 10), (75 + 14),
    (135 + 2), (135 + 6), (135 + 10), (135 + 14),
    (195 + 6), (195 + 10)
];

//indices of double letter
var double_letter_index = [
    4, 12,
    (30 + 7), (30 + 9),
    (46), (45 + 8), (45 + 15),
    (90 + 3), (90 + 7), (90 + 9), (90 + 13),
    (105 + 4), (105 + 12),
    (120 + 3), (120 + 7), (120 + 9), (120 + 13),
    (166), (165 + 8), (165 + 15),
    (180 + 7), (180 + 9),
    (210 + 4), (210 + 12)
];

//indices of double word
var double_word_index = [
    (15 * 1 + 2), (15 * 1 + 14),
    (15 * 2 + 3), (15 * 2 + 13),
    (15 * 3 + 4), (15 * 3 + 12),
    (15 * 4 + 5), (15 * 4 + 11),
    (15 * 10 + 5), (15 * 10 + 11),
    (15 * 11 + 4), (15 * 11 + 12),
    (15 * 12 + 3), (15 * 12 + 13),
    (15 * 13 + 2), (15 * 13 + 14)
];



//Jquery droppable  function to the class file.
$(".tile").droppable({
    accept: ".droppable_element",
    drop: function (event, ui) {

        //if not occupied and is an allowed move.
        if (!isOccupied(this) && $(this).hasClass("allowed")) {

            //add ui to tile.
            $(this).append($(ui.draggable));


            $(this).addClass("occupied");
            //append it to the tile.
            $(ui.draggable).css({"left": "0px", "top": "0px"});


        }
        //game logic calculation.
        calculateAllowed();
        calculate_score();
        scoreGUI();

    }
});


function calculateAllowedTile(tile_number) {
    //loop over each tile class and recalculate allowed moves.
    $(".tile").each(function () {
        var top_ = tile_number - 15;
        var bottom_ = tile_number + 15;
        var left_ = tile_number - 1;
        var right_ = tile_number + 1;
        var cur_id = parseInt($(this).attr("id"));
        if (cur_id === top_ || cur_id === bottom_ || cur_id === left_ || cur_id === right_) {
            $(this).addClass("allowed");
        }
    });
}
function calculateAllowed() {
    //clear all allowed moves.
    $(".tile").each(function () {
        if ($(this).hasClass("allowed") && !$(this).hasClass("start")) {
            $(this).removeClass("allowed");
        }
    });
    // recalculate.
    $(".tile").each(function () {
        if (isOccupied(this)) {
            calculateAllowedTile(parseInt($(this).attr("id")));
        }
    });
}

$(document).ready(function () {

    //dynamic add attribute id to the board.
    addId();


    //give the user tiles from the deck.
    drawcard();

});

function addId() {
    var row = $("#body_content tr td div");

    var id = 1;

    row.each(function () {

        //check if the index contain in the bonus data structure. If so add bonus the tile.
        $(this).attr("id", id);
        if (id === 113) {
            $(this).addClass("allowed start");
        } else if (tipple_word_index.indexOf(id) > -1) {
            $(this).addClass("tripple_word");
        } else if (tipple_letter_index.indexOf(id) > -1) {
            $(this).addClass("tripple_letter");
        } else if (double_word_index.indexOf(id) > -1) {
            $(this).addClass("double_word");
        } else if (double_letter_index.indexOf(id) > -1) {
            $(this).addClass("double_letter");
        }
        id++;
    });

}


//not tested
function isOccupied(element) {
    if (($(element).hasClass('occupied') ? true : false)) {
        return true;
    }
    return false;
}

//calculate letter position in the image.
function getLetterPosition(letter) {
    if (letter === "_") {
        letter = "["; // ascii value 95.
    }
    //get letter A,B,C... index
    var alphabet_index = letter.charCodeAt(0) - 65;
    //get row
    var x = (alphabet_index % d_x);
    //get column
    var y = parseInt(((alphabet_index / d_y)));

    return {x: (x * dimension_x), y: (y * dimension_y)};
}

function getLetter(letter) {
    //fetch position of the letter in the image.
    var pos = getLetterPosition(letter);

    //canvas to draw on.
    var canvas = $("<canvas width='26px' height='26px'/>");


    var imageObj = new Image();
    var context = canvas.get(0).getContext('2d');
    imageObj.onload = function () {
        var sx = pos.x;
        var sy = pos.y;
        var sw = dimension_x;
        var sh = dimension_y;
        //draw the canvas by cropping the right letter out of the image.
        context.drawImage(imageObj, sx, sy, sw, sh, 0, 0, 26, 26);
    };

    imageObj.src = 'images/ScrabbleTiles4.jpg';
    return canvas;
}


function drawcard() {

    //count how many tiles in on the hand.
    var count = $("#board div").length;


    while (count < MAX_TILES) {
        //fetch json letter
        var letter = fecthJSONData();

        //get canvas of the letter.
        var canvas = getLetter(letter);

        var div = $('<div class="restricted_size ui-widget-content droppable_element display-inline" data-letter="' + letter + '"\>').append(canvas);
        //display to in the ui.
        $("#board").append(div);

        //give the div and canvas the Jquery draggable functionality.
        $(div).draggable({
            revert: function (dropped) {
                //check if element was droppable.
                var wasJustDropped = dropped && dropped[0].id == "droppable";
                //calculate moves allowed.
                calculateAllowed();

                if (wasJustDropped) {
                    return false;
                }
                return true;
            },
            start: function (event, ui) {
                //check from what location the tile is coming from.
                var parent = ui.helper.parent();
                if (isOccupied(parent)) {
                    parent.removeClass("occupied");
                }
                //recalculate moves allowed.
                calculateAllowed();
            }
        });

        count++;
    }
    //diplay letters available the user.
    guiLettersLeft();
}

function fecthJSONData() {
    //random number from 1-27.
    var rand = getRandomInt(1, (27));
    //ascii value to char
    var res = String.fromCharCode(rand + 96);

    var letter = res.toUpperCase();
    if (rand === 27) {
        letter = "_";
    }

    var letter_json = ScrabbleTiles[letter];
    //if no move remaming recall function recursively. (Not a good idea)
    if (letter_json.number_remaining === 0) {
        letters_drawn++;

        var index = ScrabbleTiles.indexOf(letter);

        if (letters_drawn === 27) {
            //ERROR - Exception not handled. fix in the next update.
        }
        return fecthJSONData();
    } else {
        letter_json.number_remaining--;
        return letter;
    }
}


function calculate_score() {
    //clear score
    dictionary.words = [];

    calculate_horizontal();
    calculate_vertical();
}

function calculate_vertical() {

    for (var i = 1; i < 16; i++) {
        var words_temp = [];

        var all_word_bonus = 1;

        for (var j = 0; j < 15; j++) {
            var id = (i + (j * 15));
            //verticals id
            var elmt = $("#" + id);

            if ($(elmt).hasClass("occupied")) {

                //fetch data from tile.
                var tile = $(elmt).children("div");

                var letter = tile.attr("data-letter");
                letter = letter.toUpperCase();
                var letter_json = ScrabbleTiles[letter];
                var bonus = 1;

                //check if tiles has bonus.
                if ($(elmt).hasClass("double_word ")) {
                    all_word_bonus = 2;
                } else if ($(elmt).hasClass("tripple_word")) {
                    all_word_bonus = 3;
                } else if ($(elmt).hasClass("double_letter")) {
                    bonus = 2;
                } else if ($(elmt).hasClass("tripple_letter")) {
                    bonus = 3;
                }

                //push in letter.
                words_temp.push({letter: letter, value: letter_json.value, tile_number: $(elmt).attr("id"), bonus: bonus, orientation: "vertical"});
            } else {

                if (words_temp.length > 1) {
                    //word is complete.
                    dictionary.words.push({"word": words_temp, "bonus": all_word_bonus});
                    all_word_bonus = 1;

                    //clear 
                    words_temp = [];
                }
            }
        }
        if (words_temp.length > 1) {
            dictionary.words.push({"word": words_temp, "bonus": all_word_bonus});
            all_word_bonus = 1;

            words_temp = [];
        }
    }
    //little hack just to get things going at first.
    if (dictionary.words.length === 0) {
        var elmt = $("#" + 113);
        if (isOccupied(elmt)) {

            var letter = tile.attr("data-letter");
            letter = letter.toUpperCase();
            var letter_json = ScrabbleTiles[letter];
            words_temp.push({letter: letter, value: letter_json.value, tile_number: $(elmt).attr("id"), bonus: bonus, orientation: "vertical"});

            dictionary.words.push({"word": words_temp, "bonus": all_word_bonus})
        }
    }

}

function calculate_horizontal() {
    var row = $("#body_content tr");

    for (var i = 0; i < row.length; i++) {
        var col = $(row[i]).children("td");
        var words_temp = [];

        var all_word_bonus = 1;
        for (var j = 0; j < col.length; j++) {
            var elmt = $(col[j]).children("div");
            //verticals words
            if ($(elmt).hasClass("occupied")) {

                //fetch json data
                var tile = $(elmt).children("div");
                var letter = tile.attr("data-letter");
                letter = letter.toUpperCase();
                var letter_json = ScrabbleTiles[letter];

                //check if tile contain bonus.
                var bonus = 1;
                if ($(elmt).hasClass("double_word")) {
                    all_word_bonus = 2;
                } else if ($(elmt).hasClass("tripple_word")) {
                    all_word_bonus = 3;
                } else if ($(elmt).hasClass("double_letter")) {
                    bonus = 2;
                } else if ($(elmt).hasClass("tripple_letter")) {
                    bonus = 3;
                }

                //push letter.
                words_temp.push({letter: letter, value: letter_json.value, tile_number: $(elmt).attr("id"), bonus: bonus, orientation: "hoziontal"});
            } else {
                if (words_temp.length > 1) {
                    //push word
                    dictionary.words.push({"word": words_temp, "bonus": all_word_bonus});
                    all_word_bonus = 1;
                }
                //clear
                words_temp = [];
            }
        }
        if (words_temp.length > 1) {
            dictionary.words.push({"word": words_temp, "bonus": all_word_bonus});
            all_word_bonus = 1;
        }
        words_temp = [];
    }
}

//function will build calculate the score and display it.
function scoreGUI() {

    var list_item = $("<li/>");
    var total_score = 0;

    //parse words that has been built into the data struture.
    for (var i = 0; i < dictionary.words.length; i++) {

        var words_collection = dictionary.words[i];
        var group = $("<ul class='board'></ul>");
        var score_list = $("<ul class='board'></ul>");
        var letter_list = $("<ul class='board'></ul>");
        var score = 0;
        //get the letter of the words and calculate their value.
        for (var j = 0; j < words_collection.word.length; j++) {

            var letter_score = (words_collection.word[j].value * words_collection.word[j].bonus);
            var letter_score_str = "";
            score += letter_score;

            if (j === words_collection.word.length - 1) {
                letter_score_str = letter_score;
            } else {
                letter_score_str = letter_score + "+";
            }
            var letter_div = $("<div class='display-inline letter-list'></div>").html(words_collection.word[j].letter);
            var score_div_temp = $("<div class='display-inline score-list'></div>").html(letter_score_str);
            letter_list.append(letter_div);
            score_list.append(score_div_temp);
        }

        group.append(letter_list);
        group.append(score_list);

        var score_div = $("<div/>").html("<div class='word-score'> word score :" + (score) + " X " + words_collection.bonus + " = " + (score * words_collection.bonus) + "</div>");
        //display it;
        score = score * words_collection.bonus;
        list_item.append(group);
        list_item.append(score_div);
        total_score += score;
    }


    var total = $("<div class='total-score'/>").html("Total : " + total_score);
    //clear previous score and update it.
    $("#score").html("");
    $("#score").append(list_item);
    $("#score").append(total);
}


//function generates random between the given range.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//functio will display the remaining letters left to the user.
function guiLettersLeft() {
    var list_group = $("#letters");
    list_group.html("");
    for (i = 0; i < Object.keys(ScrabbleTiles).length + 1; i++) {
        if (i === 26) {
            // ascii value of '_' + 65;
            i = 30;
        }

        //fetch from data structure the data.
        var data = ScrabbleTiles[String.fromCharCode(65 + i)];


        //build element to display it..
        var data_div = $("<div/>").html(data.letter + ": " + data.value + " remaining :" + data.number_remaining);
        var elmt = $("<div class='display-inline'/>").append(data_div);
        list_group.append(elmt);
    }
}

