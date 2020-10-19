import { Router } from 'express';

import { indexController } from '../controllers/indexController'
import { participanteController } from '../controllers/participanteController';

class IndexRoutes {
    
    public router: Router = Router();

    constructor() {
        this.settings();
    }

    settings(): void {
        this.router.get('/', indexController.index );
        this.router.get('/participante', participanteController.index );
        this.router.post('/participante', participanteController.add );
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;