/**
 File:  js/live_search.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This is client side search engine 
 that matched your query just on my website.
 
 Created on 10/11/15 by Thiago Goncalves 
 */


//give the search box functionality.
$(document).ready(function () {
    keypress_live();
});


//looks at the website json file information and search those URLs.
function result_page(str) {
    if (str.length <= 1) {
        return;
    }
    create_header();
    var info = web_site_information.info;
    for (var i = 0; i < info.length; i++)
    {
        delocalize_page_variable(info[i], str);
    }
}


//fetching the page information and matching a the search query.
function delocalize_page_variable(json_object, str) {
    $.get(json_object.url, function (data) {
        var result = $('<div/>').html(data).text().toLowerCase();
        var index = json_object.p_name.toLowerCase().search(str);
        if (index === -1) {
            index = result.search(str);
        } else {
            result = json_object.p_name.toLowerCase();
        }
        if (index !== -1) {
            display_result(fetch_sentence(result, index), json_object, str);
        }
    });
}


//This works the same as a substring. Going to update that soon.
function fetch_sentence(string, index) {
    var end = "";
    var start = "";
    var pelagrim = 50;
    var array = string.split('');
    var start_var = 0;
    for (var i = index + 1; i < array.length && i - (index + 1) < pelagrim; i++) {

        end += array[i];
    }
    for (var i = index - 1; i > -1; i--) {
        start = array[i] + start;
        if (start_var === pelagrim) {
            break;
        }
        start_var++;
    }

    return start + array[index] + end;
}



//listen to the keyboard events,
function keypress_live() {

    //any character to display 
    $("#live_search").keypress(function (e) {
        clear_results(document.getElementById("live_search_result"));
        result_page($(this).val() + String.fromCharCode(e.keyCode));
    });

    //any key pressed, even enter, backspace, delete.
    $("#live_search").keydown(function (event) {
        clear_results(document.getElementById("live_search_result"));
        if (event.which === 13) { //enter
            result_page($(this).val());
        } else if (event.which === 8) { //backspace
            var val = $(this).val();
            var str = val.substring(0, val.length - 1);
            result_page(str);
        }
    });
}


//create the hearder in the search engine. Project, Query Match, GitHub Project File(s)
function create_header() {
    var element = document.getElementById("live_search_result");
    var tr = document.createElement("li");
    tr.setAttribute("class", "list-group-item");
    var s = "<div class='row'>\
                <div class='col-md-2'>Project Name</div>\
                <div class='col-md-6'>Query Match</div>\
                <div class='cold-md-4'>GitHub Project File(s)</div>\
            </div>";
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = s;
    tr.appendChild(htmlObject);
    element.appendChild(tr);

}


//the result to display to the client is done with this function.
function display_result(string, json_object, query) {

    var element = $("#live_search_result");
    var tr = $("<li></li>");
    tr.attr("class", "list-group-item");
    var dom = createHTMLObject(json_object, string, query);
    tr.append(dom);
    element.append(tr);
}


/*
 This highligh effect all credit is given to:
 http://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript
 **/
function spanHighlight(query, data)
{
    var result = "";
    var index = data.indexOf(query);
    if (index >= 0)
    {
        result = data.substring(0, index) + "<span class='highlight'>" + data.substring(index, index + query.length) + "</span>" + data.substring(index + query.length);
    }
    return result;
}



//Search Engine dynamic html structure  
function createHTMLObject(json_object, data, query) {
    var file_div = create_github_div(json_object.gib_hub_url + json_object.url);

    for (var i = 0; i < json_object.files.length; i++) {
        file_div += create_github_div(json_object.gib_hub_url + json_object.files[i].file);
    }

    var row = create_dynamic_div("div", "row", "", "");
    
    var col_md_2_a = create_dynamic_div("div", "col-md-2", "", "");
    var col_md_6 = create_dynamic_div("div", "col-md-6", "", spanHighlight(query, data));
    var col_md_2_b = create_dynamic_div("div", "col-md-4 btn-group", "aria-label='...'", "");
    var gli_md_a_1 = create_dynamic_div("a", "pointer", "onclick='dynamic_call(\"" + json_object.name + "\")'", " " + json_object.p_name);
    
    row.append(col_md_2_a);
    row.append(col_md_6);
    row.append(col_md_2_b);
    
    col_md_2_a.append(gli_md_a_1);
    
    col_md_2_b.append($(file_div));
    return row;
}


//returns created element from the given paramenters.
function create_dynamic_div(tag, className, attr, data) {
    var str = '<' + tag + ' class="' + className + '" ' + attr + '>' + data + ' </tag>';
    return $(str);
}

// A function adding to the string prototype, if the given suffix ends with given the parameter returns a boolean.
String.prototype.endsWith = function (suffix) {
    return RegExp(suffix + "$").test(this);
};