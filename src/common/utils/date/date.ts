const MINUT = 60 * 1000;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export function daysEmitter(time: number) {
  return time * DAY;
}

export function MinutesEmitter(time: number) {
  return time * MINUT;
}

export function hoursEmitter(time: number) {
  return time * HOUR;
}
