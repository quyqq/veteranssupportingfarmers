
//document.getElementById("scrallBarID").addEventListener("scroll", test.bind(null,""), false);


//function test(e) {
//    var object = document.getElementById("scrallBarID");
//    if (object.scrollHeight - $(object).scrollTop() == $(object).outerHeight()) {
//        alert(e);
//    }
//}

$(document).ready(function () {
    $("#scrallBarID").scroll(function () {
        var object = document.getElementById("scrallBarID");
        if (object.scrollHeight - $(object).scrollTop() == $(object).outerHeight()) {
            alert("b");
        }
    });
});