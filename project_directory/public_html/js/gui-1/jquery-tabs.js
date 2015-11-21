/**
 File:  js/gui-1/multi-page-v3_1.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This file contains the utility functions needed to the Jquery Tabs.
 
 Created on 11/18/15 by Thiago Goncalves 
 */


//current tab offset
var current_tab_id = 2;



//call back function to execute whem the document if fully loaded.
$(document).ready(function () {
    $("#tabs").tabs();

    // Creating the two way binding manually.
    $("#x_start").focusout(function () {
        $("#sliderXBegin").slider('value', $("#x_start").val());
        main_tab();
    });
    $("#x_end").focusout(function () {
        $("#sliderXEnd").slider('value', $("#x_end").val());
        main_tab();
    });
    $("#y_start").focusout(function () {
        $("#sliderYStart").slider('value', $("#y_start").val());
        main_tab();
    });
    $("#y_end").focusout(function () {
        $("#sliderYEnd").slider('value', $("#y_end").val());
        main_tab();
    });


    //Slider Json settings.
    $("#sliderXBegin").slider({
        range: "min",
        value: 10,
        min: 0,
        max: 15,
        slide: function (event, ui) {

            // While sliding, update the value in the  div element
            $("#x_start").val(ui.value);
            main_tab();

        }
    });
    $("#sliderXEnd").slider({
        range: "min",
        value: 10,
        min: 1,
        max: 15,
        slide: function (event, ui) {

            // While sliding, update the value in the  div element
            $("#x_end").val(ui.value);
            main_tab();

        }
    });
    $("#sliderYStart").slider({
        range: "min",
        value: 10,
        min: 0,
        max: 15,
        slide: function (event, ui) {

            // While sliding, update the value in the div element
            $("#y_start").val(ui.value);
            main_tab();

        }
    });
    $("#sliderYEnd").slider({
        range: "min",
        value: 10,
        min: 1,
        max: 15,
        slide: function (event, ui) {

            // While sliding, update the value in the div element
            $("#y_end").val(ui.value);
            main_tab();

        }
    });




    $("#form_table").submit(function (e) {
        //suppress default. 
        e.preventDefault();

        //perform jquery validation.
        if ($("#form_table").valid()) {
            $("#tabs_list_container").append(create_tab_ul());
            $("#tabs").append(create_tab_div());
            $("#tabs").tabs("refresh");
            createNewTab();
            current_tab_id++;
        }

        //do not let the page reload.
        return false;
    });
});


//Dynamic create ul.
function create_tab_ul() {

    var x_start = parseInt($("#x_start").val());
    var x_end = parseInt($("#x_end").val());
    var y_start = parseInt($("#y_start").val());
    var y_end = parseInt($("#y_end").val());
    var name = "X(" + x_start + " : " + x_end + ") Y(" + y_start + " : " + y_end + ")";

    var new_element = '<li><a href="#' + current_tab_id + '" class="li' + current_tab_id + '">' + name + '</a></li>';

    $("#edit_list").append("<li id='tab" + current_tab_id + "' class='list-group-item pointer' onclick='activate_tab(" + current_tab_id + ")'><a>" + name + "</a></li>");

    return new_element;
}

//Dynamic create containers.
function create_tab_div() {
    var new_element = '<div id="' + current_tab_id + '"></div>';
    return new_element;
}


//Dynamic create new tabs.
function createNewTab() {
    var id = current_tab_id;

    var table = $("<table class='table boxDiv' ></table>");
    var head = $("<thead></thead>");
    var body = $("<tbody></tbody>");
    table.append(head);
    table.append(body);

    //same function from Homework 5.
    multiplication(body, head);

    $("#" + id).append(table);

    $("#tabs").tabs("refresh");

}

function main_tab() {
    
        $("#tabs").tabs("option", "active");
       
        $('#tabs').tabs('select', 1);
       // alert(currentTab);
    
    
    clear_results(document.getElementById('body_content'));
    clear_results(document.getElementById('head_name'));
     $("#tabs").tabs('select', 0);
    var body = $("#body_content");
    var head = $("#head_name");

    //flag to when jquery validation beings
    var all_set = true;

    if ($("#x_start").val() === "") {
        all_set = false;
    } else if ($("#x_end").val() === "") {
        all_set = false;
    } else if ($("#y_start").val() === "") {
        all_set = false;
    } else if ($("#y_end").val() === "") {
        all_set = false;
    }

    //if true perform jquery validation.
    if (all_set) {
        if ($("#form_table").valid()) {
            multiplication(body, head);
        }

    }
}

//Delete the current selected tab using css selector

function activate_tab(index) {
    var elm = $('#tab' + index);
    if (!elm.hasClass('active')) {
        elm.toggleClass('active');
    } else {
        elm.removeClass('active');
    }
}

function remove_tabs() {

    //select array to iterate over
    var listItems = $("#edit_list li");

    //offset while iterating
    var remove_elem = 0;
    
    //iterate over the tabs
    listItems.each(function (idx, li) {
        var elm = $(li);
        
        //if element is active
        if (elm.hasClass('active')) {
            elm.remove();
            var tabindex = idx + 2;
            $('#tabs').tabs('remove', (tabindex - remove_elem));
            //increment offset
            remove_elem++;
        }
    });
}

function multiplication(body, head) {

    var x_start = parseInt($("#x_start").val());
    var x_end = parseInt($("#x_end").val());
    var y_start = parseInt($("#y_start").val());
    var y_end = parseInt($("#y_end").val());

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


