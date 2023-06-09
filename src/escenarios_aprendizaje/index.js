import * as ReactDOMClient from 'react-dom/client'
import "./css/master.css"
import "animate.css"
import "./css/modal.css"
import App from './App.jsx'

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);