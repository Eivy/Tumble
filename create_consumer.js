var prompt = require('prompt');
var fs = require('fs');
prompt.start();
prompt.get(['key', 'secret'], (err, result) => {
	var o = {
		'consumer_key': result.key,
		'consumer_secret': result.secret
	};
	fs.writeFile('main/consumer.js', 'export default '+JSON.stringify(o), (err) => {
		if (err) {
			console.log('Error!! '+err);
			process.exit(1);
		}
		process.exit();
	});
});
