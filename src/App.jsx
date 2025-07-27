import { AddingNote } from "./assets/Components/AddingNote";
import { ShowNotes } from "./assets/Components/ShowNotes";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <main className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<AddingNote />} />
          <Route path="/shownotes" element={<ShowNotes />} />
        </Routes>
      </HashRouter>
    </main>
  );
}

export default App;
