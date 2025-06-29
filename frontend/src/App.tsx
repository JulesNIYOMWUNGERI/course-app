import { RouterProvider } from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageProviderContext";
import { UserProvider } from "./contexts/UserProviderContext";
import router from "./routes";
import {ToastProvider} from "./contexts/ToastProvider.tsx";

function App() {
  return (
      <ToastProvider>
        <LanguageProvider>
            <UserProvider>
              <RouterProvider router={router} />
            </UserProvider>
        </LanguageProvider>
      </ToastProvider>
  );
}

export default App;
