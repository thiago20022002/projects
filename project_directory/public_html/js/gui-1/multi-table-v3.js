
var tblInitializer = {
    // helper function for parameter initialization
    // note that to transfer the local value to the Utils member variable, we must use
    //    associative array syntax with square brackets because the name of the variable
    //    to be initialized is expressed as a string
    // updated by JMH on November 3, 2012 at 1:05 PM
    "initializeHelper": function (strVarToInitialize) {
        var str = getField(strVarToInitialize);
        if (str !== null) {
            var n = parseInt(str, 10);
            if (!isNaN(n)) {
                tblGenerator[strVarToInitialize] = n;
            }
        }

        // added in Version 2
        $('#' + strVarToInitialize).val(tblGenerator[ strVarToInitialize ]);

        // added in Version 9 to initialize the sliders to the passed values
        // updated by JMH on November 26, 2012 at 9:05 PM
        var strSliderID = "#slider" + strVarToInitialize[0].toUpperCase() + strVarToInitialize.substr(1);
        $(strSliderID).slider("value", parseInt(str));

        // bind changes in text fields to sliders
        $('#' + strVarToInitialize).blur(function () {
            // console.log( '#' + strVarToInitialize + " lost focus, slider is " + strSliderID ) ;
            $(strSliderID).slider("value", parseInt($('#' + strVarToInitialize).val()));
        });

        // prevent text field from getting focus by trapping focus to the field
        //    and instead switching focus to the A (anchor) tag in the slider DIV
        // this technique was developed by examining the slider structure in the Firebug HTML tab
        // also note that the text fields cannot be disabled, because if they are their values
        //    are not passed when the form is submitted
        // $( '#' + strVarToInitialize ).focus( function() {
        //   $( strSliderID + " a" ).focus() ;
        // } ) ;
    },
    // get passed parameters
    "initialize": function () {
        tblInitializer.initializeHelper("xBegin");
        tblInitializer.initializeHelper("xEnd");
        tblInitializer.initializeHelper("yBegin");
        tblInitializer.initializeHelper("yEnd");
    }
};

var tblValidator = {   // added in Version 4

    // surround an erroneous error field with a red border
    highlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": "2px solid red"});
        $('#' + strVarToTest).focus();
    },
    // remove the red border around an erroneous error field
    unhighlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": ""});
    },
    // check that a parameter exist, is not an empty string, and is not NaN
    // this function is not used in Version 8 -- it is replaced by functionality 
    //    in the Validation plugin
    validateFormHelper: function (strVarToTest, strParamDesc) {
        var str = $('#' + strVarToTest).val();
        if (str === null) {
            tblValidator.highlightError(strVarToTest);
            return strParamDesc + " does not exist.";
        } else if (str === "") {
            tblValidator.highlightError(strVarToTest);
            return strParamDesc + " was not supplied.";
        } else if (isNaN(parseInt(str, 10))) {
            tblValidator.highlightError(strVarToTest);
            return strParamDesc + " is not a number.";
        }
        $('#' + strVarToTest).css({"border": ""});
        return "OK";
    },
    // called when the form is submitted to check the validity of each parameter
    // this function is not used in Version 8 -- it is replaced by functionality 
    //    in the Validation plugin
    validateForm: function () {
        // http://stackoverflow.com/questions/4079274/how-to-get-an-objects-properties-in-javascript-jquery
        // var v = $('#frm').validate() ;
        // for ( var key in v ) {
        //   console.log( "key = " + key + ", value = " + v[key] ) ;
        // }

        var str;   // helper function return value
        if ((str = tblValidator.validateFormHelper("xBegin", "Minimum Column Value")) !== "OK" ||
                (str = tblValidator.validateFormHelper("xEnd", "Maximum Column Value")) !== "OK" ||
                (str = tblValidator.validateFormHelper("yBegin", "Minimum Row Value")) !== "OK" ||
                (str = tblValidator.validateFormHelper("yEnd", "Maximum Row Value")) !== "OK") {
            $('#msg').html(str);
            return false;
        }
        return true;
    }

}; // tblValidator



// this function is executed after the body has finished loading
$(document).ready(function () {

    //// added in Version 9
    // slider setup
    // note that this setup must be performed before the table initializer is called,
    //    because the initializer reads and sets the field values
    var sliderOpts = {
        min: -10,
        max: 10,
        // value : 0 ,
        slide: function (e, ui) {

            //// the following code displays all the properties of object e
            // var msg = "" ;
            // for ( var key in e ) {
            //   msg += "key = " + key + ", value = " + e[key] + "<br>" ;
            // }
            // $('#msg').html( msg ) ;

            // set the input field value to the new slider value
            var strInputID = "#" + e.target.id.substr(6, 1).toLowerCase() + e.target.id.substr(7);
            $(strInputID).val(ui.value);

            // remove and regenerate the table when the slider is changed
            $('#tbl1').remove();
            tblGenerator.xBegin = parseInt($('#xBegin').val());
            tblGenerator.xEnd = parseInt($('#xEnd').val());
            tblGenerator.yBegin = parseInt($('#yBegin').val());
            tblGenerator.yEnd = parseInt($('#yEnd').val());
            tblGenerator.populateMultiplicationTable_jQuery("#placeholder", true, true);
        }
    };
    $('#sliderXBegin').slider(sliderOpts);
    $('#sliderXEnd').slider(sliderOpts);
    $('#sliderYBegin').slider(sliderOpts);
    $('#sliderYEnd').slider(sliderOpts);

    // initialize the table from the passed values
    tblInitializer.initialize();




    // complete initialization as in previous versions
    $('#h2Title').html($('#h2Title').html() + " " + JMHTable.strThisVersion);
    $('head title').html($('head title').html() + " " + JMHTable.strThisVersion);

    // function populateMultiplicationTable_jQuery parameters:
    //    idAppendTableTo         id to append the multiplication table to
    //    bAddCommas              true = add commas to numbers > 999
    //    bHandleSwitchedValues   true = print column heads in descending order if xBegin > xEnd,
    tblGenerator.populateMultiplicationTable_jQuery("#placeholder", true, true);

    // additional initialization added in Version 9
    // updated by JMH on November 27, 2012 at 12:02 PM
    $('#sliderXBegin').slider("value", parseInt($('#xBegin').val()));
    $('#sliderXEnd').slider("value", parseInt($('#xEnd').val()));
    $('#sliderYBegin').slider("value", parseInt($('#yBegin').val()));
    $('#sliderYEnd').slider("value", parseInt($('#yEnd').val()));

    // this function is executed when the form is submitted
    $('#frm').submit(function () {  // revised in Version 6

        // the following statement was added in Version 8 to eliminate the switching
        // instead, this version changes the table generation algorithm so that it
        //    prints from high to low if the numbers are reversed        
        if (true)
            return true;

        // the statements below were added in Version 6 to switch any parameters for
        //    which the minimum was greater than the maximum
        if (parseInt($('#xBegin').val(), 10) > parseInt($('#xEnd').val(), 10)) {
            // console.log( "switching x" ) ;
            var temp = $('#xBegin').val();
            $('#xBegin').val($('#xEnd').val());
            $('#xEnd').val(temp);
        }
        if (parseInt($('#yBegin').val(), 10) > parseInt($('#yEnd').val(), 10)) {
            // console.log( "switching y" ) ;
            var temp = $('#yBegin').val();
            $('#yBegin').val($('#yEnd').val());
            $('#yEnd').val(temp);
        }
        // console.log( $('#xBegin').val() + " " + $('#xEnd').val() + " " + 
        //     $('#yBegin').val() + " " + $('#yEnd').val() ) ; 

        return true;
    });

    // this function breaks an error message into two lines if necessary to keep
    //    the fieldset from getting too large
    function formatErrMsg(str) {
        // console.log( str.length + " -> " + str ) ;
        if (str.length > 30) {
            var pos = 31;
            while (pos > 0 && str[pos] != " ") {
                pos--;
            }
            if (pos != 0) {
                str = str.substr(0, pos) + "<br> &nbsp;" + str.substr(pos);
            }
        }
        // console.log( "   -> " + str ) ;
        return "<br>" + str;
    }

    // validation rules
    // note that requiring digits overrides requiring a number, so don't use both
    // in Version 6 and above, I've used number, which allows negative numbers
    // the range property was added in Version 9
    $('#frm').validate({
        rules: {
            xBegin: {
                required: true,
                // digits: true
                number: true,
                range: [-10, +10]
            },
            xEnd: {
                required: true,
                // digits: true
                number: true,
                range: [-10, +10]
            },
            yBegin: {
                required: true,
                // digits: true
                number: true,
                range: [-10, +10]
            },
            yEnd: {
                required: true,
                // digits: true
                number: true,
                range: [-10, +10]
            }
        },
        messages: {
            xBegin: {
                required: function () {
                    tblValidator.highlightError("xBegin");
                    return formatErrMsg(tbltexts.mincolvalreq[strLanguage]);
                    // return "<br>" + tbltexts.mincolvalreq[strLanguage] ;
                    // return "<br>The Minimum Column Value is<br> &nbsp; required." ; 
                },
                number: function () {
                    tblValidator.highlightError("xBegin");
                    return formatErrMsg(tbltexts.mincolvalnum[strLanguage]);
                    // return "<br>" + tbltexts.mincolvalnum[strLanguage] ;
                    // return "<br>Please enter a valid number for<br> &nbsp; the Minimum Column Value." ; 
                },
                range: function () {
                    tblValidator.highlightError("xBegin");
                    return "<br>Please enter a value between -10 and 10.";
                }
            },
            xEnd: {
                required: function () {
                    tblValidator.highlightError("xEnd");
                    return formatErrMsg(tbltexts.maxcolvalreq[strLanguage]);
                    // return "<br>" + tbltexts.maxcolvalreq[strLanguage] ;
                    // return "<br>The Maximum Column Value is<br> &nbsp; required." ; 
                },
                number: function () {
                    tblValidator.highlightError("xEnd");
                    return formatErrMsg(tbltexts.maxcolvalnum[strLanguage]);
                    // return "<br>" + tbltexts.maxcolvalnum[strLanguage] ;
                    // return "<br>Please enter a valid number for<br> &nbsp; the Maximum Column Value." ; 
                },
                range: function () {
                    tblValidator.highlightError("xEnd");
                    return "<br>Please enter a value between -10 and 10.";
                }
            },
            yBegin: {
                required: function () {
                    tblValidator.highlightError("yBegin");
                    return formatErrMsg(tbltexts.minrowvalreq[strLanguage]);
                    // return "<br>" + tbltexts.minrowvalreq[strLanguage] ;
                    // return "<br>The Minimum Row Value is<br> &nbsp; required." ; 
                },
                number: function () {
                    tblValidator.highlightError("yBegin");
                    return formatErrMsg(tbltexts.minrowvalnum[strLanguage]);
                    // return "<br>" + tbltexts.minrowvalnum[strLanguage] ;
                    // return "<br>Please enter a valid number for<br> &nbsp; the Minimum Row Value." ; 
                },
                range: function () {
                    tblValidator.highlightError("yBegin");
                    return "<br>Please enter a value between -10 and 10.";
                }
            },
            yEnd: {
                required: function () {
                    tblValidator.highlightError("yEnd");
                    return "<br>Please enter a value between -10 and 10.";
                    // return "<br>" + tbltexts.maxrowvalreq[strLanguage] ;
                    // return "<br>The Maximum Row Value is<br> &nbsp; required." ; 
                },
                number: function () {
                    tblValidator.highlightError("yEnd");
                    return formatErrMsg(tbltexts.maxrowvalnum[strLanguage]);
                    // return "<br>" + tbltexts.maxrowvalnum[strLanguage] ;
                    // return "<br>Please enter a valid number for<br> &nbsp; the Maximum Row Value." ; 
                },
                range: function () {
                    tblValidator.highlightError("yEnd");
                    return "Please enter a value between -10 and 10.";
                }
            }
        },
        // JS&jQ:TMM, p. 298
        errorPlacement: function (error, element) {
            //// N.B. the $(error) object must be appended somewhere so that it can be automatically
            //// deleted by the Validation plugin.  Otherwise, the error message cannot be deleted
            //// and errors accumulate.
            //
            // console.log( error.html() + "\n" + element[0].attributes.length ) ;
            // http://stackoverflow.com/questions/5583641/jquery-get-properties-of-element
            // for ( var k = 0 ; k < element[0].attributes.length ; k++ ) {
            //   console.log( element[0].attributes[k].name + " = " + element[0].attributes[k].value ) ;
            // }
            // the above returns property names: type, name, id, and class
            // 
            // var elemID = element[0].attributes["id"].value ;
            // var strMsg = $(error).html().substring( 0, $(error).html().length - 1 ) ;
            // $(error).appendTo( element.parent().parent().parent().parent().parent() ) ;
            // console.log( $(element.parent().parent().parent().parent().parent()).attr("id") ) ;
            $(error).appendTo($("#frm"));
        },
        success: function (error, element) {
            $(element).css({"border": ""}); // reset the border to its default
            // for ( var k = 0 ; k < element.attributes.length ; k++ ) {
            //   console.log( element.attributes[k].name + " = " + element.attributes[k].value ) ;
            // }
            // the above returns property names: type, name, and id
        }
    }); // validation rules
}); // $(document).ready
  