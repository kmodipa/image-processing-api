import fs from 'fs';
import { Request, Response } from 'express';
import { ImageProcessorService } from '../services/ImageProcessor.service';

export class ImageProcessorController {
    public static async resizeImage(req: Request, res: Response): Promise<void> {
        const queryParam = req.query;
        const fileName = queryParam.filename.toString();
        const height = +queryParam.height;
        const width = +queryParam.width;
        const path = process.cwd() + `/src/images/original/${queryParam.filename}.jpg`;

        if (fileName && height && width) {
            let resizedFilePath: string;
            if ((resizedFilePath = ImageProcessorService.checkIfResizedImageExists(fileName, width, height))) {
                fs.readFile(resizedFilePath, (err, content) => {
                    console.log(content);
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(content);
                });

                console.log(resizedFilePath);
            } else {
                ImageProcessorService.resizeImageFile(fileName, width, height)
                    .then((data) => {
                        ImageProcessorService.saveProcessedImageFile(data, fileName, width, height);
                        fs.readFile(path, (err, content) => {
                            res.writeHead(200, { 'Content-Type': 'image/jpg' });
                            res.end(data);
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send(err);
                        return;
                    });
                console.log('Original');
            }
        } else {
            res.send('Image parameters are incomplete');
        }
    }
}
