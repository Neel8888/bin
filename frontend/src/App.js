// frontend/src/App.js
import React, { useState } from "react";
import ProductTracker from "./components/ProductTracker";
import BucketList from "./components/BucketList";

function App() {
  const [url, setUrl] = useState("");

  const handleSetUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <div>
      <h1>Amazon Product Tracker</h1>
      <ProductTracker url={url} setUrl={handleSetUrl} />
      <BucketList setUrl={handleSetUrl} />
    </div>
  );
}

export default App;
