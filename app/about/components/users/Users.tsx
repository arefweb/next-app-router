"use client";

import useUsers from "../../utils/use-users";

function Users() {
  const {
    data,
    // isLoading,
    // isError,
  } = useUsers();
  const entities = data?.entities ?? [];

  return (
    <div>
      <h3 className="text-2xl font-bold">List Of Users (client component):</h3>
      <ul className="list-disc">
        {entities?.map((item) => (
          <li key={item.fullName}>
            {item.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users