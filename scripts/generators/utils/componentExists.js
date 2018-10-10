/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const pageComponents = fs.readdirSync(
  path.join(process.cwd(), './app/components'),
);
const pageContainers = fs.readdirSync(
  path.join(process.cwd(), './app/containers'),
);
const page = fs.readdirSync(
  path.join(process.cwd(), './app/pages'),
);
const components = pageComponents.concat(pageContainers, page);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
