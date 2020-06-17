$(document).ready(function () {
    // Setting the Current Time 
    currentTime();

    function currentTime() {
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentDay").html(time);
        setTimeout(currentTime, 1000);
    }

    var id = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4", "#5"];
    var timeSlots = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"]
    var timeSlotsPlus = ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00"]

    var todoArray = [];

    getSavedData();

    function getSavedData() {
        var storedData = JSON.parse(localStorage.getItem("plansArray"));
        if (storedData !== null) {
            todoArray = storedData;
        }
    };

    for (var i = 0; i < id.length; i++) {
        var plansDescription = $(id[i]);
        var currentTime = (moment().format("MMMM Do YYYY, HH:mm:ss"));
        var plannerTime = (moment().format("MMMM Do YYYY" + ", " + timeSlots[i]));
        var timeSlotsPlus = (moment().format("MMMM Do YYYY" + ", " + timeSlotsPlus[i]));

        if (currentTime < plannerTime) {
            plansDescription.attr("class", "future");
            todoArray.forEach(function (item) {
                if (id[i] === ("#" + (item["inputID"]))) {
                    plansDescription.val(item["inputValue"])
                }
            })
        } else if ((currentTime >= plannerTime) && (currentTime < timeSlotsPlus)) {
            plansDescription.attr("class", "present");
            plansDescription.forEach(function (item) {
                if (id[i] === ("#" + (item["inputID"]))) {
                    plansDescription.val(item["inputValue"])
                }
            });
        } else if ((currentTime > plannerTime)) {
            plansDescription.attr("class", "past");
            $(".past").attr("disabled", "disabled");
        }
    }




    $("button").on("click", function () {
        event.preventDefault()
        for (var i = 0; i < id.length; i++) {
            var inputId = $(id[i]).attr("id");
            var inputValue = $(id[i]).val();
            console.log(inputId)
            console.log(inputValue)

            var plansObj = {
                "inputId": inputId,
                "inputValue": inputValue
            };
            if (plansObj["inputValue"] !== "") {
                todoArray.push(plansObj);
            }
            localStorage.setItem("todoArray", JSON.stringify(todoArray));
        }
    });


});