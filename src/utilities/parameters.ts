import express from 'express';

type jk = {
    name: string;
    width: number;
    hight: number;
    errr: string;
};

function getparameter(req: express.Request): jk {
    //function to get parameters from request and check if its are valid or not
    let arr: jk = {
        name: req.query.name as string,
        width: parseInt(req.query.width as string),
        hight: parseInt(req.query.hight as string),
        errr: 'no',
    };
    if (
        typeof arr.name == 'string' &&
        typeof arr.width == 'number' &&
        typeof arr.hight == 'number' &&
        arr.width > 0 &&
        arr.hight > 0
    ) {
        return arr; //the parameters are valid
    } else {
        arr.errr = 'yes';
        return arr; //the parameters are not valid
    }
}
module.exports = getparameter;
