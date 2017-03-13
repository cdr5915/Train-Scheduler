// Initialize Firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAw1VAEneumMDxS-K5Zsvl3cGEP-UOzXV0",
    authDomain: "trainscheduler-947b2.firebaseapp.com",
    databaseURL: "https://trainscheduler-947b2.firebaseio.com",
    storageBucket: "trainscheduler-947b2.appspot.com",
    messagingSenderId: "911085755055"
  };
  firebase.initializeApp(config);

//create variable to reference database
var dataRef = firebase.database();

//set initial values for table
var trainName = "";
var trainDest = "";
var firstTime = "";
var trainFreq = "";

//capture button click
$("#add-info").on("click", function(eventObject) {
	console.log("tada!");
    eventObject.preventDefault();

    trainName = $("#name-input").val().trim();
    trainDest = $("#destination-input").val().trim();
    firstTime = $("#time-input").val().trim();
    trainFreq = $("#frequency-input").val().trim();

    dataRef.ref().push({
    	trainName: trainName,
    	trainDest: trainDest,
    	firstTime: firstTime,
    	trainFreq: trainFreq,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    return false;
});

//

dataRef.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().trainDest);
	console.log(childSnapshot.val().firstTime);
	console.log(childSnapshot.val().trainFreq);
	console.log(childSnapshot.key);

	var trainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().trainDest;
	var firstTime = childSnapshot.val().firstTime;
	var trainFreq = childSnapshot.val().trainFreq;
	var nextArrival = 0;
	var minAway = 0;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

     minAway = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    nextArrival = moment().add(minAway, "minutes");
    
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

	$("#trainData").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextArrival).format("hh:mm") + "</td><td>" + minAway + "</td></tr>");
});




