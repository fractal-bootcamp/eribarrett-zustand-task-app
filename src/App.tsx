import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskManagement from './pages/TaskManagement';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Routes>
                    <Route path="/tasks" element={<TaskManagement />} />
                    <Route path="*" element={<Navigate to="/tasks" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 