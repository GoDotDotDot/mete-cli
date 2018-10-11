const url = require('url');
const launchEditor = require('launch-editor');
const { resolve, join } = require('path');

module.exports = function (req, res) {
    const query = url.parse(req.url, true).query
    const lineNumber = parseInt(query.lineNumber, 10) || 1
    const colNumber = parseInt(query.colNumber, 10) || 1;
    const fileDir = `${join(process.cwd(), query.fileName)}:${lineNumber}:${colNumber}`;
    console.log(`
    Open in: ${fileDir}
    `)
    launchEditor(fileDir)
    res.end()
}
