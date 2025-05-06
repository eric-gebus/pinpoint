import { Router } from 'express';
import { searchAttractions } from '../controllers/attractions';

const attractionRouter = Router();

attractionRouter.get('/search', searchAttractions);

export default attractionRouter;