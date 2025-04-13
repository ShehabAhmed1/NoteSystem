import { useState } from "react";
import { Form } from "react-router-dom";
import { NavBar } from "./NavBar";
function AddingNote() {
  //localStorage.clear();
  return (
    <>
      <NavBar />
      <section className="AddingNote">
        <div className="main-container">
          <h1 className="section-title "> ضيف ملحوظاتك يا معلم..! </h1>
          <div className="adding-content">
            <AddingForm />
            <ShowCategory />
          </div>
        </div>
      </section>
    </>
  );
}

//c1 Adding Note form
function AddingForm() {
  const [category, SetCategory] = useState("");
  const [title, SetTitle] = useState("");
  const [note, Setnote] = useState("");
  return (
    <form>
      <div className="field">
        <label htmlFor="category">الفئة:</label>
        <input
          type="text"
          name="category"
          id="category"
          required
          onChange={(event) => {
            SetCategory(event.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="title">العنوان:</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={(event) => {
            SetTitle(event.target.value);
          }}
        />
      </div>
      <div className="field">
        <label htmlFor="note">الملحوظه:</label>
        <textarea
          required
          onChange={(event) => {
            Setnote(event.target.value);
          }}
        ></textarea>
      </div>
      <input
        type="submit"
        value="سجل الملحوظه"
        className="submit"
        onClick={() => {
          StoreNote(category, title, note);
        }}
      />
    </form>
  );
}

//c2 show category from localStorage
function ShowCategory() {
  const noteDatabase = JSON.parse(localStorage.getItem("noteDatabase")) || {};
  if (!noteDatabase) {
    return;
  }
  return (
    <div className="categories">
      <h1>الفئات المتاحه بالفعل</h1>
      <ol>
        {Object.keys(noteDatabase).map((k, index) => {
          return <li key={index}>{k}</li>;
        })}
      </ol>
    </div>
  );
}

//function to store Note in localStorage
function StoreNote(category, title, note) {
  if (category && title && note) {
    const noteDatabase = JSON.parse(localStorage.getItem("noteDatabase")) || {};

    if (!noteDatabase[category]) {
      noteDatabase[category] = [];
    }

    noteDatabase[category].push({ title: title, note: note });

    localStorage.setItem("noteDatabase", JSON.stringify(noteDatabase));
  }
}
export { AddingNote, ShowCategory };
