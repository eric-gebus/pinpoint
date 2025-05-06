import { Router } from 'express';
import { searchEvents } from '../controllers/event';

const eventRouter=Router();

eventRouter.post('/search',searchEvents);

export default eventRouter;