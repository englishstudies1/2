// database.js
import { db } from "./firebase.js";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

// Add a student
export async function addStudent(name, email) {
  try {
    await addDoc(collection(db, "students"), { name, email });
    alert("Student added successfully!");
    loadStudents(); // Refresh the table
  } catch(e) { console.error(e); }
}

// Delete a student
export async function deleteStudent(studentId) {
  try {
    await deleteDoc(doc(db, "students", studentId));
    alert("Student deleted!");
    loadStudents();
  } catch(e) { console.error(e); }
}

// Load all students into the table
export async function loadStudents() {
  const table = document.getElementById("studentsTable");
  table.innerHTML = ""; // Clear table
  const querySnapshot = await getDocs(collection(db, "students"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = table.insertRow();
    row.insertCell(0).innerText = data.name;
    row.insertCell(1).innerText = data.email;
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick = () => deleteStudent(docSnap.id);
    row.insertCell(2).appendChild(delBtn);
  });
}
