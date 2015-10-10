/**
 File:  js/dynamic_json/json.js
 Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 Created on 10/3/15 by Thiago Goncalves 
 */


//The dynamic json object in which the user will be adding data to it.                                                                                                                  
var json_object;
//file in which the user can choose from. It will be changing path depending on user action.                                                                                            
/* wait until the document is fully loaded than it will load the file from the server.                                                                                                  
 NOTE, Pro. Jesse Heines version of this function has a 3rd parameter 'json' but in an external file using jquery the function will break. - Have not had the time to understand the re\
 ason.*/


//file in which the user can choose from. It will be changing path depending on user action.                                                                                            
/* wait until the document is fully loaded than it will load the file from the server.                                                                                                  
 NOTE, Pro. Jesse Heines version of this function has a 3rd parameter 'json' but in an external file using jquery the function will break. - Have not had the time to understand the re\
 ason.*/

$(document).ready(function () {
//load default file                                                                                                                                                                 
    get_file("hello_world.json");
    //user control events                                                                                                                                                         
    add_element_event();
    clear_json_event();
    choose_file_event();
});
//user control function                                                                                                                                  
function choose_file_event() {

    $("#btn_hello_world").click(function () {
        //get the property name value from this object                                                                                                   
        var file = this.value;
        get_file(file);
    });
    $("#btn_bootstrap_glyphicons").click(function () {
        //get the property name value from this object                                                                                                   
        var file = this.value;
        get_file(file);
    });
}

//load the file from the server.                                                                                                                         
function get_file(file) {
    $.get("js/dynamic_json_object/" + file, function (data) {

        //initialize the dynamic json object with the data from the json file in the server.                                                             
        json_object = data;

        //display it to the user                                                                                                                         
        display_json_object();

        json2html();

    });
}

function clear_json_event() {
    $("#btn_clear").click(function () {
//set the json object to a new object and display it.                                                                                            
        json_object = {};
        display_json_object();
        json2html();
    });
}



function add_element_event() {

    $("#btn_add_element").click(function () {

//read data from the user.                                                                                                                       
        var element_name = $("#ele_name").val();
        var boots_class = $("#classes").val();
        var rules = $("#css_rules").val();
        var text = $("#text_input").val();
        //append key + 1 to the json object.                                                                                                             
        var key = Object.keys(json_object).length;
        //json object to push into the one loaded from the server.                                                                                       
        var container = {"container": element_name,
            "class": boots_class,
            "rules": rules,
            "text": text
        };
        //append a new key with the new container.                                                                                                       
        json_object[key] = container;
        //display the new added data to the user.                                                                                                        
        display_json_object(json_object);
    });
}
//clean the container by removing all children element.                                                                                                  
function cleanOutputDiv() {
    var element = document.getElementById("json_output");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function display_json_object() {

    //convert the json object to a string format display it in the desired div container.                                                                
    $("#json_container").html(JSON.stringify(json_object));
}




function json2html() {
    cleanOutputDiv();
    var element = document.getElementById("json_output");

    //copy json object data into Element created 'li' and append it to to the container.                                                                                                 
    for (var key in json_object) {
        var tr = document.createElement("li");
        tr.setAttribute("class", "list-group-item");
        if (json_object.hasOwnProperty(key)) {
            var child = document.createElement(json_object[key].container);
            child.setAttribute("class", json_object[key].class);
            child.setAttribute("style", json_object[key].rules);
            child.innerHTML = json_object[key].text;
            tr.appendChild(child);
        }
        //add a new list item to the table element.                                                                                                                                      
        element.appendChild(tr);
    }
}         