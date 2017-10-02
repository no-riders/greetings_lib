var g = G$('Yev', 'Logosha');
g.greet().setLang('ua').greet(true).log();

$('#login').click(function() {
	var loginGtr = G$('Yev', 'Logosha');
	$('#logindiv').hide();
	loginGtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});