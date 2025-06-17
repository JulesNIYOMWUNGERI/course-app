import { useNavigate } from "react-router-dom";

import { ViewCard } from "../../components";
import type { ViewTypes } from "../../utils/types";
import { Views } from "../../utils/utils";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <main className="card-grid">
      {Views.filter((view: ViewTypes) => view.image).map((view: ViewTypes) => (
        <ViewCard key={view.id} view={view} onNavigate={handleNavigation} />
      ))}
    </main>
  );
};

export default Home;
