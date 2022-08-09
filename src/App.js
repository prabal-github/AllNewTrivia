import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Questions from "./components/Questions";
import Score from "./components/Score";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app w-full text-white">
      <Header />
      <main>
        <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/questions" element={<Questions />} />
              <Route exact path="/score" element={<Score />} />
            </Routes>
        </Router>
      </main>
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;
