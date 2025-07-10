import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FormApp from "./pages/FormApp";
import NotesApp from "./pages/NotesApp";
// import CvMaker from "./pages/CvMaker";  // ❌ No longer needed if you're replacing it
import CvEditorPage from "./components/CvEditorPage"; // ✅ New full CV maker with preview

function App() {
  return (<div className="bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400">
    <Router>
      <Navbar />
      <div className="p-4  text-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/work/form" element={<FormApp />} />
          <Route path="/work/notes" element={<NotesApp />} />
          <Route path="/work/cv-maker" element={<CvEditorPage />} /> {/* ✅ Here */}
        </Routes>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
