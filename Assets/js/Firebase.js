var firebaseConfig = {
    apiKey: "AIzaSyAaO1o6LiBezMWTAI4hdwF5knMA-H6i2Mk",
    authDomain: "newsx-4e15e.firebaseapp.com",
    databaseURL: "https://newsx-4e15e.firebaseio.com",
    projectId: "newsx-4e15e",
    storageBucket: "newsx-4e15e.appspot.com",
    messagingSenderId: "469350570019",
    appId: "1:469350570019:web:f9865ac754cb1821"
};

firebase.initializeApp(firebaseConfig);

$("document").ready(function () {
    $("#user").hide();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $("#usersign").hide();
            $("#user").show();
            var path = $(location).attr("href").split("/");
            var user = firebase.auth().currentUser;
            if(user!=null)
            {
                if(path[path.length -1] === 'signin.html')
                {
                    console.log(window.location.replace("index.html"));
                }
            }
        } else {
            // No user is signed in.
            $("#usersign").show();
            $("#user").hide();
        }
    });
});



$("#signinbtn").on("click",function () {
    $("#process").show();
   var email = $("#signinemail").val();
   var password = $("#signinpassword").val();
   if(email === null || password === null)
   {
       $("#error").text("Both Fields are required");
       $("#process").hide();
       return;
   }
    var errorCode="";
    var errorMessage="";
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        errorCode = error.code;
        errorMessage = error.message;
        $("#error").text(errorMessage);
        $("#process").hide();
    });
});

$("#signupbtn").on("click",function () {

    var email = $("#signupemail").val();
    var password = $("#signuppassword").val();
    var name1  = $("#signupname").val();
    alert(email + " " + password);

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function writeUserData(userId, name, email, imageUrl) {
            firebase.database().ref('users/' + user.userId).set({
                username: name1,
                email: user.email,
                profile_picture :" "
            });
            alert("Kindly verify your email to continue");
            firebase.auth().signOut();
            window.location.replace("index.html");
        }).catch(function(error) {
            // An error happened.
            var user = firebase.auth().currentUser;
            user.delete();
            alert(error);
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
});


$("#user").on("click",function () {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace("index.html");
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });
});
