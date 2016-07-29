module.exports.ensureAuthenticated = function(req, res, next) {
	// TODO
	return next();
};
module.exports.ensureAdmin = function(req, res, next) {
	if(req.user.canPlayRoleOf("admin")) {
		return next();
	}
	// TODO: Send HTTP No permisos
};
module.exports.ensureUser = function(req, res, next) {
	// TODO
	return next();
};

module.exports.checkToken = function(req, res, next) {
	// Se busca el token en el header o en los parámetros de la petición. Si es en el header se tiene que llamar 'x-access-token'
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// Se decodifica el token
	if (token) {
		//TODO OJO, QUITAR ESTO DEL MASTERTOKEN

		if (token == "mastertoken") {
			req.decoded = { "id": "1", "user_type": "company" };
			next();

		} else {
			// Utilizando la clave secreta
			jwt.verify(token, app.get('superSecret'), function (err, decoded) {
				if (err) {
					return res.json({ "success": false, "message": 'Failed to authenticate token.' });
				} else {
					// y se almacena el usuario decodificado en la petición para utilizarlo si es necesario

					req.decoded = decoded;
					next();
				}
			});
		}

	} else {
		// Si no hay token
		// se devuelve un error de permisos
		return res.status(403).send({
			"success": false,
			"message": 'No token provided.'
		});

	}
};

module.exports.lol = function() {
	return "LOL";
};