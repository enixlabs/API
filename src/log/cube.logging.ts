const chalk = require('chalk');
const getTimestamp = () => new Date().toISOString();

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(
      chalk
        .hex('#ff0000')
        .bold(`[${getTimestamp()}] [info] [${namespace}] ${message}`, object),
    );
  } else {
    console.log(
      chalk
        .hex('#45ff00')
        .bold(`[${getTimestamp()}] [info] [${namespace}] ${message}`),
    );
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimestamp()}] [info] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.warn(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `[${getTimestamp()}] [info] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.error(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      `[${getTimestamp()}] [info] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.debug(`[${getTimestamp()}] [info] [${namespace}] ${message}`);
  }
};
export default { info, warn, error, debug };
