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

  const postData = async (url, body) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      if (response.ok || response.status === 200) {
        console.log('$ DEBUG response', response);
        return JSON.parse(await response.text());
      }
    } catch (e) {
      console.log('$ ERROR e', e);
    }
  };

  const patchData = async (url, body) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      if (response.ok || response.status === 200) {
        console.log('$ DEBUG response', response);
        return JSON.parse(await response.text());
      }
    } catch (e) {
      console.log('$ ERROR e', e);
    }
  };

  const deleteData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
      });
      if (response.ok || response.status === 200) {
        return response;
      }
    } catch (e) {
      console.log('$ ERROR e', e);
    }
  };

  return {
    getData,
    postData,
    patchData,
    deleteData,
  };
};
