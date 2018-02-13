//gets a new object (the architecture allows us to not have to use 'new' keyword here)
var g = G$('Apollo', 'Bartholomew');

//using chainable methods
g.greet().setLang('fr').greet(true).log();

//using greetr objects on the click of the login button
$('#login').on('click', function() {
   // create a new 'Greetr' object (lets pretend we know the name from the login)
   var loginGrtr = G$('Apollo', 'Bartholomew');

   //hides the login on the screen
   $('#logindiv').hide();

   //Fires off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well.
   loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});


//DOM Styling
document.body.style.backgroundColor = "rgba(157,169,213,0.6)";
document.body.style.textAlign = "center";
document.body.style.marginTop = "100px";
document.body.style.fontFamily = "Helvetica";
