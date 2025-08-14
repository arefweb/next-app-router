'use client';

import React, { useCallback, useMemo } from 'react';

import useGetUserInfo from './functions/use-get-user-info';
import useGetPortfolio from "./functions/use-get-portfolio";

function MyDesk() {
  const {
    data: UIdata,
    isError: UIisError,
    refetch: UIRefetch,
  } = useGetUserInfo();

  const {
    data: Pdata,
    isError: PIsError,
    refetch: PRefetch,
  } = useGetPortfolio();

  const userInfoData = useMemo(
    () => (UIisError ? undefined : UIdata),
    [UIisError, UIdata]
  );
  const portfolioData = useMemo(
    () => (PIsError ? undefined : Pdata),
    [PIsError, Pdata]
  );

  console.log('userInfo data >> ', userInfoData);
  console.log('UIisError > ', UIisError);

  console.log('portfolioData >> ', portfolioData);
  console.log('PIsError >> ', PIsError);

  const handleRefetch = useCallback(() => {
    UIRefetch();
    PRefetch();
  }, [PRefetch, UIRefetch]);

  return (
    <div>
      <p>
        This is my desk page
      </p>
      {(UIisError || PIsError) && (
        <p className="text-red-500">
          Something went wrong
        </p>
      )}
      <button
        type="button"
        onClick={() => handleRefetch()}
        className="border border-gray-200 rounded-md bg-white p-2 block m-2 cursor-pointer"
      >
        Fetch
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem('SHOULD_RETRY', 'true');
        }}
        className="border border-gray-200 rounded-md bg-white p-2 block m-2 cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}

export default MyDesk;