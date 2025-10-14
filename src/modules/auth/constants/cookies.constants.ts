import { daysEmitter, hoursEmitter } from '#common/utils/date/date';

// * Cookie settings for storing JWT
export const COOKIE_MAX_AGE_JWT = hoursEmitter(1); // 1 hour
export const COOKIE_MAX_AGE_REFRESH = daysEmitter(7); // 7 days';
export const JWT_COOKIE = 'jwt-cookie';
export const JWT_GUARD = 'jwt-guard';
// * Refresh JWT
export const ROLES_COOKIE_MAX_AGE = daysEmitter(7);
export const REFRESH_COOKIE = 'refresh-cookie';
export const REFRESH_JWT_GUARD = 'refresh-guard';
