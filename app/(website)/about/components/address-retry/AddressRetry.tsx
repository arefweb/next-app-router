'use client';

import { useQuery } from "@tanstack/react-query";

import http from "@/shared/services/http";

function AddressRetry() {
  const {
    data,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
     queryKey: ['ADDRESS'],
    queryFn: () => http.get("/address"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded">
        <p className="text-red-600">Client retry failed: {error?.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
        >
          Retry Again *
        </button>
      </div>
    )
  }

  return (
    <div>
      <h3>Address:</h3>
      <p className="font-bold">{data?.data.data}</p>
    </div>
  );
}

export default AddressRetry;