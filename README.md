# Student Record Management System

A simple CRUD Information System developed for the Systems Analysis and Design laboratory.

## Technology

- HTML
- CSS
- JavaScript
- Supabase PostgreSQL
- GitHub
- Vercel or another instructor-approved deployment platform

## Functions

- Create: Add a student
- Read: View all students
- Update: Edit a student
- Delete: Delete a student with confirmation

## Database

Table: `students`

Columns:
- `id`
- `student_id`
- `full_name`
- `program`
- `year_level`
- `email`
- `created_at`

## Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase.sql`.
4. Open `script.js`.
5. Replace:
   - `PASTE_YOUR_SUPABASE_URL_HERE`
   - `PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE`
6. Open the project in VS Code.
7. Run `index.html` using VS Code Live Server.
8. Test Add, View, Edit, and Delete.
9. Push the project to GitHub.
10. Deploy the project.

## Important

Use only the Supabase publishable/anon key in browser code. Never place the `service_role` or secret key in `script.js`.
