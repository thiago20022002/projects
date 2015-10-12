

includeTemplate();

var node = {
    'last_element': 'home', // default home page
    'current_element': 'home' // default home page
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
            $("#" + node.current_element).attr('class', 'active');
        });
        $.get("content/web_site_info.json", function (data) {
            web_site_information = data;
            dynamic_call('home');
        });

    });
}

function load_template(page) {
    $.get(findInfomationByName(page).url, function (data) {
        $("#dynamic_div").html(data);
    });
}

function dynamic_nav(newTab) {
    var oldTab_id = findInfomationByName(node.current_element).nav_id;
    $("#" + oldTab_id).removeClass("active");
    $("#" + findInfomationByName(newTab).nav_id).attr('class', 'active');

}

function dynamic_call(newTab) {
    dynamic_nav(newTab);
    load_template(newTab);
    node.last_element = node.current_element;
    node.current_element = newTab;
}

function load_lastTab() {
    dynamic_call(node.last_element);
}
