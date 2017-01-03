import { createAction } from 'redux-actions';

export const navigate = createAction('NAVIGATE', (toRoute) => ({ toRoute: toRoute }));