import React, { Suspense, lazy, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import { useTheme } from './contexts/ThemeContext';

const ChatView = lazy(() => import('./components/ChatView'));
const EmailManagement = lazy(() => import('./components/EmailManagement'));
const DocumentUploadView = lazy(() => import('./components/DocumentUploadView'));
const FileManager = lazy(() => import('./components/FileManager'));
const UserSettings = lazy(() => import('./components/UserSettings'));
const Login = lazy(() => import('./components/Login'));

export type Route = '/' | '/email' | '/documents' | '/files' | '/settings' | '/login';

const ThemedApp: React.FC = () => {
  const { theme } = useTheme();
  const [currentRoute, setCurrentRoute] = useState<Route>('/');

  const renderComponent = () => {
    switch (currentRoute) {
      case '/':
        return <ChatView />;
      case '/email':
        return <EmailManagement />;
      case '/documents':
        return <DocumentUploadView />;
      case '/files':
        return <FileManager />;
      case '/settings':
        return <UserSettings />;
      case '/login':
        return <Login />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme.backgroundColor, 
      color: theme.textColor 
    }}>
      <Navigation setCurrentRoute={setCurrentRoute} />
      <Suspense fallback={<Loading />}>
        {renderComponent()}
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
