import { Navbar } from 'components/common';
import { navList } from 'config/navigation';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar data={navList} />
      {children}
    </>
  );
};

export default Layout;
