const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", function () {
  addNote();
});

// const getColor = () => {
//     // Hex Color
//     const randoNum = Math.floor(Math.random() * 16777215);
//     const randomCode = "#" + randoNum.toString(16);
//     document.body.style.backgroundColor = randomCode;
//     document.getElementById('color-code').innerText = randomCode;
//     navigator.clipboard.writeText(randomCode);
// }

// // Event Call
// document.getElementById("btn").addEventListener('click', getColor);

/* <div class="note">
            <div class="tool">
                <i class="fa-solid fa-floppy-disk"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
            <textarea></textarea>
        </div> */
// We replicating markup language into DOM(Document Object Model)

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
        <i class="colorChange fa-solid fa-paint-roller"></i>
    </div>
        <textarea placeholder="Enter your Note" class=textArea>${text}</textarea>
    `;

    note.addEventListener("click", function (event) {
    if (event.target.classList.contains("colorChange")) {
      const textArea = note.querySelector(".textArea");
      const randoNum = Math.floor(Math.random() * 16777215);
      const randomCode = "#" + randoNum.toString(16);
      textArea.style.backgroundColor = randomCode;
    }
  });

  note.querySelector(".trash").addEventListener("click", function () {
    let text = "Do you want to delete this Note?";
    if (confirm(text) == true) {
      note.remove();
      saveNotes();
    }
  });
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
    alert("Your note has been saved successfully");
  });
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  main.appendChild(note);
  saveNotes();
};

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  // console.log(data);
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

// save color
// const saveColor = () => {
//   const color = document.querySelector(".textArea");
//   const data = [];
//   color.forEach((textArea) => {
//     data.push(textArea.value);
//   });
//   // console.log(data);
//   if (data.length === 0) {
//     localStorage.removeItem("color");
//   } else {
//     localStorage.setItem("color", JSON.stringify(data));
//   }
// };

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addNote();
  } else {
    lsnotes.forEach((lsnotes) => {
      addNote(lsnotes);
    });
  }
})();
