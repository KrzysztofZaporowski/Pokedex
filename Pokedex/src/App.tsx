import { Route, Routes, NavLink } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { DetailsPage } from "./pages/DetailsPage";
import { TeamPage } from "./pages/TeamPage";
import { ErrorPage } from "./pages/ErrorPage";
import { useTeamStore } from "./features/team/useTeamStore";
import { MAX_TEAM_SIZE } from "./features/team/team.types";
import { ThemeToggle } from "./components/ThemeToggle";
import styles from "./App.module.css";

function App() {
  const teamCount = useTeamStore((state) => state.members.length);
  return (
    <>
      <header className={styles.navbar}>
        <nav className={styles.navInner}>
          <NavLink to="/" className={styles.brand}>
            PokéBuilder
          </NavLink>

          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                Pokédex
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/team"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                Team ({teamCount}/{MAX_TEAM_SIZE})
              </NavLink>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>

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
