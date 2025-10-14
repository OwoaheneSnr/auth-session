import { MinutesEmitter } from '#common/utils/date/date';
import { ThrottlerOptions } from '@nestjs/throttler';

const ttl = MinutesEmitter(1); // 1 minute
const limit = 20; // 20 requests
const blockDuration = MinutesEmitter(30); // 30 minute

export const THROTTLER_OPTIONS: ThrottlerOptions[] = [
  {
    ttl,
    limit,
    blockDuration,
  },
];
