import React from 'react';

export const useApiRequest = () => {
  const getData = async (url, params = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        ...params,
      });
      if (response.ok || response.status === 200) {
        return JSON.parse(await response.text());
      }
    } catch (e) {
      console.log('$ ERROR e', e);
    }
  };

  return {
    getData,
  };
};
