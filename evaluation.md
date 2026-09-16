# Intern Evaluation Task — Authentication

## Task

Build a simple authentication system using **Next.js**.

The application should have the following pages:

### 1. Register Page

Create a registration page with:

* Name
* Email
* Password
* Confirm Password
* Register button

On registration:

* Validate the required fields.
* Save the user information in **PostgreSQL**.
* Password must **not** be stored as plain text. Use a suitable hashing method.

### 2. Login Page

Create a login page with:

* Email
* Password
* Login button

On login:

* Check the provided credentials against the registered user in PostgreSQL.
* Show an appropriate success/error message.

## Requirements

* The entire project must be built using **Next.js**.
* Use **PostgreSQL** as the database.
* Keep the UI simple and clean.
* Handle basic validation and errors.
* Keep the implementation simple. No need for advanced authentication features.
* The application must be deployed on **Vercel**.

## GitHub & Submission

1. Fork the provided repository.
2. Create your own branch using your name, for example:
   `feature/milon-auth`
3. Complete the task in your branch.
4. Push your changes to your fork.
5. Create a **Pull Request (PR)** from your branch to the original repository's `main` branch.
6. After completing the task, create/keep the project repository **private on your own GitHub profile**.
7. Share the **private GitHub repository link** with the evaluator.
8. Deploy the completed application to **Vercel**.
9. Share the **live Vercel deployment link** with the evaluator.

### Final Submission Must Include

* 🔗 Private GitHub Repository Link
* 🔗 Vercel Live Deployment Link
* 🔗 Pull Request Link

## AI Usage

You **may use AI tools** during development.

However, you must:

* Understand all the code you submit.
* Be able to explain your implementation.
* Be able to explain the main technologies and decisions used.
* Do not submit code that you cannot explain.

## Deadline

**Friday, 18 September 2026, 11:59 PM (BST)**

Late submissions may not be considered.

## Evaluation Focus

* Functionality
* Next.js implementation
* PostgreSQL integration
* Basic validation and error handling
* Code quality and structure
* Git/GitHub workflow
* Vercel deployment
* Understanding of the submitted code
