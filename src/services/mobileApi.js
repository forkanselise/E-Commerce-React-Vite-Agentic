// src/services/mobileApi.js
export const fetchMobilePhonesApi = async (page, pageSize, search, brand) => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('pageSize', pageSize);
  if (search) queryParams.append('search', search);
  if (brand) queryParams.append('brand', brand);
  
  const response = await fetch(`http://localhost:5000/api/MobilePhones?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch mobile phones');
  return response.json();
};
