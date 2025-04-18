import { useState, useEffect, useMemo, memo } from "react";

const PoliticianCard = memo(({ name, image, position, biography }) => {
  console.log("card");
  return (
    <div className="card">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <h5>{position}</h5>
      <p>{biography}</p>
    </div>
  );
});

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
        <PoliticianCard key={politician.id} {...politician} />
      ))}
    </div>
  );
}

export default App;
