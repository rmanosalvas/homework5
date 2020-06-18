$(document).ready(function () {
    // Setting the Current Time to display on the screen
    // includes Month, Day, Year, Hour, Minute, Seconds (running).
    currentTime();
    function currentTime() {
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentDay").html(time);
        setTimeout(currentTime, 1000);
    };



    // A for loop here is running before other functions so that everything that is stored in the Local Storage is 
    // loaded onto the page by getting the values, creating a var with the elements associated with the values ID
    // and placing the value in the area
    var local = Object.keys(localStorage);
    for (let i = 0; i < local.length; i++) {
        var value = localStorage.getItem(local[i]);
        var dayHour = $("#" + local[i]).find("textarea")
        dayHour.val(value);
    }



    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        // creating a variable for the information (val()) typed in the box with the class .description
        var value = $(this).siblings(".description").val();
        // creating a variable for the id attribute associated with the parent element to the the button 
        var hour = $(this).parent().attr("id");

        // checking vars
        console.log(value);
        console.log(hour);

        // setting the value and the hour associated with it to the Local Storage
        localStorage.setItem(hour, value);
    });

    function colorCode() {
        var currentHours = moment().hours();

        $(".time-block").each(function () {
            // Grabbing the id from the selected (this) element
            var hourEl = $(this).attr("id");
            
            var hourDay = hourEl.substring(hourEl.length);
            var intHourDay = parseInt(hourDay)
            var intCurrentHours = parseInt(currentHours);
            if (parseInt(intHourDay) < parseInt(intCurrentHours)) {
                $(this).addClass("past");
                $(this).removeClass("future");
                $(this).removeClass("present");
            } else if (parseInt(intHourDay) > parseInt(intCurrentHours)) {
                $(this).addClass("future");
                $(this).removeClass("present");
                $(this).removeClass("past");
            } else if (parseInt(intHourDay) === parseInt(intCurrentHours)) {
                $(this).addClass("present");
                $(this).removeClass("future");
                $(this).removeClass("past");
            }
        })
    };
    colorCode();

});