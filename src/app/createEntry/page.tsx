"use client";

import { useState } from "react";

const CreateEntryPage = () => {
  const [date, setDate] = useState("");
  const [musicString, setMusicString] = useState("");
  const [animationURL, setAnimationURL] = useState("");
  const [voiceString, setVoiceString] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        musicString,
        animationURL,
        voiceString,
        text,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage("Entry created successfully");
      // Reset form fields
      setDate("");
      setMusicString("");
      setAnimationURL("");
      setVoiceString("");
      setText("");
    } else {
      const data = await response.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Create a New Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Music String:</label>
          <input
            type="text"
            value={musicString}
            onChange={(e) => setMusicString(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Animation URL:</label>
          <input
            type="text"
            value={animationURL}
            onChange={(e) => setAnimationURL(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Voice String:</label>
          <input
            type="text"
            value={voiceString}
            onChange={(e) => setVoiceString(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Entry</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateEntryPage;
