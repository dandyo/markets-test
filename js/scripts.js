$(document).ready(function ($) {
    let urlS = 'https://api-v2.markets.com/quotesv2?key=1&q=eurtry,eurpln,euraud,cadjpy,usdron,usdczk,gbpzar,eurchf';

    function loadData() {
        let tableContent = '<div class="row"> <div class="col"> <table class="table"> <thead> <tr> <th>Asset</th> <th>Sell</th> <th>Buy</th> <th>Change (%)</th> </tr> </thead> <tbody>';
        let i = 1;

        console.log('load data');

        $.ajax({
            type: 'GET',
            url: urlS,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    $.each(data, function (index, value) {
                        // console.log(index);
                        var change = value.change;
                        change = change.replace('%', '');

                        var numClass = 'pos';

                        if (change > 0) {
                            numClass = 'neg';
                        }

                        if (i == 5) {
                            tableContent += '</tbody> </table> </div> <div class="col col2"> <table class="table"> <thead> <tr> <th>Asset</th> <th>Sell</th> <th>Buy</th> <th>Change (%)</th> </tr> </thead> <tbody>';
                        }

                        tableContent += '<tr class="' + numClass + '"><td><b>' + value.display + '</b></td><td><span class="wrapped">' + value.sell + '</span></td><td><span class="wrapped">' + value.buy + '</span></td><td class="change">' + value.change + '</td></tr>';

                        i++;
                    });

                    tableContent += '</tbody> </table> </div> </div>';

                    $('#table').html(tableContent);
                } else {
                    $('#table').html('something went wrong');
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#table').html(errorThrown);
                clearInterval(myInterval);
            }
        });
    }

    loadData();
    const myInterval = setInterval(loadData, 5000);
});

// $('#accountForm')
$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); });

function check_number_callback($el, value, callback) {
    callback({
        value: value,
        valid: /(?=.*[0-9])/.test(value),
        message: "Passwords must contain at least 1 numeric character"
    });
}

function check_capital_callback($el, value, callback) {
    callback({
        value: value,
        valid: /(?=.*[A-Z])/.test(value),
        message: "Passwords must contain at least 1 uppercase character"
    });
}

function check_lowercase_callback($el, value, callback) {
    callback({
        value: value,
        valid: /(?=.*[a-z])/.test(value),
        message: "Passwords must contain at least 1 lowercase character"
    });
}

function check_count_callback($el, value, callback) {
    callback({
        value: value,
        valid: /(?=^.{6,15}$)/.test(value),
        message: "Passwords must be between 6 and 15 characters long"
    });
}

// $('#accountForm').jqBootstrapValidation({
//     fields: {
//         password:
//         {
//             validators:
//             {
//                 notEmpty:
//                 {
//                     message: 'The password is required and cannot be empty'
//                 },
//                 callback:
//                 {
//                     message: 'The password is not valid',
//                     callback: function (value, validator, $field) {
//                         if (value === '') {
//                             return true;
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });