import { useState } from "react";
import { NavBar } from "./NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ShowCategory } from "./AddingNote";

function ShowNotes() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  return (
    <>
      <NavBar />
      <section className="ShowNotes">
        <div className="main-container">
          <div className="shownotes-content">
            <CatchCategory setShow={setShow} setCategory={setCategory} />
            <CategoryNotes show={show} category={category} />
            <ShowCategory />
          </div>
        </div>
      </section>
    </>
  );
}

//c1 Catch the Category by field
function CatchCategory({ setShow, setCategory }) {
  return (
    <>
      <form className="catch-category">
        <label htmlFor="category">اسم الفئة:</label>
        <input
          type="text"
          name="category"
          required
          id="category"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <div
          className="submit"
          onClick={() => {
            setShow(true);
          }}
        >
          هات الملاحظات
        </div>
      </form>
    </>
  );
}

//c2 show Notes related to category
function CategoryNotes({ show, category }) {
  const noteDatabase = JSON.parse(localStorage.getItem("noteDatabase")) || {};
  if (!category || !noteDatabase[category]) {
    return;
  }
  return (
    show && (
      <div className="category-notes">
        <h1>{category}</h1>
        <ul>
          {noteDatabase[category].map((e, i) => {
            const [shownote, setshownote] = useState(false);
            return (
              <li key={i}>
                <div className="note-title">
                  <p>{e.title}</p>
                  <NoteIcon shownote={shownote} setshownote={setshownote} />
                </div>
                {shownote ? <p>{e.note}</p> : ""}
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}

//c2.1 icon in li
function NoteIcon({ shownote, setshownote }) {
  return (
    <div
      className="note-icon"
      onClick={() => {
        setshownote(!shownote);
      }}
    >
      {shownote ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
}

export { ShowNotes };
