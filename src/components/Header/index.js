import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./index.module.scss";

function Header(props) {
  return (
    <div className={cn(styles.image1, props.className, "header")}>
      <img src={"/assets/header.svg"} alt="" />
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
