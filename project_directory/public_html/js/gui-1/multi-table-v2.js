/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    $.validator.addMethod('greatorThan', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i > j;
    });

    $.validator.addMethod('lessThan', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i < j;
    });

    $.validator.addMethod('range_restriction', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return (i) < (j + 51);
    });


    $('#form_table').validate({rules: {
            onfocusout: true,
            onkeyup: true,
            onclick: true,
            x_start: {
                number: true,
                required: true,
                min: 0
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
                range_restriction: "The range offset must not exceed 50"
            },
            y_end: {
                required: "Maximum Y must not be empty",
                number: "Must be a number",
                greatorThan: "The value must be greator Y Minimun",
                min: "value must be greator than 1.",
                range_restriction: "The range offset must not exceed 50"
            }
        }
    });
});





