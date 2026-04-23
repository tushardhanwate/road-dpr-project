import { useState } from "react";

function AdminPanel() {
  const [type, setType] = useState("activity");
  const [value, setValue] = useState("");

  const add = async () => {
    await fetch("http://localhost:5000/master/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type, value })
    });

    alert("Added");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="activity">Activity</option>
        <option value="side">Side</option>
        <option value="unit">Unit</option>
      </select>

      <input onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />

      <button onClick={add}>Add</button>
    </div>
  );
}

export default AdminPanel;
