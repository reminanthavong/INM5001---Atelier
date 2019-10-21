var data = require('request');

const loginAPI = (request, response) => {
	const username = request.body.username;
	const password = request.body.password;
	var url = 'https://testpostgrest-calendrier.herokuapp.com/baseidentification';
	var url2 = url + '?idutilisateur=eq.' + username + '&motdepasse=eq.' + password;
	data(url2, function(err, res, body) {
        
	data2 = JSON.parse(body);	
		if (data2.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
});
	

}


module.exports = {
  loginAPI
}
