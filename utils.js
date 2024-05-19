import ora from 'ora';

const spinner = async(message, time) => {

    const setSpinner = ora(message).start();
    await sleep(time);
    setSpinner.clear();
    setSpinner.stop()
};

const sleep = async(time) => {
    return new Promise((reolve) => { setTimeout(reolve, time); });
};

export {
    spinner,
    sleep
};