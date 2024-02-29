// Header コンポーネント
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useSetRecoilState } from "recoil";
import { userAnswerState } from "state/userAnswerState"; // 正確なパスに修正してください
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const setChartData = useSetRecoilState(userAnswerState);

  const handleHeaderClick = () => {
    setChartData({
      firstAnswer: null,
      secondAnswer: null,
      thirdAnswer: null,
      fourthAnswer: null,
      fifthAnswer: null,
    });

    // LocalStorageのデータを削除する
    localStorage.removeItem("userAnswerChartData");
    navigate("/");
  };

  return (
    <div
      className={cn(styles.image1, props.className, "header")}
      onClick={handleHeaderClick}
    >
      <img src={"/assets/header.svg"} alt="" />
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
