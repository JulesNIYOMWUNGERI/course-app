import { memo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { UserDialog } from "../../../../components";
import { useLanguage } from "../../../../contexts/LanguageProviderContext";

export default memo(() => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button className="create-user-btn" onClick={() => setOpen(true)}>
        <span>{t("createNewUser")}</span>
        <FaUserPlus />
      </button>
      {open && <UserDialog onClose={() => setOpen(false)} />}
    </>
  );
});
