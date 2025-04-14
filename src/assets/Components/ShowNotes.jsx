import { useState } from "react";
import { NavBar } from "./NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ShowCategory } from "./AddingNote";
import { FaTrashRestore } from "react-icons/fa";

function ShowNotes() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [noteDatabase, setNoteDatabase] = useState(
    JSON.parse(localStorage.getItem("noteDatabase")) || {}
  );
  testLanguage("Shehab");
  testLanguage("شهاب");
  return (
    <>
      <NavBar />
      <section className="ShowNotes">
        <div className="main-container">
          <div className="shownotes-content">
            <CatchCategory setShow={setShow} setCategory={setCategory} />
            <CategoryNotes
              show={show}
              category={category}
              noteDatabase={noteDatabase}
              setNoteDatabase={setNoteDatabase}
            />
            <ShowCategory />
          </div>
        </div>
      </section>
    </>
  );
}

// com_ Catch the Category by field
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

// com_ Show Notes related to category
function CategoryNotes({ show, category, noteDatabase, setNoteDatabase }) {
  // Initialize state for all notes' visibility
  const [shownoteStates, setShownoteStates] = useState({});

  // Toggle visibility for a specific note
  const toggleNote = (index) => {
    setShownoteStates((prev) => ({
      ...prev,
      [index]: !prev[index], // { => index:!undefine => index:true=> 0:true} وكل مرة يضغط علي عنصر هيزود الاندكس بتاعه يعني مش بيعبي من الاول لا ده بيعبي حاله كل عنصر لما تدوس عليه وبعد كده يبقي يتحدث
    }));
  };

  if (!category || !noteDatabase[category]) {
    return null; // Return null for clarity
  }

  return (
    show && (
      <div className="category-notes">
        <h1>
          <RemoveCategory
            noteDatabase={noteDatabase}
            setNoteDatabase={setNoteDatabase}
            category={category}
          />
          {category}
        </h1>
        <ul>
          {noteDatabase[category].map((e, i) => (
            <li key={i}>
              <div className="note-title">
                <RemoveItem
                  noteDatabase={noteDatabase}
                  setNoteDatabase={setNoteDatabase}
                  category={category}
                  index={i}
                />
                <p>{e.title}</p>
                <NoteIcon
                  shownote={shownoteStates[i] || false}
                  setshownote={() => toggleNote(i)}
                />
              </div>
              {shownoteStates[i] ? (
                <p className={`${testLanguage(e.note)}`}>{e.note}</p>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

// com_ contain Icon to remove item
function RemoveItem({ noteDatabase, setNoteDatabase, category, index }) {
  return (
    <div
      className="remove"
      onClick={() => {
        removeItem(noteDatabase, setNoteDatabase, category, index);
      }}
    >
      <FaTrashRestore />
    </div>
  );
}

//com_ contain icon to remove category
function RemoveCategory({ noteDatabase, setNoteDatabase, category }) {
  return (
    <div
      className="remove"
      onClick={() => removeCategory(noteDatabase, setNoteDatabase, category)}
    >
      <FaTrashRestore />
    </div>
  );
}

// com_ show Icon in li
function NoteIcon({ shownote, setshownote }) {
  return (
    <div className="note-icon" onClick={setshownote}>
      {shownote ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
}

/************************************** */
/************** functions ***************/

// function Remove item
function removeItem(noteDatabase, setNoteDatabase, category, index) {
  if (!Array.isArray(noteDatabase[category])) return;

  const newNoteDatabase = { ...noteDatabase };
  newNoteDatabase[category] = newNoteDatabase[category].filter(
    (_, i) => i !== index
  );

  localStorage.setItem("noteDatabase", JSON.stringify(newNoteDatabase));
  setNoteDatabase(newNoteDatabase);
}

// function Remove category
function removeCategory(noteDatabase, setNoteDatabase, category) {
  if (!noteDatabase[category]) return;

  const newNoteDatabase = { ...noteDatabase };

  delete newNoteDatabase[category];

  localStorage.setItem("noteDatabase", JSON.stringify(newNoteDatabase));
  setNoteDatabase(newNoteDatabase);
}

//function to determine the language if en write from ltr and if it arabic write rtl
function testLanguage(sent_) {
  const hasEnglish = /[a-z]/i.test(sent_);
  const hasArabic = /[\u0600-\u06FF]/.test(sent_);

  if (hasEnglish && hasArabic) {
    return "er";
  } else if (hasEnglish) {
    return "en";
  } else if (hasArabic) {
    return "ar";
  }
}

export { ShowNotes };
