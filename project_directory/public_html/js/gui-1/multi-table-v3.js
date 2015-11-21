/**
 File:  js/gui-1/multi-page-v3_1.js
 Author: Thiago G Goncalves, thiago_goncalves@student.uml.edu
 
 This file contains the utility functions needed to perform pseudo form 
 processing using the Jquery plug in.
 
 some of these function were inspired by Jesse H. Heines.

 Created on 11/18/15 by Thiago Goncalves 
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
                required: "must not be empty",
                number: "Must be a number",
                min: "not greator than 0."
            },
            y_start: {
                required: "must not be empty",
                number: "Not number",
                min: "not greator than 0."
            },
            x_end: {
                required: "must not be empty",
                number: "Must be a number",
                greatorThan: "MIN >= MAX",
                min: "greator than 1.",
                range_restriction: " must not exceed 15"
            },
            y_end: {
                required: "must not be empty",
                number: "Must be a number",
                greatorThan: "MIN >= MAX",
                min: "greator than 1.",
                range_restriction: "must not exceed 15"
            }
        },
        /* overriding the function and setting defining my own defintion.*/

        highlight: function (element) {
            //add has error bootstrap class to the parent field
            $(element).closest('.form-group').addClass('error-block');
        },
        unhighlight: function (element) {
            //removing bootstrap class of the parent field
            $(element).closest('.form-group').removeClass('.error-block');
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





