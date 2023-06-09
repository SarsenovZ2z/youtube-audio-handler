import { Request, Response } from 'express'
import fs from 'fs';
import { public_dir, uploads_dir } from '../utils/path';

const mime = require('mime-types')
var ffmpeg = require('fluent-ffmpeg');

export interface UploadAudioRequest extends Request {
    file: Express.Multer.File,
}

export const handleUploadedAudio = (req: UploadAudioRequest, res: Response) => {
    const file: Express.Multer.File = req.file

    const ext: string = mime.extension(file.mimetype)
    const path: string = uploads_dir(file.filename)
    const newPath: string = uploads_dir(`${file.filename}.${ext}`)

    fs.rename(path, newPath, () => {
        convertToMp3(newPath, file.filename)
            .then((mp3Path) => {
                fs.unlink(newPath, () => { })
            })
    })

    res.json({
        success: true,
        filename: file.filename
    })
};

const convertToMp3 = (source: string, filename: string) => {
    return new Promise((resolve, reject) => {
        const output: string = public_dir(`audios/${filename}.mp3`)

        return ffmpeg(source)
            .on('error', (err: any) => {
                reject(err)
            })
            .on('end', () => {
                resolve(output)
            })
            .save(output)
    })
}