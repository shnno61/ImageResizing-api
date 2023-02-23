import path from 'path';
const fs = require('fs');
const resizeImage = require(path.resolve(__dirname, '../utilities/resize.js'));
const getcheck = require(path.resolve(__dirname, '../utilities/cash.js'));
const pathh = path.resolve(__dirname, 'images/processed_images/');
const filenamee = 'resize_robo_600_600.jpg';
const filenamee1 = 'resize_robo_800_600.jpg';

describe('test for image resizing', () => {
    it('check for image processing to be found and deleted and generated again', () => {
        getcheck(pathh, filenamee).then(function (result1: string) {
            if (result1 == 'yes') {
                fs.unlinkSync(pathh + filenamee);
            }
        });
        resizeImage('robo', 600, 600);
        setTimeout(() => {
            getcheck(pathh, filenamee).then(function (result1: string) {
                expect(result1).toEqual('yes');
            });
        }, 500);
    });

    it('check for image processing to be not found and generated', () => {
        getcheck(pathh, filenamee1).then(function (result1: string) {
            if (result1 == 'no') {
                resizeImage('robo', 600, 600);
                setTimeout(() => {
                    getcheck(pathh, filenamee).then(function (result1: string) {
                        expect(result1).toEqual('yes');
                    });
                }, 500);
            }
        });
    });
});
