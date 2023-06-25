import { useEffect, useState } from 'react';
import './App.css'

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    updateList(lastQuery);
  }, [])

  const updateList = async (search) => {
    const response = await fetch("http://localhost:8080?" + new URLSearchParams({search}));
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', search);
  };

  return [animals, updateList];
}

function App() {

  const [animals, updateList] = useAnimalSearch();  

  return (
    <main>
      <h1>Animal Farm</h1>
      <input type="text" name="search" placeholder="Search" onChange={(e) => updateList(e.target.value)}/>
      <ul>
        {animals.map((animal) => {
          return <li key={animal.id}>{`Type: ${animal.type}, Name: ${animal.name}, Age: ${animal.age},`}</li>
        })}
        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  )
}

export default App
