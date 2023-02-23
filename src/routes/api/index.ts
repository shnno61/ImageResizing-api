import express from 'express';
import path from 'path';
const api = express.Router();
const resizeImage = require(path.resolve(__dirname, '../../utilities/resize.ts'));
const getparameter = require(path.resolve(__dirname, '../../utilities/parameters.ts'));
const getcheck = require(path.resolve(__dirname, '../../utilities/cash.ts'));

const testFolder2 = './src/images/processed_images/';
const testFolder1 = './src/images/';

/////////////////////////////////////////////////////////////  clsaa for customized error message

class Err {
    public message: string;
    public state: number;
    public constructor(mes: string, sta: number) {
        this.message = mes;
        this.state = sta;
    }
}
////////////////////////////////////////////////////////////////  type for returned object from function (getparameter)

/*type jk = {
    name: string;
    width: number;
    hight: number;
    errr: string;    //if valid input   errr="no"   //if invalid input errr="yes"
};
*/
/////////////////////////////////////////////////////////////////////

api.get('/', (req: express.Request, res: express.Response) => {
    try {
        //if there is an error like invalid input in the URL (returned from getparameter() in property called errr ) an error message will been thrown to be catched
        const dataa = getparameter(req); //getting the parameters and indicate that if there was an error in these parameters  --the property errr will be (yes) otherwise (no)
        if (dataa.errr === 'no') {
            const filen2 = 'resize_' + dataa.name + '_' + String(dataa.width) + '_' + String(dataa.hight) + '.jpg'; //file-name for the resized image if it exist
            const filen1 = dataa.name + '.jpg'; //file-name for the src image if it exist

            const locaton = //location for resized image
                path.resolve('./') +
                '/src/images/processed_images/resize_' +
                dataa.name +
                '_' +
                String(dataa.width) +
                '_' +
                String(dataa.hight) +
                '.jpg';

            getcheck(testFolder1, filen1).then(function (result1: string) {
                //check if the src image is already exist

                if (result1 == 'yes') {
                    //if the src image is exist
                    console.log(result1+'  => the src image is exist');

                    getcheck(testFolder2, filen2).then(function (
                        //check if the resized image is already exist
                        result: string,
                    ) {
                        if (result == 'yes') {
                            // the resized image is already exist
                            console.log(result+'  => the resized image is exist before');
                            res.status(200).sendFile(locaton);
                        }
                        if (result == 'no') {
                            // the resized image is not exist,then will be generated an displayed
                            console.log(result+'  => the resized image is not exist before');
                            resizeImage(dataa.name, dataa.width, dataa.hight);
                            setTimeout(() => {
                                res.status(200).sendFile(locaton);
                            }, 500);
                        }
                    });
                }
                try {
                    if (result1 == 'no') {
                        //if the src image is not  exist ,then an error will been thrown
                        console.log(result1+'  => the src image is not exist');
                        throw new Err('there is no image with this name in folder (images) ', 404);
                    }
                } catch (Err: any) {
                    res.status(Err.state).send(Err.message);
                }
            });
        } else {
            throw new Err('in valid query strings', 404); //in valid inputs
        }
    } catch (Err: any) {
        //if there is an error .A response message will be returned in response
        res.status(Err.state).send(Err.message);
    }
});
export default api;
