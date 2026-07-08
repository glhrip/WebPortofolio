import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './components/Portfolio';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Portfolio />
        </React.StrictMode>
    );
}
