import { useState, useEffect } from "react";

function App() {
  const [politicans, setPoliticans] = useState([]);

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((response) => response.json())
      .then((data) => setPoliticans(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Lista Politici</h1>

      {politicans.map((politician) => (
        <div key={politician.id}>
          <h3>{politician.name}</h3>
          <img src={politician.image} alt={politician.name} />
          <h5>{politician.state}</h5>
          <p>{politician.biography}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
