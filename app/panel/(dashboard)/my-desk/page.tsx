'use client';

import React from 'react';

import useGetUserInfo from './functions/use-get-user-info';

function MyDesk() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetUserInfo();

  console.log('userInfo data >> ', data);

  return (
    <div>
      <p>
        This is my desk page
      </p>
      {isError && (
        <p className="text-red-500">
          Something went wrong
        </p>
      )}
      <button
        onClick={() => refetch()}
        className="border border-gray-200 rounded-md bg-white p-2 block m-2"
      >
        Fetch
      </button>
      <button
        onClick={() => {}}
        className="border border-gray-200 rounded-md bg-white p-2 block m-2"
      >
        Retry
      </button>
    </div>
  );
}

export default MyDesk;