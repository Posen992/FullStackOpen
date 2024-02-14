[Exercise 0.4: New note diagram](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#exercises-0-1-0-6)

Create a similar diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note  (Form Data: {note: Exercise04})

    Note right of browser : The browser excecute the JavaScript code that add the new note to the notes list and send the new note to the server 


    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: The browser redirect to the https://studies.cs.helsinki.fi/exampleapp/notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "", "date": "2024-02-14T15:08:22.946Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

A problem may arise here is that even if the request https://studies.cs.helsinki.fi/exampleapp/new_note fails, the note will still display in the notes list.