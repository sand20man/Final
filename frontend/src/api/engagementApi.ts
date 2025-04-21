export interface EntertainerEngagementStats {
  entertainerId: number;
  engagementCount: number;
  mostRecentDate: string | null;
}

const baseUrl = 'https://localhost:5000';

export const engagementApi = {
  getEntertainerStats: async (): Promise<EntertainerEngagementStats[]> => {
    const response = await fetch(`${baseUrl}/engagements/entertainer-stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
};
