const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const profileAPI = {
  getProfile: async (userId) => {
    console.log('API: Getting profile for userId:', userId);
    const response = await fetch(`${API_URL}/user-profile/${userId}`);
    const data = await response.json();
    console.log('API: Get profile response:', data);
    if (!response.ok) throw new Error(data.message || `HTTP ${response.status}`);
    return data;
  },

  updateProfile: async (userId, data) => {
    console.log('API: Updating profile:', { userId, data });
    const response = await fetch(`${API_URL}/user-profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('API: Update profile response:', result);
    if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
    return result;
  },

  uploadProfileImage: async (userId, file) => {
    console.log('API: Uploading image for userId:', userId);
    const formData = new FormData();
    formData.append('profileImage', file);
    const response = await fetch(`${API_URL}/user-profile/${userId}/image`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    console.log('API: Upload image response:', result);
    if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
    return result;
  }
};
