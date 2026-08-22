const EXPERIENCE_START_DATE = '2011-06-01';

/**
 * Returns completed years of professional experience as a resume-friendly label.
 * The value updates automatically as each June anniversary is reached.
 */
export const getExperienceYearsLabel = (startDate = EXPERIENCE_START_DATE, today = new Date()) => {
  const start = new Date(`${startDate}T00:00:00`);
  let completedYears = today.getFullYear() - start.getFullYear();

  const anniversaryReached =
    today.getMonth() > start.getMonth() ||
    (today.getMonth() === start.getMonth() && today.getDate() >= start.getDate());

  if (!anniversaryReached) completedYears -= 1;

  return `${Math.max(0, completedYears)}+`;
};

export { EXPERIENCE_START_DATE };
