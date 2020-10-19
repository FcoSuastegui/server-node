import { Request, Response } from 'express';
import pool from '../database/connection';

class ParticipanteController { 
    public async index( req:Request, res:Response ): Promise<any> {
        try {
            const participantes = await pool.query('CALL ListarParticipantes()');
            return res.json({
                status: true,
                data: participantes[0]
            })
            
        } catch (error) {
            return res.json({
                status: true,
                error
            })
            
        }
    }

    public async add( req:Request, res:Response ): Promise<any> {
        const { nombre, paterno, materno, email, telefono, tipo, grado, institucion, tipo_institucion } = req.body
        try {
            const add = await pool.query('CALL GuardarParticipante(?,?,?,?,?,?,?,?,?)',
                [ nombre, paterno, materno, email, telefono, tipo, grado, institucion, tipo_institucion]
            );
            console.log(add)
            return res.json({
                status: true,
            })
            
        } catch (error) {
            return res.json({
                status: true,
                error
            })
            
        }
    }
}


export const participanteController = new ParticipanteController();