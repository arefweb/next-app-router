"use client";

import React, { useEffect, useState } from "react";
import http from "@/services/http";

function Users() {
  const [data, setData] = useState();

  useEffect(() => {
    http.get("/users").then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-bold">List Of Users (client component):</h3>
      <ul className="list-disc">
        {data?.map((item) => (
          <li key={item.first_name}>
            {item.first_name} {item.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users