/*  File:  public_html\91.513\91.513-2009-10f\513-assn\pseudoform\formutilities.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2009 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on January 31, 2002 at 05:06 PM
 *  updated by JMH on September 3, 2009 at 11:22 AM
 *  updated by JMH on November 10, 2012 at 7:27 PM
 * 
 *  This file contains the utility functions needed to perform pseudo form 
 *  processing.
 */




function fetch_params() {

    var parameters = null;
    if (location.search !== "") {
        parameters = location.search.substr(1);
    }
    if (parameters !== null && parameters !== "") {
        parameters = parameters.split("&");

        var x_start = getPara(parameters, "x_start")[0].split("=")[1];
        var x_end = getPara(parameters, "x_end")[0].split("=")[1];

        var y_start = getPara(parameters, "y_start")[0].split("=")[1];
        var y_end = getPara(parameters, "y_end")[0].split("=")[1];

        multiplication(x_start, y_start, x_end, y_end);
    }

}
function getPara(parameters, query) {
    var result = $.grep(parameters, function (oneString, index) {
        return (oneString.indexOf(query) !== -1);
    });
    return result;
}


function multiplication(x_start, y_start, x_end, y_end) {
    var body = $("#body_content");
    clear_results(document.getElementById('body_content'));


    var head = $("#head_name");
    var he_col = head.append('<tr></tr>');
    clear_results(document.getElementById('head_name'));


    for (var xi = y_start; xi <= y_end; xi++) {
        if (xi === x_start) {
            var h = createHeader(xi, ' ');
          //  he_col.append(h);
        }
        var r = createRow(' ', ' ');
        for (var yi = x_start; yi <= x_end; yi++) {
            if (yi === (y_start)) {
           //     r.append(createHeader(xi, 'scope="row"'));
            }

            r.append(creteColumn(yi * xi));
        }

        body.append(r);
    }
}

function createRow(data) {
    return $('<tr>' + data + '</tr>');
}

function createHeader(data, attr) {
    return $('<th ' + attr + '>' + data + '</th>');
}

function creteColumn(data) {
    return $("<td>" + data + "</td>");
}

fetch_params();