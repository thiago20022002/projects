
function updateResults(data) {
    var menu = document.getElementById("custom-menu");
    clear_results(menu);
    var item = getJSONObject(json_object_server, data);

    menu = $("#custom-menu");
    loop_thru(item, menu);
    //load_hover();
}

function loop_thru(json_ray, parent) {

    var syn = json_ray.synonyms;
    var ant = json_ray.antonyms;
    var data = json_ray.word_object;
    loop_json_array(syn, parent, "synonyms");
    loop_json_array(ant, parent, "antonyms");
    word_object(data, parent);
}
function loop_json_array(json_ray, parent, menu_name) {
    //menu_name;
    var ele = create_navagation(menu_name);
    for (var i in json_ray) {
        word_object(json_ray[i], ele);
    }
    parent.append(ele);
}


function word_object(json_o, div_element) {

    if (!json_o.hasOwnProperty("info")) {
        return;
    }
    var ele = create_list_item();
    var nav = create_navagation(json_o.word);
    ele.append(nav);
    word_info(json_o.info, nav);
    div_element.append(ele);
}
function word_info(json_info, parent) {
    if (!json_info.hasOwnProperty("sentimenal")) {
        return;
    }
    var data = create_data(json_info);
    parent.append(data);

}

function create_navagation(menu) {
    return $("<ul class='list-group nav_hover'>" + menu + "</ul>");
}
function create_list_item() {
    return $("<li class='list-group-item toggle'></li>");
}
function create_data(json_o) {
    return  $("<li class='list-group-item'>" + json_o.popularity + "</li><li class='list-group-item'>" + json_o.sentimenal + "</li>");
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
function isObject(what) {
    return Object.prototype.toString.call(what) === '[object Object]';
}

function getHoveredElement(event) {
    $("#editor > span:hover").each(function () {
        //  if ($(this).data("hovered")) {
        updateResults($(this).attr("data-action"));
        // }

        $("#custom-menu").finish().toggle().css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });
}



function createItem(parent, list) {

    for (var i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        console.log(list[i].word);
        li.innerHTML = list[i].word;
        parent.appendChild(li);
    }
}

function display_data() {

}

//$(document).bind("contextmenu", function (event) {
// 
// 
// 
//$(document).bind("contextmenu", function (event) {
//    getHoveredElement(event);
//    event.preventDefault();
//});

//$("#custom-menu li").click(function () {


    // This is the triggered action name

  //  updateResults($(this).attr("data-action"));
    //switch ($(this).attr("data-action")) {


    // }

    // Hide it AFTER the action was triggered
 //   $("#custom-menu").hide(100);
//});

$(".clickable-span").click(function (event) {
    console.log("here");
    getHoveredElement(event);
    event.preventDefault();
});

/*
$(document).bind("mousedown", function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents("#custom-menu").length > 0) {
        // Hide it
        $("#custom-menu").hide(100);
    }
});
*/

function load_hover() {
    if (!!('ontouchstart' in window)) {
    }
    else {
        $('.toggle[hold!="true"]').hide();
        $('.nav_hover').hover(function () {
            $(this).children('.toggle').show("fast");
        }, function () {
            $(this).children('.toggle[hold!="true"]').hide("fast");
        });
    }
}
;


function createClickableWords() {
    getSentence();
    var sentence = $('#text_input').val();
    var tokens = sentence.split(' ');

    var show_div = document.getElementById("editor");
    clear_results(show_div);
    for (var i = 0; i < tokens.length; i++) {
        console.log(tokens[i]);
        var child = document.createElement("span");
        child.setAttribute("class", "clickable-span");
        child.setAttribute("data-action", tokens[i]);
        child.innerHTML = tokens[i] + " ";
        show_div.appendChild(child);
    }
}

function getSentence()
{
    var sentence = $('#text_input').val();

    var url = "http://50.177.145.179:8080/sappyTrends/servlet?service=word_information&sentence=" + encodeURIComponent(sentence);
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&format=xml';
    $.get(yql).done(function (data) {
    //    console.log(data);
        var x = data.getElementsByTagName('body');
        json_object_server = JSON.parse(x[0].innerHTML);
           console.log(json_object_server);

    });
}


