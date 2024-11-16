"use client";

import React, { useState } from "react";

const Counter = ({ users }) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>;
    </div>
  );
};

export default Counter;
