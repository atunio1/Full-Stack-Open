# Exercise 0.6
Objective: Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note left of server: The server creates a new note object with JSON data in POST request and adds to notes array
    activate server
    server-->>browser: HTTP status code 201 created
    deactivate server
```
