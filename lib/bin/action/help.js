const chalk = require("chalk")

function formatSplitSpace(letter, space = 16) {
    const len = String.prototype.toString.call(letter).length;
    const after = space - len;
    
    return (new Array(after > 0 ? after : 1)).join(" ")
}

module.exports = function (meteCli) {
    const {commands, options} = meteCli;
    const commandsDes = Object.keys(commands).map(e=>(
        `      ${e}${formatSplitSpace(e)}${commands[e].description}`
    ))
    const optionsDes = Object.keys(options).map(e=>(
        `      ${e}${formatSplitSpace(e)}${options[e].description}`
    ))
    console.log(`
    Usage:
      ${chalk.bgBlue('$ mete <command>')}

    Available commands:
${commandsDes.join("\n")}

    Available options:
${optionsDes.join("\n")}

    For more information run a command with the --help flag
      ${chalk.bgBlue('$ mete new --help')}
  `);
}