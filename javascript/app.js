
var database = firebase.database();

$("#sub-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    })

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
})

database.ref().on(
    "child_added",
    function (childSnapshot) {

        var name = childSnapshot.val().trainName;
        var dest = childSnapshot.val().destination;
        var first = childSnapshot.val().trainTime;
        var freq = childSnapshot.val().frequency;

        console.log(name);
        console.log(dest);
        console.log(first);
        console.log(freq);

        var convert = moment(first, "hh:mm").subtract(1, "years");
        console.log("Converted time " + convert);

        var now = moment();
        console.log("Current Time " + moment(now).format("hh:mm"));

        var timeDiff = moment().diff(moment(convert), "minutes");
        console.log("Time Difference " + timeDiff);

        var timeRemain = timeDiff % freq;
        console.log("Remaining time " + timeRemain);

        var timeUntilNext = freq - timeRemain;
        console.log("Minutes untill next train " + timeUntilNext);

        var nextTrainTime = moment().add(timeUntilNext, "minutes").format("hh:mm");

        $("#added-trains > tbody").append(
            "<tr><td>" +
            name +
            "</td><td>" +
            dest +
            "</td><td>" +
            freq +
            "</td><td>" +
            nextTrainTime +
            "</td><td>" +
            timeUntilNext +
            "</td></tr>"
        );
    }
);