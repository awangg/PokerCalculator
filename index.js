const express = require('express')
const app = express()

app.use(express.static('public'));

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/src'));

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log('Listening on ' + port)
})