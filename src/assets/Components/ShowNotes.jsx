import { useState } from "react";
import { NavBar } from "./NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ShowCategory } from "./AddingNote";
import { FaTrashRestore } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function ShowNotes() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [noteDatabase, setNoteDatabase] = useState(
    JSON.parse(localStorage.getItem("noteDatabase")) || {}
  );
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

function CategoryNotes({ show, category, noteDatabase, setNoteDatabase }) {
  const [shownoteStates, setShownoteStates] = useState({});
  const [deletionState, setDeletionState] = useState({
    show: false,
    type: "",
    index: null,
  });

  const toggleNote = (index) => {
    setShownoteStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!category || !noteDatabase[category]) return null;

  return (
    show && (
      <div className="category-notes">
        <h1>
          <Remove
            type="category"
            index={null}
            setDeletionState={setDeletionState}
          />
          {category}
        </h1>
        <ul>
          {noteDatabase[category].map((e, i) => (
            <li key={i}>
              <div className="note-title">
                <div className="operations">
                  <Remove
                    type="item"
                    index={i}
                    setDeletionState={setDeletionState}
                  />
                  <Edit
                    category={category}
                    index={i}
                    noteDatabase={noteDatabase}
                    setNoteDatabase={setNoteDatabase}
                  />
                </div>
                <p>{e.title}</p>
                <NoteIcon
                  shownote={shownoteStates[i] || false}
                  setshownote={() => toggleNote(i)}
                />
              </div>
              {shownoteStates[i] && (
                <p className={`${testLanguage(e.note)}`}>{e.note}</p>
              )}
            </li>
          ))}
        </ul>
        {deletionState.show && (
          <ConfirmDeleting
            deletionState={deletionState}
            setDeletionState={setDeletionState}
            noteDatabase={noteDatabase}
            setNoteDatabase={setNoteDatabase}
            category={category}
          />
        )}
      </div>
    )
  );
}

/**************** REMOVE ****************/
function Remove({ type, index, setDeletionState }) {
  function handelDeletion() {
    if (type == "item") {
      setDeletionState({ show: true, type: "item", index: index });
    } else {
      setDeletionState({ show: true, type: "category", index: null });
    }
  }
  return (
    <div className="remove" onClick={handelDeletion}>
      <FaTrashRestore />
    </div>
  );
}

/**************** EDIT ****************/

function Edit({ category, index, noteDatabase, setNoteDatabase }) {
  const [window, setWindow] = useState(false);
  const [newnote, setnewnote] = useState({ title: "", note: "" });

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedDatabase = { ...noteDatabase };
    updatedDatabase[category][index] = newnote;

    localStorage.setItem("noteDatabase", JSON.stringify(updatedDatabase));
    setNoteDatabase(updatedDatabase); // assuming you have a setter like useState
    setnewnote({ title: "", note: "" });
    setWindow(false);
  };
  return (
    <div className="Edit">
      <MdModeEditOutline
        onClick={() => {
          setWindow(true);
        }}
      />
      {window && (
        <div className="edit-window">
          <form>
            <div className="close" onClick={() => setWindow(false)}>
              <IoIosCloseCircle />
            </div>
            <h2>Edit Note</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(event) => {
                setnewnote({ ...newnote, title: event.target.value });
              }}
              value={newnote.title}
            />
            <label htmlFor="note">Note:</label>
            <textarea
              id="note"
              name="note"
              onChange={(event) => {
                setnewnote({ ...newnote, note: event.target.value });
              }}
              value={newnote.note}
            ></textarea>
            <input
              type="submit"
              onClick={(e) => {
                handleEdit(e);
              }}
              value="Save"
            />
          </form>
        </div>
      )}
    </div>
  );
}

/**************** NOTE ICON TOGGLE ****************/
function NoteIcon({ shownote, setshownote }) {
  return (
    <div className="note-icon" onClick={setshownote}>
      {shownote ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
}

/**************** CONFIRM DELETING MODAL ****************/
function ConfirmDeleting({
  deletionState,
  setDeletionState,
  noteDatabase,
  setNoteDatabase,
  category,
}) {
  const handleDelete = () => {
    if (deletionState.type === "item") {
      removeItem(noteDatabase, setNoteDatabase, category, deletionState.index);
    } else {
      removeCategory(noteDatabase, setNoteDatabase, category);
    }
    setDeletionState({ show: false, type: "", index: null });
  };

  return (
    <div className="confirm-deleting">
      <p>Are you sure you want to delete this?</p>
      <div className="toggle">
        <button
          className="cancel"
          onClick={() =>
            setDeletionState({ show: false, type: "", index: null })
          }
        >
          Cancel
        </button>
        <button className="sure" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

/**************** REMOVE ITEM FUNCTION ****************/
function removeItem(noteDatabase, setNoteDatabase, category, index) {
  if (!Array.isArray(noteDatabase[category])) return;
  const newNoteDatabase = { ...noteDatabase };
  newNoteDatabase[category] = newNoteDatabase[category].filter(
    (_, i) => i !== index
  );
  localStorage.setItem("noteDatabase", JSON.stringify(newNoteDatabase));
  setNoteDatabase(newNoteDatabase);
}

/**************** REMOVE CATEGORY FUNCTION ****************/
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
