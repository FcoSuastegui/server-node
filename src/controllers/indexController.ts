import { Request, Response } from 'express';

class IndexController { 
    public async index( req:Request, res:Response ): Promise<any> {
        return res.json({
            status: true,
            message: "Bienvenido al api rest"
        })
    }
}


export const indexController = new IndexController();