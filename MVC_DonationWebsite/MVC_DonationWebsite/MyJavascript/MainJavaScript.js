
//document.getElementById("scrallBarID").addEventListener("scroll", test.bind(null,""), false);


//function test(e) {
//    var object = document.getElementById("scrallBarID");
//    if (object.scrollHeight - $(object).scrollTop() == $(object).outerHeight()) {
//        alert("ok");
//    }
//}

$(document).ready(function () {

    var counter = 0;
    loadTotalOfMoney();
    loadComment()


    $("#summitButtonRegister").click(function () {
        alert("still coding");
    });

    $("#summitDonation").click(function () {   
        if (Number(document.getElementById("amountTextBox").value) >= 1) {
            loadTotalOfMoney();
            window.open("https://www.cwaofnsw.org.au/page.php?id=13", "_blank");

            makeDonation($("#amountTextBox").val());
            $("#amountTextBox").val("");
            return false;
        }
    });

    function makeDonation(amountMoney) {

        var dataInsert = {};
        dataInsert.amount = amountMoney;
        //dataInsert.date = "11/11/2020";
        //dataInsert.time = "9:00 AM";
        $.ajax({
            type: "POST",
            url: "home/makeDonation",
            data: "{donationF: " + JSON.stringify(dataInsert) + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                loadTotalOfMoney();  
                
            },
            error: function (ex) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message + "StackTrace: " + r.StackTrace + "ExceptionType: " + r.ExceptionType);  
            }
        });  
    }

    function loadTotalOfMoney()
    {
        $.ajax({
            type: "POST",
            url: "home/sumDonation",
            dataType: "json",
            data: {},
            success: function (ReturnData) {                
                $("#totalDonation").empty();
                $("#totalDonation").append("Total amount donated by veterans = $"+ReturnData+".00");
            },
            error: function (ex) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message +"StackTrace: " + r.StackTrace + "ExceptionType: " + r.ExceptionType);  

            }
        });  
    }

    

    function convertToJavaScriptDate(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        return  dt.getDate()  + "/" +(dt.getMonth() + 1)+ "/" + dt.getFullYear();
    }


    function loadComment() {

        
        $.ajax({
            type: "POST",
            url: "home/loadComments",
            dataType: "json",
            data: { "senddingData": counter },
            success: function (ReturnData) {
                var rows = '';
                $.each(ReturnData, function (i, rows) {
                    var addingCommentToList =
                        "<tr>"+
                        "<td class='commentReducePadding border-0 '>" +
                        "<div class='wholeComment '>" +
                        "<div class='titleComment'>" +
                        "<p class=' titleBlock'>" +
                        rows.NoOfPeople + " people went to " + rows.Town + " " + rows.PostCode + " in " + convertToJavaScriptDate(rows.FromDate) +
                        "</p>" +
                        "</div>" +
                        "<div class='comment'>" +
                        "<p class='commentBlock'>" +
                        rows.CommentID + rows.Comment  +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        "</td>"+    
                        "</tr>";     
    
                    $("#listOfcomment").append(addingCommentToList);
                    counter++;
    
                    });
                },
            error: function (ex) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message + "StackTrace: " + r.StackTrace + "ExceptionType: " + r.ExceptionType);

            }
        });  
        
    }
    
    $("#comment_roll_bar").scroll(function () {
        var object = document.getElementById("comment_roll_bar");
        if (object.scrollHeight - $(object).scrollTop() <= $(object).outerHeight()) {
            loadComment()
        }
    });
});

