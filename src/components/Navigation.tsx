import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Route } from '../App';

interface NavigationProps {
  setCurrentRoute: (route: Route) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setCurrentRoute }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleNavClick = (route: Route) => {
    setCurrentRoute(route);
    setMenuOpen(false);
  };

  const navStyle = {
    backgroundColor: theme.navBg,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const navLinkStyle = {
    color: theme.textColor,
    textDecoration: 'none',
    cursor: 'pointer',
    marginRight: '1rem',
  };

  const userMenuStyle = {
    position: 'relative' as const,
  };

  const userMenuButtonStyle = {
    background: 'none',
    border: 'none',
    color: theme.textColor,
    cursor: 'pointer',
  };

  const userMenuDropdownStyle = {
    position: 'absolute' as const,
    right: 0,
    top: '100%',
    backgroundColor: theme.cardBg,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '0.25rem',
    padding: '0.5rem',
  };

  return (
    <nav style={navStyle}>
      <div>
        <a style={navLinkStyle} onClick={() => handleNavClick('/')}>Chat</a>
        <a style={navLinkStyle} onClick={() => handleNavClick('/email')}>Email</a>
        <a style={navLinkStyle} onClick={() => handleNavClick('/documents')}>Documents</a>
        <a style={navLinkStyle} onClick={() => handleNavClick('/files')}>Files</a>
      </div>
      {user ? (
        <div style={userMenuStyle}>
          <button style={userMenuButtonStyle} onClick={() => setMenuOpen(!menuOpen)}>
            {user.name}
          </button>
          {menuOpen && (
            <div style={userMenuDropdownStyle}>
              <a style={navLinkStyle} onClick={() => handleNavClick('/settings')}>Settings</a>
              <a style={navLinkStyle} onClick={toggleTheme}>Toggle Theme</a>
              <a style={navLinkStyle} onClick={logout}>Logout</a>
            </div>
          )}
        </div>
      ) : (
        <a style={navLinkStyle} onClick={() => handleNavClick('/login')}>Login</a>
      )}
    </nav>
  );
};

export default Navigation;
