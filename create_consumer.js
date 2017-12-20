var prompt = require('prompt');
var fs = require('fs');
prompt.start();
prompt.get(['key', 'secret'], (err, result) => {
	var o = {
		'key': result.key,
		'secret': result.secret
	};
	fs.writeFile('consumer.js', 'export default '+JSON.stringify(o), (err) => {
		if (err) {
			console.log('Error!! '+err);
			process.exit(1);
		}
		process.exit();
	});
});
