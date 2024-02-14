[Exercise 0.6: New note in Single page app diagram](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises-0-1-0-6)

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{"content": "Exercises06","date": "2024-02-14T22:09:05.098Z"}]

    Note right of browser : The browser excecute the JavaScript code that add the new note to the notes list and send the new note to the server 

    activate server
    server-->>browser: [{"message":"note created"}]
    deactivate server

```

A problem may arise here is that even if the request https://studies.cs.helsinki.fi/exampleapp/new_note_spa fails, the note will still display in the notes list.