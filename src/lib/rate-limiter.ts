/**
 * Simple rate limiter — ensures a minimum interval between successive calls.
 * Shared between Overpass and Nominatim services.
 */

export class RateLimiter {
  private lastCall = 0;

  constructor(private readonly intervalMs: number) {}

  /** Wait until the minimum interval has elapsed since the last call. */
  async throttle(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastCall;
    if (elapsed < this.intervalMs) {
      const wait = this.intervalMs - elapsed;
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
    this.lastCall = Date.now();
  }

  /** Reset the timer (e.g. after an error that should not count). */
  reset(): void {
    this.lastCall = 0;
  }
}
