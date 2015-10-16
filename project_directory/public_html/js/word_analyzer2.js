
function updateResults(data) {
    var menu = document.getElementById("custom-menu");
    clear_results(menu);
    var item = getJSONObject(json_object_server, data);
    // var li = document.createElement("li");
    menu = $("#custom-menu");
    loop_thru(item, menu);

    load_hover();


//  jsonToGui(item, $("#custom-menu"), "-");
    //
    //
//
    //
//console.log(item.word + "   " + item.antonyms + "  ---");
    // createItem(menu, item.antonyms);

    // li.innerHTML = item.synonyms;
    // menu.appendChild(li);

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
    return $("<ul class='list-group'>" + menu + "</ul>");
}
function create_list_item() {
    return $("<li class='list-group-item'></li>");
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

function getHoveredElement() {
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

$(document).bind("contextmenu", function (event) {
    // if ($('#one:hover').length !== 0) {
    getHoveredElement();
    // var data = getHoveredElement();
    event.preventDefault();

    // Show contextmenu
    //$("#custom-menu").finish().toggle().css({
    //    top: event.pageY + "px",
    //    left: event.pageX + "px"
    // });
    // }
});

/*
 $(document).bind("contextmenu", function (event) {
 // if ($('#one:hover').length !== 0) {
 updateResults('one');
 event.preventDefault();
 
 
 
 console.log("context function");
 var element = $("#custom-menu");
 var y = event.pageY - element.height() / 2;
 var x = event.pageX - element.width();
 
 
 
 //    $("<div class='custom-menu'>Custom menu</div>")
 //           .appendTo("body")
 //           .css({top: event.pageY + "px", left: event.pageX + "px"});
 
 
 $("#custom-menu").finish().toggle(100).css({
 top: event.pageY + "px;",
 left: event.pageX+ "px;"
 });
 //
 //}
 }).bind("click", function (e) {
 
 //    if (!$(e.target).parents("#custom-menu").length > 0) {
 //       $("#custom-menu").hide();
 //  }
 });
 */
$("#custom-menu li").click(function () {


    // This is the triggered action name

    updateResults($(this).attr("data-action"));
    //switch ($(this).attr("data-action")) {


    // }

    // Hide it AFTER the action was triggered
    $("#custom-menu").hide(100);
});

$(".clickable").click(function () {
    ($(this).attr("data-action"));
});


function load_hover() {
    if (!!('ontouchstart' in window)) {
    }
    else {
        $('.toggle[hold!="true"]').hide();
        $('.produktbox').hover(function () {
            $(this).children('.toggle').show("slow");
        }, function () {
            $(this).children('.toggle[hold!="true"]').hide("slow");
        });
    }
}
;


