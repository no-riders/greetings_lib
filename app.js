// gets a new Obj (the architecture lets us not to use 'new' keyword)
var g = G$('Yev', 'Logosha');

// usage of chainable methods
g.greet().setLang('ua').greet(true).log();

// using Obj on the click of the Login button
$('#login').click(function() {

	// create a new 'Greetr' Obj (as if we know the name from login)
	var loginGtr = G$('Yev', 'Logosha');

	// hide button and chooser from screen
	$('#logindiv').hide();

	// start a HTML greeting, passing the '#greeting' as a selector and chosen lang. log welcome
	loginGtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});