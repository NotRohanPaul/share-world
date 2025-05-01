import { BrowserRouter, Route, Routes } from "react-router";
import {LandingPage} from "./pages/landing-page";
import {AuthPage} from "./pages/auth-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
