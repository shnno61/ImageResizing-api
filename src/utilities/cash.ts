const fs = require('fs');

type ob = {
    name: string;
    width: string;
    hight: string;
};

async function cashed(fold: string, filen: string): Promise<string> {
    //check if a file is already in a folder
    return new Promise<string>(function (resolve, reject) {
        return fs.readdir(fold, (err: any, files: string[]) => {
            files.forEach((file) => {
                if (file === filen) {
                    resolve('yes'); //the file is exist
                }
            });
            resolve('no'); //the file is not exist
        });
    });
}

async function getcheck(fold: string, filen: string): Promise<string> {
    return await cashed(fold, filen);
}

module.exports = getcheck;
