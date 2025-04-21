/**
 * Interface defining the structure of an Entertainer object
 * Matches the backend Entertainer model
 */
export interface Entertainer {
  entertainerId: number;
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  dateEntered: string | null;
}

// Base URL for the entertainers API endpoints
const API_BASE_URL = 'https://localhost:5000/api/entertainers';

/**
 * API service for managing entertainers
 * Provides CRUD operations for entertainer data
 */
export const entertainerApi = {
  /**
   * Fetches all entertainers from the backend
   * @returns Promise resolving to an array of Entertainer objects
   * @throws Error if the request fails
   */
  async getAll(): Promise<Entertainer[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return response.json();
  },

  /**
   * Fetches a single entertainer by ID
   * @param id - The ID of the entertainer to fetch
   * @returns Promise resolving to an Entertainer object
   * @throws Error if the request fails or entertainer is not found
   */
  async getById(id: number): Promise<Entertainer> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer');
    }
    return response.json();
  },

  /**
   * Creates a new entertainer
   * @param entertainer - The entertainer data to create (excluding entertainerId)
   * @returns Promise resolving to the created Entertainer object
   * @throws Error if the request fails
   */
  async create(
    entertainer: Omit<Entertainer, 'entertainerId'>
  ): Promise<Entertainer> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entertainer),
    });
    if (!response.ok) {
      throw new Error('Failed to create entertainer');
    }
    return response.json();
  },

  /**
   * Updates an existing entertainer
   * @param id - The ID of the entertainer to update
   * @param entertainer - The updated entertainer data
   * @returns Promise that resolves when the update is complete
   * @throws Error if the request fails
   */
  async update(id: number, entertainer: Entertainer): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entertainer),
    });
    if (!response.ok) {
      throw new Error('Failed to update entertainer');
    }
  },

  /**
   * Deletes an entertainer
   * @param id - The ID of the entertainer to delete
   * @returns Promise that resolves when the deletion is complete
   * @throws Error if the request fails
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  },
};
