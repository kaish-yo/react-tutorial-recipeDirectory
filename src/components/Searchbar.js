// 機能要約:
// onChnageでuseStateで検索バーの入力内容をリアルタイムで更新する、
// onSubmitで検索結果の画面へredirectする

//styles
import "./Searchbar.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory(); // necessary to redirect

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
