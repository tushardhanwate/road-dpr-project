import { useState, useEffect } from "react";

function TableEntry() {
  const [rows, setRows] = useState([{}]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/master/activity")
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const handleChange = (i, e) => {
    const newRows = [...rows];
    newRows[i][e.target.name] = e.target.value;

    const l = parseFloat(newRows[i].length) || 0;
    const w = parseFloat(newRows[i].width) || 0;
    const d = parseFloat(newRows[i].depth) || 0;

    newRows[i].qty = (l * w * d).toFixed(3);

    setRows(newRows);
  };

  const addRow = () => setRows([...rows, {}]);

  const save = async () => {
    await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rows)
    });

    alert("Saved");
  };

  return (
    <div>
      <h2>DPR Entry</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Activity</th>
            <th>From</th>
            <th>To</th>
            <th>Side</th>
            <th>L</th>
            <th>W</th>
            <th>D</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Lead</th>
            <th>Trips</th>
            <th>Remark</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>

              <td>
                <select name="activity" onChange={(e) => handleChange(i, e)}>
                  <option>Select</option>
                  {activities.map((a, idx) => (
                    <option key={idx}>{a.value}</option>
                  ))}
                </select>
              </td>

              <td><input name="from" onChange={(e)=>handleChange(i,e)} /></td>
              <td><input name="to" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input name="side" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input name="length" onChange={(e)=>handleChange(i,e)} /></td>
              <td><input name="width" onChange={(e)=>handleChange(i,e)} /></td>
              <td><input name="depth" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input value={r.qty || ""} readOnly /></td>

              <td><input name="unit" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input name="lead" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input name="trips" onChange={(e)=>handleChange(i,e)} /></td>

              <td><input name="remark" onChange={(e)=>handleChange(i,e)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>Add Row</button>
      <button onClick={save}>Save</button>
    </div>
  );
}

export default TableEntry;
