
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
    loadComment();
    loadSumDays();
    loadSumPeople();

    

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
            url: window.location.href +"/home/makeDonation",
            data: "{donationF: " + JSON.stringify(dataInsert) + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                loadTotalOfMoney();  
                
            },
            error: function (ex) {
                                alert("[Make Donation]Error: " + ex);

            }
        });  
    }

    function loadTotalOfMoney()
    {
        $.ajax({
            type: "POST",//GET
            url: window.location.href +"/home/sumDonation",
            dataType: "json",
            data: {},
            success: function (ReturnData) {                
                $("#totalDonation").empty();
                $("#totalDonation").append("Total amount donated by veterans = $"+ReturnData+".00");
            },
            error: function (ex) {
                alert("[LOAD_TotalDonation]Error: " + ex);


            }
        });  
    }

    

    function convertToJavaScriptDate(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        return  dt.getDate()  + "/" +(dt.getMonth() + 1)+ "/" + dt.getFullYear();
    }

    function loadSumPeople()
    {


        $.ajax({
            type: "POST",//GET
            url: window.location.href + "/home/sumPeople",
            dataType: "json",
            data: {},
            success: function (ReturnData) {
                $("#totalNumberTr").text("Total number travelling: " + ReturnData+" people");

            },
            error: function (ex) {
                alert("[LOAD_Total number travelling]Error: " + ex);


            }
        });  
        


    }
    function loadSumDays() {


        $.ajax({
            type: "POST",//GET
            url: window.location.href + "/home/sumDays",
            dataType: "json",
            data: {},
            success: function (ReturnData) {
                $("#totalDay").text("Total days travelled: " + ReturnData + " days");

            },
            error: function (ex) {
                alert("[LOAD_Total number travelling]Error: " + ex);


            }
        });  
       


    }
    function loadComment() {

        //alert(location.origin + "/" );// add it when it is published on the internet
        $.ajax({
            type: "POST",//GET
            url: window.location.href+"/home/loadComments",
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
                        rows.Comment  +
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
                alert("[LOAD_Commet]Error: " + ex);

            }
        });  
        
    }


    $("#summitButtonRegister").click(function () {

        if ($("#textBoxComment").val() != "" &&
            $("#fromDate").val() != "" &&
            $("#noPeople").val() != "" &&
            $("#postCode").val() != "" &&
            $("#toDate").val() != "" &&
            $("#town").val() != "" 
            ) {
            var dataInsert = {};
            dataInsert.Comment = $("#textBoxComment").val();
            dataInsert.FromDate = $("#fromDate").val();
            dataInsert.NoOfPeople = $("#noPeople").val();
            dataInsert.PostCode = $("#postCode").val();
            dataInsert.ToDate = $("#toDate").val();
            dataInsert.Town = $("#town").val();
            $.ajax({
                type: "POST",
                url: window.location.href + "/home/makeComment",
                data: "{commentF: " + JSON.stringify(dataInsert) + "}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function () {
                    loadComment();
                    loadSumDays();
                    loadSumPeople();

                },
                error: function (ex) {
                    alert("[Make Donation]Error: " + ex);

                }
            });
            return false;

        }
    });



    $("#comment_roll_bar").scroll(function () {
        var object = document.getElementById("comment_roll_bar");
        if (object.scrollHeight - $(object).scrollTop() <= $(object).outerHeight()) {
            loadComment()
        }
    });
});

