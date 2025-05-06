import { Router } from 'express';
import { searchEvents } from '../controllers/event';

const eventRouter=Router();

eventRouter.get('/search',searchEvents);

export default eventRouter;