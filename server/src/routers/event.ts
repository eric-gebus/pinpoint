import { Router } from 'express';
import { favoriteEvent, searchEvents } from '../controllers/event';

const eventRouter=Router();

eventRouter.post('/search',searchEvents);
eventRouter.post('/favorite',favoriteEvent);

export default eventRouter;