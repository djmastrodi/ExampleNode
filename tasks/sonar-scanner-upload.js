const sonarqubeScanner = require('../services/node_modules/sonarqube-scanner');
const fs = require('fs');
const axios = require('../services/node_modules/axios').default;

// Environment variables
const SONAR_URL = 'https://sonarcloud.io';
const ORGANIZATION = process.argv[2];
const PROJECT_KEY = process.argv[3];
const TOKEN = process.argv[4];

sonarqubeScanner({
  serverUrl: SONAR_URL,
  token: TOKEN,
  options: {
    'sonar.organization': ORGANIZATION,
    'sonar.projectKey': PROJECT_KEY,
    'sonar.projectName':'Example Node js',
    'sonar.language': 'ts',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.sources': 'src',
    'sonar.tests': 'src',
    'sonar.test.inclusions': '**/*.test.ts, **/*.test.tsx',
    // 'sonar.testExecutionReportPaths': 'reports/unit-test-reporter.xml, reports/comp-test-reporter.xml, reports/int-test-reporter.xml',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.coverage.exclusions': 'src/lambdas/*.*, src/models/*.*, src/commom/logger/logger.ts, src/config/env.dbconfig.ts'
  },
}, async () => {

  let taskUrl = '';
  let response = '';
  let status = '';

  try {
    taskUrl = await getLineByBegin('.scannerwork/report-task.txt', 'utf-8', 'ceTaskUrl');
    taskUrl = taskUrl.replace('ceTaskUrl=', '');
  } catch (error) {
    console.log('Erro ao tentar ler o arquivo especificado ', error);
    process.exit(8000);
  }

  while (status != 'SUCCESS') {
    try {
      response = await getStatus(taskUrl, TOKEN);
      status = response.data.task.status;

      if (status == 'CANCELED' || status == 'FAILED') {
        console.log('A tarefa de analise não foi bem sucedida.');
        process.exit(9000);
      }
    } catch (error) {
      console.log('Erro ao tentar consultar o Sonar ', error);
      process.exit(8000);
    }
  }

  let analysisId = response.data.task.analysisId;
  let gateUri = `${SONAR_URL}/api/qualitygates/project_status?analysisId=${analysisId}`;
  try {
    let qualityStatus = await getStatus(gateUri, TOKEN);

    if (qualityStatus.data.projectStatus.status == 'OK') {
      console.log('Sonar Quality Gate: Passed!');
      process.exit(0);
    } else {
      console.log(`Sonar Quality Gate: ${qualityStatus.data.projectStatus.status}`);
      process.exit(9000);
      //process.exit(0);
    }
  } catch (error) {
    console.log(`\nErro ao enviar um GET ao sonarqube\n${error.message}\n\n`);
    process.exit(9000);
  }
});

/**
 * Get line by your text begin
 *
 * @param {string} filename
 * @param {string} encoding
 * @param {string} beginText
 */
function getLineByBegin(filename, encoding, beginText) {
  return new Promise(function (resolve, reject) {
    try {
      fs.readFile(filename, encoding, function (err, data) {
        var lines = data.split(/\r?\n/);
        lines.forEach(function (line) {
          if (line.substring(0, beginText.length) == beginText) {
            resolve(line);
          }
        });
        resolve(null);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * get SonarCloud status
 *
 * @param {string} restUri
 * @param {string} sonarToken
 */
function getStatus(restUri, sonarToken) {
  const options = {
    headers: {
      'User-Agent': 'Request-Promise',
    },
    auth: {
      username: sonarToken
    }
  };

  return new Promise(
    async function (resolve, reject) {
      try {
        const response = await axios.get(restUri, options);
        resolve(response);
      }
      catch (error) {
        reject(error);
      }
    }
  );
}
