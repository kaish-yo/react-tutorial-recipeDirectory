import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams(); // this comes from routes
  const { mode } = useTheme();

  // const url = "http://localhost:3000/recipes/" + id;
  // const { error, isPending, data: recipe } = useFetch(url);
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true); // start query

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      // .get()
      // .then((doc) => {
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false); // finish query
          setRecipe(doc.data());
        } else {
          setIsPending(false); // finish query
          setError("Could not find that recipe");
        }
      });
    return () => unsub();
  }, [id]);

  // update the document
  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something completely different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p> Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}> Update me</button>
        </>
      )}
    </div>
  );
}
