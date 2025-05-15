import { AppProviders } from "./providers";
import { AppRouter } from "./routes/app-router";

export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

