/**
 * Interface defining the structure of engagement statistics for an entertainer
 * Contains the count of engagements and the most recent engagement date
 */
export interface EntertainerEngagementStats {
  entertainerId: number;
  engagementCount: number;
  mostRecentDate: string | null;
}

// Base URL for the engagements API endpoints
const baseUrl = 'https://localhost:5000';

/**
 * API service for managing engagement statistics
 * Provides methods to fetch engagement data for entertainers
 */
export const engagementApi = {
  /**
   * Fetches engagement statistics for all entertainers
   * @returns Promise resolving to an array of EntertainerEngagementStats objects
   * @throws Error if the request fails
   */
  getEntertainerStats: async (): Promise<EntertainerEngagementStats[]> => {
    const response = await fetch(`${baseUrl}/engagements/entertainer-stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
};
