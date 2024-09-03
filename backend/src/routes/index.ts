import { Router } from 'express';
import { tasksRoutes } from './tasksRoutes';
import { csvRoutes } from './csvRoutes';

export const routes = Router();

routes.use('/tasks', tasksRoutes)
routes.use('/multipart', csvRoutes)