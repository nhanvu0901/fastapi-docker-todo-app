import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import QueryProvider from './lib/QueryProvider';
import TodoApp from './pages/Todo/TodoApp';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { selectIsDarkMode, selectIsAuthenticated } from './redux/uiSlice';

const { Content } = Layout;

// Wrapper component that can access Redux state
const AppContent = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ padding: '0 50px', marginTop: 40 }}>
            <div style={{ background: 'var(--background)', padding: 24, borderRadius: 4 }}>
              <Routes>
                <Route path="/login" element={
                  isAuthenticated ? <Navigate to="/" /> : <LoginPage />
                } />
                <Route path="/register" element={
                  isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
                } />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <TodoApp />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

// Main App component with providers
function App() {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </ReduxProvider>
  );
}

export default App;