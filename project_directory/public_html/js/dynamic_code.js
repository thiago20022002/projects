
/**
 File:  js/dynamic_code.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This is code is the user control interface with the page.
 
 Created on 10/11/15 by Thiago Goncalves 
 */


includeControl();

var node = {
    'last_element': '', // default home page
    'current_element': '' // default home page
};

//this is where the website information is stored in json format.
var web_site_information;




//looks for the json object with the given id content page.
function findInfomationByName(name_id) {
    var info = web_site_information.info;
    for (var j = 0; j < info.length; j++)
    {
        if (info[j].name === name_id) {
            if (info[j].url.length === 0) {
                findInfomationByName(node.current_element);
            }
            return info[j];
        }
    }
}

//give control to the client page.
function includeControl() {
    $(document).ready(function () {

        $.get("content/nav.html", function (data) {
            $("#nav_bar").html(data);
            $("#home").attr('class', 'active');
        });
        $.get("content/web_site_info.json", function (data) {
            web_site_information = data;
            node.last_element = findInfomationByName('home');
            node.current_element = findInfomationByName('home');
            dynamic_call(node.current_element.name);
        });

    });
}

//find the content data the user has requested and display it.
function load_content(json_object) {
    $.get(json_object.url, function (data) {
        $("#dynamic_div").html(data);
    });
}


//update the navigation bar active class.
function dynamic_nav(json_object) {
    $("#" + node.last_element.nav_id).removeClass("active");
    $("#" + json_object.nav_id).attr('class', 'active');
}


//The client control function, update the page.
function dynamic_call(name) {
    var j_object = findInfomationByName(name);
    dynamic_nav(j_object);
    load_content(j_object);
    load_file_data(j_object);
    node.last_element = node.current_element;
    node.current_element = j_object;
}


//keep tab history of the client navigation.
function load_lastTab() {
    dynamic_call(node.last_element);
}


//load the github files url and build a 'div' to interact with the client.
function load_file_data(json_object) {
    var element = document.getElementById("git_pages");
    clear_results(element);

    var file_div = create_github_div(json_object.gib_hub_url + json_object.url);
    for (var i = 0; i < json_object.files.length; i++) {
        file_div += create_github_div(json_object.gib_hub_url + json_object.files[i].file);
    }

    var htmlObject = document.createElement('div');
    htmlObject.setAttribute("class", "btn-group");
    // htmlObject.setAttribute("role", "toolbar");
    htmlObject.setAttribute("aria-label", "...");
    htmlObject.innerHTML = file_div;
    element.appendChild(htmlObject);

}


//create the div with href attribute
function create_github_div(url) {
    var context = getFileType(url);
    var div = '<a target="_blank" href="' + url + '" type="button" class="btn btn-default"><span class="bootstrap-theme fa fa-github">' + context;
    // div += "<div target='_blank' href='" + url+ "' role='group' class='btn-group btn-sm'>" + context + "</div>"; //<span class='fa fa-github'> 
    div += '</a>';
    return div;
}

//File mapping name. Check extension suffix and return a short name for the file.
function getFileType(file) {
    if (file.endsWith(".html")) {
        return ".Html";
    }
    if (file.endsWith(".json")) {
        return ".Json";
    }
    if (file.endsWith(".js")) {
        return ".JS";
    }

    return "File";
}

//remove all children from a div. Making the element empty.
function clear_results(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}