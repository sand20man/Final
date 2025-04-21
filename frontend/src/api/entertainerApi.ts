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

const API_BASE_URL = 'https://localhost:5000/api/entertainers';

export const entertainerApi = {
  async getAll(): Promise<Entertainer[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return response.json();
  },

  async getById(id: number): Promise<Entertainer> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer');
    }
    return response.json();
  },

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

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  },
};
