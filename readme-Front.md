# Address Book Front-end Interface

This project is an address book front-end interface, developed using Vue.js and the Element UI library. It provides the ability to add, edit, delete, and view contacts.

## Tech stack

- **Front-end frameworks**: Vue.js
- **UI Library**: Element UI

## Features

- **Add Contact**: Allows users to add new contact information through a form.
- **Edit Contact**: Allows users to edit existing contact information.
- **Delete Contact**: Allows users to delete contact information that already exists.

## Instructions for use

1. **Start Project**:
    - Make sure you have Node.js and npm installed.
    - Clone the project to the local computer: `git clone [project address]`
    - Install dependency: `npm install`
    - Start the dev server: `npm run serve`

2. **API Interface**:
    - Get all contacts: `http://127.0.0.1:8091/Contact/findAll`
    - Add Contact: `http://127.0.0.1:8091/Contact`
    - Delete contact: `http://127.0.0.1:8091/Contact/{id}`
    - Update Contact: `http://127.0.0.1:8091/Contact/{id}`