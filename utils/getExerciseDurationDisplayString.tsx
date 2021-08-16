/**
 * getExerciseDurationDisplayString converts number of seconds into minutes:seconds.
 * 
 * `72 => '1:12'`.
 *
 * If minutes is zero, only seconds will appear.
 * All single digit numbers have `0` in-front.
 *
 * @param num
 * @param keepZeroMinutes optional, if set to `true` the returned string will include minutes even when zero, ie `0:30`
 */
export function getExerciseDurationDisplayString(
  num: number,
  keepZeroMinutes = false,
): string {
  if (num <= 0) return keepZeroMinutes ? "0:00" : "0";

  if (num < 60 && !keepZeroMinutes) return `${num}`;

  let minutes: string | number | null = Math.floor(num / 60);
  let seconds: string | number = num % 60;

  if (minutes <= 0) minutes = keepZeroMinutes ? "0" : null;

  if (seconds <= 0) seconds = "00";
  else if (seconds < 10) seconds = `0${seconds}`;

  if (!minutes) return `${seconds}`;

  return `${minutes}:${seconds}`;
}
