import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop.JSX';

const Lauout = ({children}) => {
 return <div>
    <ScrollToTop/>
    <Header/>
    <main  className="min-h-lvh">{children}</main>
    <Footer/>
  </div>;
  
}

export default Lauout