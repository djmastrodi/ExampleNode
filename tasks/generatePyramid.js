const path = require('path');

const jestRegex = /it\('/g;
const jestContractRegex = /it\("/g;
const e2eRegex = /Scenario/g;

const fs = require('fs');

function readContentFile(filepath, regex) {
  const contents = fs.readFileSync(filepath, 'utf8');
  return (contents.match(regex) || []).length;
}

function readTsFiles(directory, type, regex) {
  let count = 0;

  fs.readdirSync(directory).forEach(file => {
    const stat = fs.statSync(`${directory}/${file}`);
    if (stat.isDirectory()) {
      count += readTsFiles(`${directory}/${file}`, type, regex);
    } else if (file.indexOf(type) !== -1) {
      const filepath = `${directory}/${file}`;
      count += readContentFile(filepath, regex);
    }
  });

  return count;
}

const unitTestCount = readTsFiles('./src', 'unit.test', jestRegex);
const componentTestCount = readTsFiles('./src', 'comp.test', jestRegex);
const integrationTestCount = readTsFiles('./src', 'int.test', jestRegex);
const contractTestCount = readTsFiles('../tests/contract','contract', jestContractRegex);
const e2eTestCount = readTsFiles('../tests/e2e/cypress', '.feature', e2eRegex);

const tests = {
  u: unitTestCount,
  cp: componentTestCount,
  i: integrationTestCount,
  ct: contractTestCount,
  e: e2eTestCount,
};

const data = JSON.stringify(tests);
fs.writeFileSync('../tasks/pyramid/testPyramid.json', data);
