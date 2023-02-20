import './App.css';
import routes, { renderRoutes } from './routes';
import { Route, Routes, Redirect } from "react-router-dom";
import MainLayout from './layout/MainLayout'

function App() {
  return (
    <MainLayout>
      { renderRoutes(routes) }
    </MainLayout>
  );
}

export default App;
