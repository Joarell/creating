
const express	= require('express');
const app		= express();
const port		=  3001;
const path		= require('path');


app.use(express.static(path.join(__dirname, './www/app')));
app.listen(port, () => {
	console.log(`App running and listening on port ${port}!`)
});
