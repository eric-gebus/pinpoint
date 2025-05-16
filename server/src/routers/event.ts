import { Router } from 'express';
import { favoriteEvent, searchEvents,favoriteEventList, removeFavoriteEvent} from '../controllers/event';

const eventRouter=Router();

eventRouter.post('/search',searchEvents);
eventRouter.post('/favorite',favoriteEvent);
eventRouter.get('/favoriteEvents',favoriteEventList);
eventRouter.delete('/removeFavoriteEvent/:id',removeFavoriteEvent);

export default eventRouter;