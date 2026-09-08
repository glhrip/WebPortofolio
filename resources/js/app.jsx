import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioExplorer from './components/PortfolioExplorer';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <PortfolioExplorer />
        </React.StrictMode>
    );
}
