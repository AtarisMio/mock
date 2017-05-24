const express = require('express');
const app = express();


const s = require('./server/utils/orm/mysql')
app.use('/static', express.static('src/static'));

app.use('/mock', require('./server/routers'));

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});