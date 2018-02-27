// Global Variables
var activePlayerNames=[];
var playerOneWins=0;
var playerTwoWins=0;

// Connect to Firebase
var config = {
    apiKey: "AIzaSyBGeMXPVCPD55_uNCo-K0VYexV00807F1k",
    authDomain: "rock-paper-scissors-gbk.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-gbk.firebaseio.com",
    projectId: "rock-paper-scissors-gbk",
    storageBucket: "rock-paper-scissors-gbk.appspot.com",
    messagingSenderId: "333165896121"
  };

firebase.initializeApp(config);
var database = firebase.database();

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

pushEmptyDataStructureToFirebase();