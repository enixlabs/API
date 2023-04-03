const chalk = require('chalk');

export function setupConsole() {
  // -----| [ GLOBAL ENVIRONMENTS ] |-----
  const serverUrl = process.env.SERVER_URL;
  const serverPort = process.env.NODE_PORT || 3021;
  const serverEndpoint = process.env.SERVER_ENDPOINT;
  const serverVersion = process.env.SERVER_VERSION;
  // -----| [ CUBE ENVIRONMENTS ] |-----
  const cubePort = process.env.CUBE_PORT || 1337;
  const cubeUrl = process.env.CUBE_HOST;
  const cubeVersion = process.env.CUBE_VERSION;
  // -----| [ DATABASE ENVIRONMENTS ] |-----
  const databaseUrl = process.env.DATABASE_URL;
  const databasePort = process.env.DATABASE_PORT;
  const databaseName = process.env.DATABASE_NAME;

  // -----| [ CONSOLE MESSAGE ] |-----
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.hex('#ffdd00').bold('-----| [ SERVER:DEVELOPMENT ]'));
    console.log(
      chalk
        .hex('#ffdd00')
        .bold(
          `-----| [ ENDPOINT: ${serverUrl}:${serverPort}${serverEndpoint} ]`,
        ),
    );
    console.log(
      chalk
        .hex('#ff3c00')
        .bold(
          '-----| The server is currently configured for development. \n-----| You need to edit the .env and change NODE_ENV to\n-----| production to run the server in production mode.',
        ),
    );
    console.log(
      chalk.hex('#ffdd00').bold(`-----| [ API | VERSION: ${serverVersion} ]`),
    );
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${serverUrl}:${serverPort}`),
    );
    console.log(
      chalk.hex('#ffdd00').bold(`-----| [ CUBE | VERSION: ${cubeVersion} ]`),
    );
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${cubeUrl}:${cubePort}`),
    );
    console.log(chalk.hex('#ffdd00').bold(`-----| [ DATABASE | POSTGRES ]`));
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${databaseUrl}`),
    );
    console.log(chalk.hex('#ff3c00').bold(`-----| DATABASE: ${databaseName}`));
    console.log(
      chalk
        .hex('#ff3c00')
        .bold(
          '-----| Remember to also change the URL in the .env file to the\n-----| correct URL for the production server.',
        ),
    );
  } else {
    console.log(chalk.hex('#45ff00').bold('-----| [ SERVER:PRODUCTION ]'));
    console.log(
      chalk
        .hex('#45ff00')
        .bold(
          `-----| [ ENDPOINT: ${serverUrl}${serverEndpoint} ]`,
        ),
    );
    console.log(
      chalk.hex('#45ff00').bold(`-----| [ API | VERSION: ${serverVersion} ]`),
    );
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${serverUrl}`),
    );
    console.log(
      chalk.hex('#45ff00').bold(`-----| [ CUBE | VERSION: ${cubeVersion} ]`),
    );
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${cubeUrl}:${cubePort}`),
    );
    console.log(chalk.hex('#45ff00').bold(`-----| [ DATABASE | POSTGRES ]`));
    console.log(
      chalk.hex('#ff3c00').bold(`-----| URL: ${databaseUrl}`),
    );
    console.log(chalk.hex('#ff3c00').bold(`-----| DATABASE: ${databaseName}`));
  }
}
