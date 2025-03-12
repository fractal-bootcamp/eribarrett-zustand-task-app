import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../app/routes/tasks';
import Manage from '../app/routes/manage';
import '../app/app.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
); 