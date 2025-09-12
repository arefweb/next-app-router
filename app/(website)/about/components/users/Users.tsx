"use client";

import useUsers from "../../functions/use-users";

function Users() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useUsers();
  const entities = data?.entities ?? [];

  return (
    <div>
      {isError && (
        <div>
          <p style={{ margin: 0, color: 'red'}}>Error</p>
          <button
            type="button"
            onClick={() => refetch()}
            style={{ border: "1px solid red" }}
          >
            Retry
          </button>
        </div>
      )}
      {isLoading && (
        <p style={{ margin: 0}}>Loading...</p>
      )}
      {!isError && !isLoading && (
        <ul className="list-disc">
          {entities?.map((item) => (
            <li key={item.fullName}>
              {item.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users