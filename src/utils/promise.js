function PatiencePromise(originalPromise, options = {}) {
    const { delay = 1000, callback } = options;

    return new Promise((resolve, reject) => {
        const patienceTimer = setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            } else {
                console.log("Please be patient, this is taking a while...");
            }
        }, delay);

        originalPromise
            .then(result => {
                clearTimeout(patienceTimer);
                resolve(result);
            })
            .catch(error => {
                clearTimeout(patienceTimer);
                reject(error);
            });
    });
}

export { PatiencePromise };
