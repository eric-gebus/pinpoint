import { Router } from 'express';
import { favoriteEvent, searchEvents,favoriteEventList } from '../controllers/event';

const eventRouter=Router();

eventRouter.post('/search',searchEvents);
eventRouter.post('/favorite',favoriteEvent);
eventRouter.get('/favoriteEvents',favoriteEventList);


export default eventRouter;