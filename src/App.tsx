import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <Router>
        <RecoilRoot>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
        </RecoilRoot>
      </Router>
    </div>
  );
}

export default App;
