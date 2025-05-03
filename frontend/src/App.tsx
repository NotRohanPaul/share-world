import { AppProviders } from "./providers";
import { AppRouter } from "./routes/app-router";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
