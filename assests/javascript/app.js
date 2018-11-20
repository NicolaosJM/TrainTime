
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2SwPhxFO-2_T0wctdsFPOUCe0LAFgEZE",
    authDomain: "traintimes-4b9aa.firebaseapp.com",
    databaseURL: "https://traintimes-4b9aa.firebaseio.com",
    projectId: "traintimes-4b9aa",
    storageBucket: "",
    messagingSenderId: "194278433103"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".btn").on("click", function(event) {
    event.preventDefault();

    var trainNameVar = $("#trainNameId").val().trim();
    var destinationVar =$("#destinationId").val().trim();
    var firstTrainTimeVar = moment($("#firstTrainTimeId").val().trim(), "HH:mm").format("X");
    var frequencyVar = $("#frequencyId").val().trim();

    var newTrain = {
        trainName: trainNameVar,
        destination: destinationVar,
        firstTimeTrain: firstTrainTimeVar,
        frequency: frequencyVar
    };

    database.ref().push(newTrain);


});

database.ref().on("child_added", function(snapshot) {
    var trainNameVar = snapshot.val().trainName;
    var destinationVar = snapshot.val().destination;
    var firstTrainTimeVar = snapshot.val().firstTimeTrain;
    var frequencyVar = snapshot.val().frequency;
    var firstTimeConverted = moment(firstTrainTimeVar, "HH:mm").subtract(1, "years");
    var differenceTimeVar = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemainder = differenceTimeVar % frequencyVar;
    var nextArrrivalTimeVar = frequencyVar - timeRemainder;
    var nextTrainVar = moment().add(nextArrrivalTimeVar, "minutes");
    var nextTrainConvertedVar = moment(nextTrainVar).format("hh:mm A");

    var newRow = $("<tr>").append(
        $("<td>").text(trainNameVar),
        $("<td>").text(destinationVar),
        $("<td>").text(frequencyVar),
        $("<td>").text(nextTrainConvertedVar),
        $("<td>").text(nextArrrivalTimeVar)        
    )
    $(".table > tbody").append(newRow);

})
