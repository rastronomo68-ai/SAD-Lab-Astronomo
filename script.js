import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://sllpxicilsregysxvyyj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1YUBp7lhXGzC7QWod0soOQ_SFPT9AbZ";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const form = document.getElementById("studentForm");
const recordId = document.getElementById("recordId");
const studentId = document.getElementById("studentId");
const fullName = document.getElementById("fullName");
const program = document.getElementById("program");
const yearLevel = document.getElementById("yearLevel");
const email = document.getElementById("email");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
const refreshButton = document.getElementById("refreshButton");
const tableBody = document.getElementById("studentTableBody");
const message = document.getElementById("message");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#dc2626" : "#15803d";
}

function clearForm() {
  form.reset();
  recordId.value = "";
  saveButton.textContent = "Add Student";
  cancelButton.classList.add("hidden");
}

async function loadStudents() {
  tableBody.innerHTML = '<tr><td colspan="6" class="empty">Loading...</td></tr>';

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    tableBody.innerHTML = `<tr><td colspan="6" class="empty">Error: ${escapeHtml(error.message)}</td></tr>`;
    return;
  }

  if (!data.length) {
    tableBody.innerHTML = '<tr><td colspan="6" class="empty">No student records yet.</td></tr>';
    return;
  }

  tableBody.innerHTML = data.map(student => `
    <tr>
      <td>${escapeHtml(student.student_id)}</td>
      <td>${escapeHtml(student.full_name)}</td>
      <td>${escapeHtml(student.program)}</td>
      <td>${escapeHtml(student.year_level)}</td>
      <td>${escapeHtml(student.email)}</td>
      <td>
        <div class="action-buttons">
          <button class="edit" onclick='editStudent(${JSON.stringify(student)})'>Edit</button>
          <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

window.editStudent = function(student) {
  recordId.value = student.id;
  studentId.value = student.student_id;
  fullName.value = student.full_name;
  program.value = student.program;
  yearLevel.value = student.year_level;
  email.value = student.email;

  saveButton.textContent = "Update Student";
  cancelButton.classList.remove("hidden");
  showMessage("Editing selected student.");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deleteStudent = async function(id) {
  if (!confirm("Are you sure you want to delete this student record?")) return;

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    showMessage(error.message, true);
    return;
  }

  showMessage("Student deleted successfully.");
  await loadStudents();
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const student = {
    student_id: studentId.value.trim(),
    full_name: fullName.value.trim(),
    program: program.value.trim(),
    year_level: yearLevel.value,
    email: email.value.trim()
  };

  if (recordId.value) {
    const { error } = await supabase
      .from("students")
      .update(student)
      .eq("id", recordId.value);

    if (error) {
      showMessage(error.message, true);
      return;
    }

    showMessage("Student updated successfully.");
  } else {
    const { error } = await supabase
      .from("students")
      .insert(student);

    if (error) {
      showMessage(error.message, true);
      return;
    }

    showMessage("Student added successfully.");
  }

  clearForm();
  await loadStudents();
});

cancelButton.addEventListener("click", () => {
  clearForm();
  showMessage("");
});

refreshButton.addEventListener("click", loadStudents);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadStudents();
