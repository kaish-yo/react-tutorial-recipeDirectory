import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./NavBar.css";

//components
import Searchbar from "./Searchbar";

export default function NavBar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
