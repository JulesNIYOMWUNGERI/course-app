import { useLanguage } from "../../../contexts/LanguageProviderContext";
import { useUserContext } from "../../../contexts/UserProviderContext";
import type { User } from "../../../pages/Administration/user/types";
import Dialog from "../Dialog";
import "./DeleteDialog.css";
import {Api} from "../../../api/UsersApi.tsx";
import {useToast} from "../../../contexts/ToastProvider.tsx";
import {useState} from "react";

interface DeleteDialogProps {
  user: User;
  onClose: () => void;
}

function DeleteDialog({ user, onClose }: DeleteDialogProps) {
  const { fetchUsers } = useUserContext();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    if (user.id) {
      await Api.deleteUser(
          user.id,
          setLoading,
          showToast,
          onClose
      );
      fetchUsers();
    }
  };

  return (
    <Dialog isOpen={true} onClose={onClose} title={t(`alert`)}>
      <div className="container">
        <span>{t("areYouSureYouWantToDeleteThisUser")}?</span>
        <div className="button-actions">
          <button type="button" className="btns" onClick={deleteUser} disabled={loading}>
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
