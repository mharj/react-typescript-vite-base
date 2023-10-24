import {createAction} from '@reduxjs/toolkit';

/**
 * error action
 */
export const appError = createAction<unknown>('global/error');

/**
 * Reset state to initial state
 */
export const resetAction = createAction<void>('global/reset');
