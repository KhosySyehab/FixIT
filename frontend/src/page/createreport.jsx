import { useState } from "react";
import { api } from "../api/api";

export default function CreateReport() {
  const [title,setTitle]=useState("");
  const [photo,setPhoto]=useState(null);

  const submit = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("photo", photo);

    await api.post("/reports", form, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    alert("Report created!");
  };

  return (
    <div>
      <input placeholder="Judul" onChange={e=>setTitle(e.target.value)} />
      <input type="file" onChange={e=>setPhoto(e.target.files[0])} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
