const sharp = require('sharp');
async function resizeImage(name: string, width: number, hight: number) {
    await sharp('src/images/' + name + '.jpg')
        .resize(width, hight)
        .toFile('src/images/processed_images/resize_' + name + '_' + String(width) + '_' + String(hight) + '.jpg');
}
module.exports = resizeImage;
