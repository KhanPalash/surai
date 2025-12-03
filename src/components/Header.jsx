import React from 'react';

const Header = ({ user, onSignOut }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <h1 className="text-xl font-bold">Surai</h1>
      {user && <button onClick={onSignOut} className="text-sm">Sign Out</button>}
    </header>
  );
};

export default Header;
