import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, setDoc, onSnapshot, query, where, deleteDoc } from "firebase/firestore";

// Load Students with real-time sync
export function loadStudents() {
    const tbody = document.querySelector("#studentsTable tbody");
    onSnapshot(collection(db, "users"), (snapshot) => {
        tbody.innerHTML = "";
        snapshot.forEach(d => {
            const u = d.data();
            if(u.role === 'admin') return;
            tbody.innerHTML += `<tr>
                <td>${u.fname} ${u.lname}</td>
                <td>${u.email}</td>
                <td>${u.group}</td>
                <td><button onclick="deleteStudent('${d.id}')" style="color:red">Delete</button></td>
            </tr>`;
        });
    });
}

// Add Resource (Lesson or Exam)
export async function addResource(data) {
    const colName = data.type === 'lesson' ? "lessons" : "exams";
    await addDoc(collection(db, colName), {
        ...data,
        createdAt: new Date()
    });
}

// Announcements
export async function postAnn(text, group) {
    await addDoc(collection(db, "announcements"), {
        text, group, date: new Date().toLocaleDateString()
    });
}

// Timetable Persistence
export async function saveTimetable(group, html) {
    await setDoc(doc(db, "settings", "timetable_" + group), { content: html });
    alert("Timetable Saved!");
}

export async function getTableData(group, elementId) {
    onSnapshot(doc(db, "settings", "timetable_" + group), (d) => {
        if(d.exists()) document.getElementById(elementId).innerHTML = d.data().content;
    });
}