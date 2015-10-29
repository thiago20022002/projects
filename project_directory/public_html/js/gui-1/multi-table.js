/**
 File:  js/gui-1/multi-page.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This file contains the utility functions needed to perform pseudo form 
 processing.
 
 some of these function were inspired by Jesse H. Heines
 from 
 public_html\91.513\91.513-2009-10f\513-assn\pseudoform\formutilities.js
 Created on 10/11/15 by Thiago Goncalves 
 */


/*
 * This function will fetch the parameters from the URL
 * 
 * 
 */
function fetch_params(load) {
    

    var parameters = null;
    //if parameters were specified.
    if (location.search !== "") {
        parameters = location.search.substr(1);
    }

    if (parameters !== null && parameters !== "") {
        //split in every url parameters
        
        parameters = parameters.split("&");
        if(getPara(parameters, "x_start")[0] === undefined){
            return;
        }

        //fetch the the value from the key.
        var x_start = getPara(parameters, "x_start")[0].split("=")[1];
        var x_end = getPara(parameters, "x_end")[0].split("=")[1];

        var y_start = getPara(parameters, "y_start")[0].split("=")[1];
        var y_end = getPara(parameters, "y_end")[0].split("=")[1];


        //parse the parameters value to numbers, and call the function
        multiplication(parseInt(x_start), parseInt(y_start), parseInt(x_end), parseInt(y_end));
    }

}

//helper function to fetch the parameters.
function getPara(parameters, query) {

    var result = $.grep(parameters, function (oneString, index) {
        return (oneString.indexOf(query) !== -1);
    });
    

    return result;
}

//this function is be called by the form action, will check if the given values meets the requirements.
function validate(event) {
    clearError();
    if (validateHelper("x_start", event) || validateHelper("x_end", event) ||
            validateHelper("y_start", event) || validateHelper("y_end", event)) {
        //validation will not be processed.
        return false;
    }
    if (lessCheckerHelper("x_start", "x_end") || lessCheckerHelper("y_start", "y_end")) {
        return false;
    }

    return true;
}
function lessCheckerHelper(x, y) {
    var value_x = $("#" + x).val();
    var value_y = $("#" + y).val();

    if (isNaN(value_x)) {
        //$("#warning").html(getStringIdMap(x) + " must be a number.");
        warning(x, getStringIdMap(x) + " must be a number.");
        return true;
    }
    if (isNaN(value_y)) {
        warning(y, getStringIdMap(y) + " must be a number.");
        //$("#warning").html(getStringIdMap(y) + " must be a number.");
        return true;
    }
    if (parseInt(value_x) >= parseInt(value_y)) {
        warning(y, getStringIdMap(x) + " must be greator than " + getStringIdMap(y));
        return true;
    }


    return false;
}
function warning(id, message) {
    $("#warning").html(message);
    $('#' + id).addClass('error');
}
function clearError() {
    $('#x_start').removeClass('error');
    $('#x_end').removeClass('error');
    $('#y_start').removeClass('error');
    $('#y_end').removeClass('error');
}


//warining to be displayed to the user if the input is wrong.
function validateHelper(var_val, event) {

    var value = $("#" + var_val).val();

    if (value === "") {
        warning(var_val, getStringIdMap(var_val) + " must not be empty!");
        return true;
    }
    return false;
}

//Function that maps the id to a string to be displayed to the user.
function getStringIdMap(str) {
    switch (str) {
        case "x_start":
            return "Minimum X";
        case "x_end":
            return "Maximum X";
        case "y_start":
            return "Minimum Y";
        case "y_end":
            return "Maximum Y";
    }
}


// it will multiply the desired values and display the results.
function multiplication(x_start, y_start, x_end, y_end) {
    //place back the value
    $("#x_start").val(x_start);
    $("#x_end").val(x_end);
    $("#y_start").val(y_start);
    $("#y_end").val(y_end);

    var body = $("#body_content");
    var head = $("#head_name");

    clear_results(document.getElementById('body_content'));
    clear_results(document.getElementById('head_name'));

    var he_col = $('<tr></tr>');


    //start from the row counts
    for (var i = y_start; i <= y_end; i++) {

        var r = createRow();

        //hearder
        if (i === y_start) {
            he_col.append("<th></th>");
        }

        // append to every row the specified number of columns.
        for (var xi = x_start; xi <= x_end; xi++) {

            //header horizontal
            if (i === y_start) {
                he_col.append(createHeaderHor(xi));
            }
            //header vertical 
            if (xi === x_start) {
                r.append(createHeaderVer((i)));
            }

            //results to be displayed
            r.append(creteColumn((xi * i)));

        }

        //append to the row to the body.
        body.append(r);
    }

    //append headers to the header div.
    head.append(he_col);

}


//create row on the fly
function createRow() {
    return $('<tr></tr>');
}

//create elements on the fly with the given parameters
function createHeaderVer(data) {
    return $('<th class="grayHeader" scope="row">' + data + '</th>');
}


//create elements on the fly with the given parameters
function createHeaderHor(data) {
    return $('<th class="grayHeader">' + data + '</th>');
}

//create elements on the fly with the given parameters
function creteColumn(data) {
    return $("<td>" + data + "</td>");
}

// fetch parametes when the document is fully loaded.
$(document).ready(function () {
    fetch_params();
});
