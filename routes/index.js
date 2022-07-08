const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.use((req, res) => {
	res.send('<h1>An error occurred!</h1>')
});

module.exports = router;