export const getStartAndEndTimestamps = (
  days: number
): { start: number; end: number } => {
  const now = Math.floor(Date.now() / 1000);
  const duration = days * 86400;
  return {
    start: now,
    end: now + duration,
  };
};
