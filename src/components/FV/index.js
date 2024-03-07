import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";

import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";

import AOS from "aos";
import "aos/dist/aos.css";

function FV(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 500,
    });
  }, []);

  function handleNextClick() {
    window.location.href = "https://lstep.app/oohReFN";
  }
  return (
    <>
      <div className={cn(styles.root, props.className, "fv")}>
        {isMobile ? (
          <img
            src="/assets/background-image.svg"
            alt=""
            className={styles.fixed_image}
          />
        ) : (
          <img
            src="/assets/pc-background.svg"
            alt=""
            className={styles.over_image}
          />
        )}
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

              <h4 className={styles.highlight1}>いま解決するべき課題を診断</h4>
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
                <h4 className={styles.highlight}>
                  LINEに登録して
                  <br />
                  無料診断を開始する
                </h4>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

FV.propTypes = {
  className: PropTypes.string,
};

export default withHeader(FV);
