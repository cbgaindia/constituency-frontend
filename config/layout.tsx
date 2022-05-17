import { Navbar, Footer, Skiplink, Seo } from 'components/common';
import { navList } from 'config/navigation';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Seo />
      <Skiplink />
      <Navbar data={navList} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
