import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ExerciseList from './components/exercise/ExerciseList';

const ExerciseListWrapper = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4">
      <ExerciseList 
        onExerciseClick={(exercise) => {
          navigate(`/exercise/${exercise.id}`);
        }}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        
        <main className="flex-grow py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/exercises" element={<ExerciseListWrapper />} />
            
            <Route path="/favorites" element={<FavoritesPage />} />
            
            <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App;