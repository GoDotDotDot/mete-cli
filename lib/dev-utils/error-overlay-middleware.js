const url = require('url');
const launchEditor = require('launch-editor');

module.exports = function (req, res) {
    const query = url.parse(req.url, true).query
    const lineNumber = parseInt(query.lineNumber, 10) || 1
    const colNumber = parseInt(query.colNumber, 10) || 1
    launchEditor(`${query.fileName}:${lineNumber}:${colNumber}`)
    res.end()
}
