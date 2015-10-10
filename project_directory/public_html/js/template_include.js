

var currentTab;
function includeTemplate(tabName) {
    $(document).ready(function () {
        $.get("content/nav.html", function (data) {
            currentTab = tabName;
            $("#nav_bar").html(data);
            $("#" + tabName).attr('class', 'active');
        });
    });
}

function load_template(page) {
    $.get("content/"+page+".html", function (data) {
        $("#dynamic_div").html(data);
    });
}

function dynamic_nav(tabName) {
    $("#" + currentTab).removeClass("active");
    $("#" + tabName).attr('class', 'active');
    currentTab = tabName;
}

function dynamic_call(templateName) {
    dynamic_nav(templateName);
    load_template(templateName);
}
