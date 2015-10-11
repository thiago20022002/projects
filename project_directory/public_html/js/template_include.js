

includeTemplate();

var node = {
    'last_element': 'home', // default home page
    'current_element': 'home' // default home page
};

var web_site_information = {
    'info': [
        {
            'name': 'home',
            'url': 'content/home.html',
            'p_name': 'Home page',
            'nav_id': 'home',
            'gib_hub_url' : "https://github.com/thiago20022002/projects/blob/gh-pages/project_directory/public_html/content/home.html"
            
        },
        {
            'name': 'solutions',
            'url': 'content/solutions.html',
            'p_name': 'permutation project',
            'nav_id': 'drop_bar',
            'gib_hub_url' : "https://github.com/thiago20022002/projects/blob/gh-pages/project_directory/public_html/content/solutions.html"
        },
        {
            'name': 'json2html',
            'url': 'content/json2html.html',
            'p_name': 'Dynamic Json Data',
            'nav_id': 'drop_bar',
            'gib_hub_url' : "https://github.com/thiago20022002/projects/blob/gh-pages/project_directory/public_html/content/json2html.html"

        },
        {
            'name': 'sappytrends',
            'url': 'content/sappytrends.html',
            'p_name': 'Sappy Trends',
            'nav_id': 'drop_bar',
            'gib_hub_url' : "https://github.com/thiago20022002/projects/blob/gh-pages/project_directory/public_html/content/sappytrends.html"

        },
        {
            'name': 'mic1',
            'url': 'content/mic1emulator.html',
            'p_name': 'Mic-1 Emulator',
            'nav_id': 'drop_bar',
            'gib_hub_url' : "https://github.com/thiago20022002/projects/blob/gh-pages/project_directory/public_html/content/mic1emulator.html"

        }
////,
     //   {
     //       'name': 'livesearch',
     //       'url': '',
     //       'p_name': 'Website search Engine'
     //   }
    ]
};

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
        
        dynamic_call('home');
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
