import { daysEmitter, hoursEmitter } from '#common/utils/date/date';

// * JWT settings
export const EXPIRES_REFRESH_JWT = daysEmitter(7);
export const EXPIRES_JWT = hoursEmitter(1);
