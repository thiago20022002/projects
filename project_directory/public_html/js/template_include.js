

includeTemplate();

var node = {
    'last_element': '', // default home page
    'current_element': '' // default home page
};

var web_site_information;

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


function includeTemplate() {
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

function load_template(json_object) {
    $.get(json_object.url, function (data) {
        $("#dynamic_div").html(data);
    });
}

function dynamic_nav(json_object) {
    $("#" + node.last_element.nav_id).removeClass("active");
    $("#" + json_object.nav_id).attr('class', 'active');
}

function dynamic_call(name) {
    var j_object = findInfomationByName(name);
    dynamic_nav(j_object);
    load_template(j_object);
    load_file_data(j_object);
    node.last_element = node.current_element;
    node.current_element = j_object;
}

function load_lastTab() {
    dynamic_call(node.last_element);
}

function load_file_data(json_object) {
    var element = document.getElementById("git_pages");
    clear_results(element);
    var file_div = create_github_div(json_object.gib_hub_url+json_object.url);
    for (var i = 0; i < json_object.files.length; i++) {
        file_div += create_github_div(json_object.gib_hub_url + json_object.files[i].file);
    }
   
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = file_div;
    element.appendChild(htmlObject);

}

function create_github_div(url){
    var context = getFileType(url);
    return "<a target='_blank' href='" + url+ "'> " + context + "</a>"
}


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

function clear_results(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}