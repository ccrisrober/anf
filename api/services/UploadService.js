var NodeUpload = require("node-upload");

__ioc.$singleton("upload_image", function() {
	console.log("UPD");
	return new NodeUpload(function(file) {
		return file.fieldname + '-' + Date.now();
	}, "./public/uploads/");
});

exports.upload_image = function(req, res, field_name) {
	return __ioc.$invoke(["upload_image"], function(upload) {
		return upload.upload_file(req, res, field_name, ["png", ".jpg", "jpeg", ".gif"]);
	});
};
exports.upload_images = function(req, res, field_name) {
	return __ioc.$invoke(["upload_image"], function(upload) {
		return upload.upload_array_files(req, res, field_name, [".png", "jpg", "jpeg", "gif"], {
			files: 4
		});
	});
};