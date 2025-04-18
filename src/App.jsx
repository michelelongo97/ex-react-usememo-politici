import { useState, useEffect, useMemo } from "react";

function App() {
  const [politicans, setPoliticans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((response) => response.json())
      .then((data) => setPoliticans(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicans.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(search.toLowerCase());
      return isInName || isInBio;
    });
  }, [politicans, search]);

  return (
    <div>
      <h1>Lista Politici</h1>
      <input
        type="text"
        placeholder="Cerca un politico"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPoliticians.map((politician) => (
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
