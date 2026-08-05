import profileData from '../data/profile.json';

/**
 * Service layer abstraction for Profile Data.
 * Currently imports static JSON from `src/data/profile.json`.
 * Structured asynchronously so it can be seamlessly swapped with PostgreSQL, Supabase,
 * MySQL, SQL Server, or a REST API backend with zero changes to React components.
 */
export const getProfileData = async () => {
  return new Promise((resolve) => {
    // Simulated micro-delay to mirror async API execution
    setTimeout(() => {
      resolve(profileData);
    }, 10);
  });
};
