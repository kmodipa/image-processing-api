import fs from 'fs';
const sharp = require('sharp');
export class ImageProcessorService {
    static resizedImagesPath = `${process.cwd()}/src/images/resized`;
    static originalImagesPath = `${process.cwd()}/src/images/original`;
    public static checkIfResizedImageExists(fileName: string, width: number, height: number): string {
        let filePath: string;
        if (fileName && width && height) {
            filePath = `${this.resizedImagesPath}/${fileName}_${width}x${height}.jpg`;
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
        return null;
    }

    public static checkIfOriginalImageExists(fileName: string): boolean {
        const path = `${this.originalImagesPath}/${fileName}.jpg`;
        return fs.existsSync(path);
    }

    public static saveProcessedImageFile(buffer: Buffer, fileName: string, width: number, height: number): void {
        if (fileName && width && height) {
            const newFileName = `${this.resizedImagesPath}/${fileName}_${width}x${height}.jpg`;
            fs.writeFile(newFileName, buffer, () => {});
        }
    }

    public static async resizeImageFile(fileName: string, width: number, height: number): Promise<Buffer> {
        const path = `${this.originalImagesPath}/${fileName}.jpg`;
        if (fileName && height && width) {
            return await sharp(path).rotate().resize(width, height).jpeg({ mozjpeg: true }).toBuffer();
        }
    }
}
