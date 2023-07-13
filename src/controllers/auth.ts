import { Request, Response } from 'express'

export const getDeviceUid =(req: Request, res: Response) => {

    res.json({
        success: true,
        uid: 'qwe'
    })
}