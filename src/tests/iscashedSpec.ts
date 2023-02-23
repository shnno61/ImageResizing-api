import path from 'path';
const getcheckk = require(path.resolve(__dirname, '../utilities/cash.js'));

const testFolder1 = './src/images/';
const filen3 = 'robo.jpg';
const filen4 = 'roboO.jpg';

describe('test iscashed function ', () => {
    it('expect name robo width 600 hight 600 to be found ', () => {
        getcheckk(testFolder1, filen3).then((result: String) => {
            expect(result).toEqual('yes');
        });
    });

    it('expect name robo width 600 hight 300 to not be found ', () => {
        getcheckk(testFolder1, filen4).then((result: String) => {
            expect(result).toEqual('no');
        });
    });
});
