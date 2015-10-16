$(document).ready(function () {
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

});


function getSentence()
{
    var sentence = $('#text_input').val();
    
    var url = "http://50.177.145.179:8080/sappyTrends/servlet?service=senti_sentence&sentence=" + encodeURIComponent(sentence);
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&format=xml';
    $.get(yql).done(function (data) {
        var x = data.getElementsByTagName('body');
        //console.log(x[0].innerHTML);
         document.getElementById("dump").innerText = x[0].innerHTML;
    });
}

