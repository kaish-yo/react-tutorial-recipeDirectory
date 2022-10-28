import { useEffect, useState } from "react";

// style
import "./Home.css";

// hooks
// import useFetch from "../../hooks/useFetch";

// import firebase config
import { projectFirestore } from "../../firebase/config";

// components
import RecipeList from "../../components/RecipeList";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true); // enable loading window

    // get data from firebase
    const unsub = projectFirestore
      .collection("recipes")
      // .get()
      // .then((snapshot) => {
      // this function lets snapshots sent everytime the database is updated in firebase
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("No recipes to load");
            setIsPending(false);
          } else {
            let results = [];
            console.log(snapshot);
            snapshot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
              console.log(results);
            });
            setData(results); // reflect the data
            setIsPending(false); // disable loading window
          }
        },
        (err) => {
          // disable loading window
          setError(err.message);
          setIsPending(false);
        }
      );
    return () => unsub(); // to clean up (I don't know why exactly...)
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
