import App from './App.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../public/style.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
