import { useLanguage } from "../../../contexts/LanguageProviderContext";
import { useUserContext } from "../../../contexts/UserProviderContext";
import type { User } from "../../../pages/Administration/user/types";
import Dialog from "../Dialog";
import "./DeleteDialog.css";

interface DeleteDialogProps {
  user: User;
  onClose: () => void;
}

function DeleteDialog({ user, onClose }: DeleteDialogProps) {
  const { setUsers } = useUserContext();
  const { t } = useLanguage();

  const deleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose} title={t(`alert`)}>
      <div className="container">
        <span>{t("areYouSureYouWantToDeleteThisUser")}?</span>
        <div className="button-actions">
          <button type="button" className="btns" onClick={deleteUser}>
            {t("yes")}
          </button>
          <button type="submit" className="btns" onClick={onClose}>
            {t("no")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteDialog;
