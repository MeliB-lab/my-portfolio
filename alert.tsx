import { HashRouter, Routes, Route } from "react-router";
import { Portfolio } from "./Portfolio";
import { UnifiedExperiencePage } from "./pages/UnifiedExperiencePage";
import { USDAMSPage } from "./pages/USDAMSPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/unified-experience" element={<UnifiedExperiencePage />} />
        <Route path="/work/usda-ams" element={<USDAMSPage />} />
      </Routes>
    </HashRouter>
  );
}
