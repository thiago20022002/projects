/**
 File:  js/gui-1/multi-page-v2.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This file contains the utility functions needed to perform pseudo form 
 processing.
 
 some of these function were inspired by Jesse H. Heines.

 Created on 11/4/15 by Thiago Goncalves 
 */


$(document).ready(function () {

    /*
     * Adding a method to check if the minimum value is greator than maximum value
     */
    $.validator.addMethod('greatorThan', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var i = parseInt(value);
        // Get the value corresponds to the comparrison
        var j = parseInt($(param).val());

        return i > j;
    });

    /*
     * Adding a range offset restriction to check if maximum value - minimun value is no greator
     * than 20.
     */
    $.validator.addMethod('range_restriction', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var i = parseInt(value);
        // Get the value corresponds to the comparrison
        var j = parseInt($(param).val());

        return (i) < (j + 20);
    });


    $('#form_table').validate({rules: {
            /*
             * It will check all fields
             */
            onfocusout: true,
            onkeyup: true,
            onclick: true,
            x_start: {
                number: true,
                required: true,
                min: 0 // not less than 0
            },
            y_start: {
                number: true,
                required: true,
                min: 0
            },
            x_end: {
                number: true,
                required: true,
                min: 1,
                greatorThan: "#x_start",
                range_restriction: "#x_start"
            },
            y_end: {
                number: true,
                required: true,
                min: 1,
                greatorThan: "#y_start",
                range_restriction: "#y_start"
            }
        },
        messages: {
            x_start: {
                required: "Minimum X must not be empty",
                number: "Must be a number",
                min: "value must be greator than 0."
            },
            y_start: {
                required: "Minimum Y must not be empty",
                number: "Must be a number",
                min: "value must be greator than 0."
            },
            x_end: {
                required: "Maximum X must not be empty",
                number: "Must be a number",
                greatorThan: "The value must be greator X Minimun value ",
                min: "value must be greator than 1.",
                range_restriction: "The range offset must not exceed 20"
            },
            y_end: {
                required: "Maximum Y must not be empty",
                number: "Must be a number",
                greatorThan: "The value must be greator Y Minimun",
                min: "value must be greator than 1.",
                range_restriction: "The range offset must not exceed 20"
            }
        },
        /* overriding the function and setting defining my own defintion.*/

        highlight: function (element) {
            //add has error bootstrap class to the parent field
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            //removing bootstrap class of the parent field
            $(element).closest('.form-group').removeClass('has-error');
        },
        //Display error in a span element 
        errorElement: 'span',
        //Display error in a span element class help-block
        errorClass: 'help-block',
        /* overriding the function and setting defining my own defintion.*/

        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});





