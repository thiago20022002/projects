/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var current_tab_id = 1;

$(document).ready(function () {
    $("#tabs").tabs();
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

    $("#sliderXBegin").slider({
        range: "min",
        value: 10,
        min: 0,
        max: 15,
        slide: function (event, ui) {

            // While sliding, update the value in the #amount div element
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

            // While sliding, update the value in the #amount div element
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

            // While sliding, update the value in the #amount div element
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

            // While sliding, update the value in the #amount div element
            $("#y_end").val(ui.value);
            main_tab();

        }
    });




    $("#form_table").submit(function (e) {
        //supress default. 
        e.preventDefault();
        if ($("#form_table").valid()) {
            $("#tabs_list_container").append(create_tab_ul("TEST"));
            $("#tabs").append(create_tab_div());
            $("#tabs").tabs("refresh");
            createNewTab();
            current_tab_id++;
        }
        return false;
    });
});



function create_tab_ul() {

    var x_start = parseInt($("#x_start").val());
    var x_end = parseInt($("#x_end").val());
    var y_start = parseInt($("#y_start").val());
    var y_end = parseInt($("#y_end").val());
    var name = "X(" + x_start + " : " + x_end + ") Y(" + y_start + " : " + y_end + ")";
    var new_element = '<li><a href="#' + current_tab_id + '">' + name + '</a></li>';
    return new_element;
}

function create_tab_div() {
    var new_element = '<div id="' + current_tab_id + '"></div>';
    return new_element;
}

function createNewTab() {
    var id = current_tab_id;

    var table = $("<table class='table boxDiv' ></table>");
    var head = $("<thead></thead>");
    var body = $("<tbody></tbody>");
    table.append(head);
    table.append(body);
    multiplication(body, head);
    $("#" + id).append(table);
    $("#tabs").tabs("refresh");

}

function main_tab() {
    clear_results(document.getElementById('body_content'));
    clear_results(document.getElementById('head_name'));

    var body = $("#body_content");
    var head = $("#head_name");

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

    if (all_set) {
        if ($("#form_table").valid()) {
            multiplication(body, head);
        }

    } else {

    }

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


