var request = require('request');

const base_url = 'http://localhost:4000/api?name=robo&width=600&hight=600';
const base_ur2 = 'http://localhost:4000/api?name=robo&width=yy&hight=600';
const base_ur3 = 'http://localhost:4000/api?name=robom&width=600&hight=600';

describe('endpoint test', () => {
    it('returns status code 200 when valid input', function (done) {
        request.get(base_url, function (error: any, response: any, body: any) {
            // Check for error
            if (error) {
                console.log(error);
                // Probably assert a failure here.
            }

            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('returns status code 404 when a not valid input', function (done) {
        //width is string not a number here
        request.get(base_ur2, function (error: any, response: any, body: any) {
            // Check for error
            if (error) {
                console.log(error);
                // Probably assert a failure here.
            }

            expect(response.statusCode).toBe(404);
            done();
        });
    });

    it('returns status code 404 when a src image is not exist', function (done) {
        //width is string not a number here
        request.get(base_ur3, function (error: any, response: any, body: any) {
            // Check for error
            if (error) {
                console.log(error);
                // Probably assert a failure here.
            }

            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
