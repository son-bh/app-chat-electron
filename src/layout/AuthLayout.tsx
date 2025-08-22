import React from 'react';

interface IAuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div>
      <main>
        <>{children}</>
      </main>
    </div>
  );
};

export default AuthLayout;
