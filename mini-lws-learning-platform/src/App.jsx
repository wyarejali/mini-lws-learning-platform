import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminOutlet from './components/outlet/AdminOutlet';
import PublicOutlet from './components/outlet/PublicOutlet';
import StudentOutlet from './components/outlet/StudentOutlet';
import useAuthCheck from './hooks/useAuthCheck';
import {
    AddVideo,
    AdminLogin,
    Assignment,
    AssignmentMark,
    CoursePlayer,
    Dashboard,
    EditVideo,
    LeaderBoard,
    Quiz,
    Quizzes,
    SignUp,
    StudentLogin,
    Videos,
} from './pages';
import Account from './pages/Account';

function App() {
    const authChecked = useAuthCheck();

    return (
        authChecked && (
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicOutlet>
                                <StudentLogin />
                            </PublicOutlet>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicOutlet>
                                <SignUp />
                            </PublicOutlet>
                        }
                    />
                    <Route path="/*" element={<StudentOutlet />}>
                        <Route path="leader-board" element={<LeaderBoard />} />
                        <Route path="account" element={<Account />} />
                        <Route
                            path="course-player"
                            element={<CoursePlayer />}
                        />
                        <Route path="quiz" element={<Quiz />} />
                    </Route>

                    {/* Admin routes start */}
                    <Route
                        path="/admin"
                        element={
                            <PublicOutlet>
                                <AdminLogin />
                            </PublicOutlet>
                        }
                    />
                    <Route path="/admin/*" element={<AdminOutlet />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="account" element={<Account />} />
                        <Route path="videos" element={<Videos />} />
                        <Route path="add-video" element={<AddVideo />} />
                        <Route path="video/edit/:id" element={<EditVideo />} />
                        <Route path="quizzes" element={<Quizzes />} />
                        <Route path="assignment" element={<Assignment />} />
                        <Route
                            path="assignment-mark"
                            element={<AssignmentMark />}
                        />
                    </Route>
                    {/* Admin routes end */}
                </Routes>
            </Router>
        )
    );
}

export default App;
