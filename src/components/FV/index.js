import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";

import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import AOS from "aos";
import "aos/dist/aos.css";

function FV(props) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 500,
    });
  }, []);

  function handleNextClick() {
    navigate("/diagnosisone");
  }
  return (
    <>
      {isMobile && (
        <div className={cn(styles.root, props.className, "fv")}>
          <img
            src="/assets/background-image.svg"
            alt=""
            className={styles.fixed_image}
          />
          <div data-aos="fade" className={styles.flex_col}>
            <div className={styles.content_box2}>
              <div className={styles.flex_col1}>
                <div className={styles.chip}>
                  <span className={styles.btn__text}>LINE限定コンテンツ</span>
                </div>

                <h3 className={styles.subtitle}>CHECK YOUR ACCOUNT</h3>
                <h1 className={styles.hero_title}>アカウント</h1>

                <div className={styles.flex_row}>
                  <h1 className={styles.hero_title1}>診断</h1>
                  <img
                    className={styles.image4}
                    src={"/assets/mobile-icon.svg"}
                    alt="alt text"
                  />
                </div>

                <h4 className={styles.highlight1}>
                  いま解決するべき課題を診断
                </h4>
                <img
                  className={styles.image1}
                  src={"/assets/stroke.svg"}
                  alt="alt text"
                />
                <p className={styles.paragraph}>
                  知らない内に抱えてしまっている
                  <br />
                  アカウントの課題を見つけに行きましょう
                </p>
                <img
                  className={styles.image2}
                  src={"/assets/radar-graph.svg"}
                  alt="alt text"
                />
              </div>
            </div>

            <button onClick={handleNextClick} className={styles.content_box}>
              <div className={styles.flex_row1}>
                <div className={styles.flex_col2}>
                  <div className={styles.info}>-LET’S START-</div>
                  <h4 className={styles.highlight}>診断を開始する</h4>
                </div>
                {/* 
            <img
              className={styles.image3}
              src={"/assets/vector-icon.svg"}
              alt=""
            /> */}
              </div>
            </button>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className={cn(styles.root, props.className, "fv")}>
          モバイル機種でのみ診断可能です。
        </div>
      )}
    </>
  );
}

FV.propTypes = {
  className: PropTypes.string,
};

export default withHeader(FV);
