var prompt = require('prompt');
var fs = require('fs');
var consumer = {};
var prompting = [];
if (process.env.CONSUMER_KEY !== undefined) {
	consumer.consumer_key = process.env.CONSUMER_KEY;
} else {
	prompting.push('key');
}
if (process.env.CONSUMER_SECRET !== undefined) {
	consumer.consumer_secret = process.env.CONSUMER_SECRET;
} else {
	prompting.push('secret');
}
prompt.start();
prompt.get(prompting, (err, result) => {
	let o = {};
	if (result.key != undefined) {
		o.consumer_key = result.key;
	}
	if (result.secret != undefined) {
		o.consumer_secret = result.secret;
	}
	Object.assign(consumer, o);
	fs.writeFile('main/consumer.js', 'export default '+JSON.stringify(consumer), (err) => {
		if (err) {
			console.log('Error!! '+err);
			process.exit(1);
		}
		process.exit();
	});
});
