import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import AnalyzePage from '@/pages/AnalyzePage';
import ResultsPage from '@/pages/ResultsPage';
import BuilderPage from '@/pages/BuilderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
