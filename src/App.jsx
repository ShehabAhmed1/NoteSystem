import { useState } from "react";
import { AddingNote } from "./assets/Components/AddingNote";
import { ShowNotes } from "./assets/Components/ShowNotes";
import {
  BrowserRouter,
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
const router = createHashRouter([
  { path: "/", element: <AddingNote /> },
  { path: "/show-notes", element: <ShowNotes /> },
]);
function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
