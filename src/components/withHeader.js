import Headroom from "react-headroom";
import Header from "components/Header";

const withHeader = (Component) => (props) =>
  (
    <>
      <Headroom tag="header" className="page-header">
        <nav className="max:show">
          <Header />
        </nav>
      </Headroom>
      <Component {...props} />
    </>
  );

export default withHeader;
