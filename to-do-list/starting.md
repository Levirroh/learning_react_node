## Setting up React.js & Node.js:

1. Install Node from node.org
2. Install React in your app
```
npx create-react-app my-app
cd my-app
npm start 
```
3. Set up a Node.js Server
```
mkdir my-app-server
cd my-app-server
npm init -y
npm install express cors 
```

4. Building Node.js Server:

In your `my-app-server` directory, create an `index.js` file: 
```
    const express = require(‘express’);
    const cors = require(‘cors’);
    const app = express();
    const port = 5000;

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
```

5. Integrating React & Node

Open `src/App.js` in your React project and update it as follows: 
```
    import React, { useEffect, useState } from ‘react’;
    import ‘./App.css’;

    function App() {
      return (
        <div className=”App”>
        </div>
      );
    }

    export default App;
```