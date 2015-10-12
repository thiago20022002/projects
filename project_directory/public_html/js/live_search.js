
$(document).ready(function () {
    keypress_live();
    focus();
});
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

function clear_results() {

    var element = document.getElementById("live_search_result");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function keypress_live() {
    $("#live_search").keypress(function (e) {
        clear_results();
        result_page($(this).val() + String.fromCharCode(e.keyCode));
    });
    $("#live_search").keydown(function (event) {
        clear_results();
        if (event.which === 13) {
            result_page($(this).val());
        } else if (event.which === 8) {
            var val = $(this).val();
            var str = val.substring(0, val.length - 1);
            result_page(str);
        }
    });
}

function create_header() {
    var element = document.getElementById("live_search_result");
    var tr = document.createElement("li");
    tr.setAttribute("class", "list-group-item");
    var s = "<div class='row'>\
                <div class='col-md-1'></div>\
                <div class='col-md-2'>Project Name</div>\
                <div class='col-md-6'>Query Result</div>\
                <div class='cold-md-2'>GitHub Project File(s)</div>\
            </div>";
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = s;
    tr.appendChild(htmlObject);
    element.appendChild(tr);

}

function display_result(string, json_object, query) {
    var element = document.getElementById("live_search_result");
    var tr = document.createElement("li");
    tr.setAttribute("class", "list-group-item");
    var dom = createHTMLObject(json_object, string, query);
    tr.appendChild(dom);
    element.appendChild(tr);
}


function focus() {
// $("#live_search").focusin(function () {
// dynamic_call('livesearch');
// });
//  $("#live_search").focusout(function () {
// load_lastTab();
//  });
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

function createHTMLObject(json_object, data, query) {
    var file_div = "";
    for (var i = 0; i < json_object.files.length; i++) {
        file_div += "<a target='_blank' href='" + json_object.gib_hub_url + json_object.files[i].file + "'> " + getFileType(json_object.files[i].file) + "</a>";
    }

    var s = "<div class='row'>\
    <div class='col-md-1'>\
        <a class='pointer' onclick='dynamic_call(\"" + json_object.name + "\")'>\
            <span class='glyphicon glyphicon-circle-arrow-right'>\
            </span>\
        </a>\
    </div>\
    <div class='col-md-2'>\
        <a class='pointer' onclick='dynamic_call(\"" + json_object.name + "\")'>\
        " + json_object.p_name + "\
        </a>\
    </div>\
    <div class='col-md-6'>" + spanHighlight(query, data) + "\
    </div>\
    <div class='cold-md-2'>\
        <a class='size20'>\
        <span class='fa fa-github'  ></span>\
         <\a>\
         <a target='_blank' href='" + json_object.gib_hub_url + json_object.url + "'>" + getFileType(json_object.url) + "</a>\
         " + file_div + "\
    </div>\
</div>";
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = s;
    return htmlObject;
}


function getFileType(file) {
    if (file.endsWith(".html")) {
        return "Html";
    }
    if (file.endsWith(".json")) {
        return "Json";
    }
    if (file.endsWith(".js")) {
        return "JS";
    }

    return "File";
}

String.prototype.endsWith = function (suffix) {
    return RegExp(suffix + "$").test(this);
}
;