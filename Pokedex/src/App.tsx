import { Route, Routes, NavLink } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { DetailsPage } from "./pages/DetailsPage";
import { TeamPage } from "./pages/TeamPage";
import { ErrorPage } from "./pages/ErrorPage";
import { useTeamStore } from "./features/team/useTeamStore";
import { MAX_TEAM_SIZE } from "./features/team/team.types";

function App() {
  const teamCount = useTeamStore((state) => state.members.length);
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Pokedex</NavLink>
          </li>
          <li>
            <NavLink to="/team">
              Team ({teamCount}/{MAX_TEAM_SIZE})
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/pokemon/:name" element={<DetailsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
