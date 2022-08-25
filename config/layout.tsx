import React from 'react';
import { Navbar, Footer, Skiplink } from 'components/common';
import { navList } from 'config/navigation';

type ItemsProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: ItemsProps) => {
  return (
    <>
      <Skiplink />
      <Navbar data={navList} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
