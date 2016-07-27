var multer = require("multer");
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, require(__base + "./config/application").uploads_dir);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + Date.now() + require("path").extname(file.originalname));
	},
	/*onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.originalname + ' uploaded to  ' + file.path);
	},
	fileFilter: function (req, file, cb) {
		if (require("path").extension(file.originalname) !== '.jpg') {
			return cb(new Error('Only pdfs are allowed'))
		}

		cb(null, true)
	}*/
	// TODO: Check type
}, {
	limits: {
		fieldNameSize: 10
	}
});
//  TODO: CHECK LO DE LIMIT https://codeforgeek.com/2014/11/file-uploads-using-node-js/

var upload = multer({ storage: storage });

exports.upload_file = function(req, res, field_name, type) {
	upload.single(field_name)(req, res, function(err, file) {
		if(err) {
			return res.end("Error upd file");
		}
		console.log(err);
		console.log(file);
		res.send("FILE OK");
	});
};