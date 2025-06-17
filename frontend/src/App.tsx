import { RouterProvider } from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageProviderContext";
import { UserProvider } from "./contexts/UserProviderContext";
import router from "./routes";

function App() {
  return (
      <LanguageProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </LanguageProvider>
  );
}

export default App;
