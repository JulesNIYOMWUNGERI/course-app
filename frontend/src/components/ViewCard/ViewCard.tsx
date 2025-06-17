import { useLanguage } from "../../contexts/LanguageProviderContext";
import type { ViewTypes } from "../../utils/types";

interface ViewCardProps {
  view: ViewTypes;
  onNavigate: (path: string) => void;
}

const ViewCard = ({ view, onNavigate }: ViewCardProps) => {
  const { t } = useLanguage();

  const handleClick = () => {
    onNavigate(view.path);
  };
  return (
    <div
      onClick={handleClick}
      className="card"
      style={{ backgroundImage: `url(${view.image})` }}
    >
      <div className="overlay">
        <p>{t(view.title)}</p>
      </div>
    </div>
  );
};

export default ViewCard;
