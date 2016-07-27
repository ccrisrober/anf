module.exports = {
	customValidators: {
		exists: function (value) {
			return value !== undefined;
		},
		isArray: function (value) {
			return Array.isArray(value);
		},
		isString: function (value) {
			return (typeof value === 'string' || value instanceof String)
		},
		inRange: function (value, val1, val2) {
			return (value >= val1 && value <= val2);
		},
		isWebpage: function (value) {
			var urlregex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))/;
			return urlregex.test(value);
		}
	}
};