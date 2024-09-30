import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsProvider from './components/Modals/SettingsContext';
import reportWebVitals from './reportWebVitals';
// Fonts
import "./fonts/Compacta-Bold-Plain-Regular.otf"
// Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Classic from './pages/Classic';
import RedText from './pages/RedText';
import LootPool from './pages/LootPool';
import ImageGuess from './pages/ImageGuess';
import NoPage from './pages/NoPage';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SettingsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/Bordlelands" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Bordlelands/classic" element={<Classic />} />
          <Route path="/Bordlelands/redtext" element={<RedText />} />
          <Route path="/Bordlelands/lootpool" element={<LootPool />} />
          <Route path="/Bordlelands/image" element={<ImageGuess />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </SettingsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
