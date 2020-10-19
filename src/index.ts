import express, { Application } from 'express';
import morgan from 'morgan'
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.settings();
        this.routes();
    }

    settings(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false }));
    }

    routes(): void {
        // Entradas de las rutas 
        
        // Ruta de login y registro
        this.app.use(indexRoutes);
    }

    middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('SERVER ON PORT:', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
