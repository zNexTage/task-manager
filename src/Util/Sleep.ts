const sleep = (time: number) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve(null);
        }, time);
    })
}


export default sleep;