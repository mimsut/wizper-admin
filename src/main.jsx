import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Admin } from './Admin.jsx';

const rootStyle = document.documentElement.style;
rootStyle.setProperty('margin', '0');
document.body.style.margin = '0';
document.body.style.background = 'var(--surface-bg)';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>
);
