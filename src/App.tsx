import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ButtonPage } from './pages/ButtonPage';
import { IconButtonPage } from './pages/IconButtonPage';
import { LinkButtonPage } from './pages/LinkButtonPage';
import { ButtonGroupPage } from './pages/ButtonGroupPage';
import { MultiSelectPage } from './pages/MultiSelectPage';
import { ValidationDemoPage } from './pages/ValidationDemoPage';
import { DragDropGridPage } from './pages/DragDropGridPage';
import { ConfigExamplePage } from './pages/ConfigExamplePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ButtonPage />} />
          <Route path="icon-button" element={<IconButtonPage />} />
          <Route path="link-button" element={<LinkButtonPage />} />
          <Route path="button-group" element={<ButtonGroupPage />} />
          <Route path="multi-select" element={<MultiSelectPage />} />
          <Route path="form-validation" element={<ValidationDemoPage />} />
          <Route path="drag-drop-grid" element={<DragDropGridPage />} />
          <Route path="config-examples" element={<ConfigExamplePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
