import { useState } from "react";

const ApiKeyForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("api_key", apiKey);
    onSubmit(apiKey);
  };

  return (
    <div>
      <h2>Please enter API Key</h2>
      <p>API Key can be generated <a href="https://www.themoviedb.org">here</a>. Create or login a profile, go the settings and create an API.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apiKey">API Key: </label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Your API Key"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <footer>The data has been taken from <a href="https://www.themoviedb.org">The Movie Database</a> </footer>
    </div>
  );
};

export default ApiKeyForm;
