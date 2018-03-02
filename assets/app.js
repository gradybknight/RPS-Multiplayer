// Global Variables
var activePlayerNames=[];
var playerOneWins=0;
var playerTwoWins=0;
var database;

// Connect to Firebase
function connectToFireBase(){
    var config = {
        apiKey: "AIzaSyBGeMXPVCPD55_uNCo-K0VYexV00807F1k",
        authDomain: "rock-paper-scissors-gbk.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-gbk.firebaseio.com",
        projectId: "rock-paper-scissors-gbk",
        storageBucket: "rock-paper-scissors-gbk.appspot.com",
        messagingSenderId: "333165896121"
    };

    firebase.initializeApp(config);
    database = firebase.database();
}
// Set Firebase to Empty Structure
function pushEmptyDataStructureToFirebase(){
    database.ref().set({
        playerOneName: "",
        playerOneChoice:"",
        playerTwoName: "",
        playerTwoChoice:"",
        lastChatPlayer:"",
        lastChatText:""
      });
}

// Listener for Firebase changes
database.ref().on("value",function(snapshot){
    console.log(snapshot.val());
    var dbPlayerOne = {
        name:snapshot.val().playerOneName,
        choice:snapshot.val().playerOneChoice
    }
    var dbPlayerTwo = {
        name:snapshot.val().playerTwoName,
        choice:snapshot.val().playerTwoChoice
    }
    var lastChat = {
        name:snapshot.val().lastChatPlayer,
        chatText:snapshot.val().lastChatText
    }
    

hideOrShowNameDivBasedOnNumberOfActivePlayers();

})

// Button Listeners
$("#submitName").on("click",function(){
    event.preventDefault();
    
})

// Interface Functions
function hideOrShowNameDivBasedOnNumberOfActivePlayers(){
    if (activePlayerNames.length==2){
        $("#nameEntryDiv").hide();
    } else {
        $("#nameEntryDiv").show();
    }
}

// Helper functions
function whichIsNewPlayer(){

}


function watchUsers(){
    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/connections");

    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

        // If they are connected..
        if (snap.val()) {

            // Add user to the connections list.
            var con = connectionsRef.push(true);

            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {

        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        $("#watchers").text(snap.numChildren());
    });
}

pushEmptyDataStructureToFirebase();