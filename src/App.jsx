import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/admin/HomePage";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
