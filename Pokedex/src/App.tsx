import { Route, Routes, NavLink } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { DetailsPage } from "./pages/DetailsPage";
import { TeamPage } from "./pages/TeamPage";
import { ErrorPage } from "./pages/ErrorPage";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Pokedex</NavLink>
          </li>
          <li>
            <NavLink to="/team">Team page</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/details/:name" element={<DetailsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
