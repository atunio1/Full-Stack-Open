# Exercise 0.6
Objective: Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: On the form's submit event, the browser executes JavaScript which creates a new note object, adds to notes array, and rerenders the notes list on the page
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP status code 201 created
    deactivate server
```
