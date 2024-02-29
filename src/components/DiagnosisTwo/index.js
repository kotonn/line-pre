import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";

import styles from "./index.module.scss";

import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { userAnswerState } from "state/userAnswerState";
import { useMediaQuery } from "react-responsive";

import AOS from "aos";
import "aos/dist/aos.css";

function DiagnosisTwo(props) {
  const questions = ["1", "2", "3", "4"];
  const selectAnwerContents = ["4%以上", "2~4%", "1~2%", "1%以下"];
  const navigate = useNavigate();
  const [chartData, setChartData] = useRecoilState(userAnswerState);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 500,
    });
    // コンポーネントがマウントされたときにローカルストレージからデータを読み込む
    const savedChartData = localStorage.getItem("userAnswerChartData");

    if (savedChartData) {
      const savedData = JSON.parse(savedChartData);

      if (savedData) {
        setChartData(savedData); // Recoilステートを更新
        if (savedData.secondAnswer) {
          setLastSelectedAnswer(savedData.secondAnswer.lastSelectedAnswer); // ローカルステートを更新
        }
      }
    }
  }, [setChartData]);

  const selectAnswer = (value) => {
    const numericValue = Number(value);
    setLastSelectedAnswer(numericValue);
  };

  const handleNextClick = () => {
    const updatedChartData = {
      ...chartData,
      secondAnswer: { lastSelectedAnswer: lastSelectedAnswer },
    };

    setChartData(updatedChartData);

    // ローカルストレージに保存
    localStorage.setItem(
      "userAnswerChartData",
      JSON.stringify(updatedChartData)
    );

    if (lastSelectedAnswer != null) {
      navigate("/diagnosisthree");
    } else {
      setErrorMessage("解答を選択してください");
    }
  };

  return (
    <>
      {isMobile && (
        <div className={cn(styles.root, props.className, "diagnosistwo")}>
          <img
            src="/assets/background-image.svg"
            alt=""
            className={styles.fixed_image}
          />

          <div data-aos="fade" className={styles.flex_col}>
            <div className={styles.content_box1}>
              <div
                className={styles.wrapper3}
                style={{
                  "--src": `url(${"/assets/number-circle-icon.svg"})`,
                }}
              >
                <h4 className={styles.highlight3}>2/5</h4>
              </div>

              <div className={styles.flex_col1}>
                <h3 className={styles.subtitle}>
                  フィード/リールの保存率は
                  <br />
                  どのくらいですか？
                </h3>

                <div className={styles.content_box}>
                  <div
                    className={styles.wrapper2}
                    style={{
                      "--src": `url(${"/assets/comment-icon-keep.svg"})`,
                    }}
                  >
                    <div className={styles.text}>保存率って？</div>
                  </div>

                  <div className={styles.flex_col2}>
                    <div className={styles.flex_row}>
                      <div className={styles.rect5} />
                      <h5 className={styles.highlight1}>
                        投稿を見てくれた人がどのくらい保存してくれたかを表す指標
                      </h5>
                    </div>

                    <div className={styles.flex_row1}>
                      <div className={styles.rect51} />
                      <h5 className={styles.highlight11}>
                        「投稿の質」を表します
                      </h5>
                    </div>

                    <div className={styles.group}>
                      <div
                        className={styles.wrapper21}
                        style={{
                          "--src": `url(${"/assets/comment-icon-keep.svg"})`,
                        }}
                      >
                        <div className={styles.text1}>計算式</div>
                      </div>

                      <h5 className={styles.highlight4}>
                        保存率＝保存数÷リーチ数
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.flex_col3}>
              {questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(question)}
                  className={`${styles.wrapper} ${
                    lastSelectedAnswer === index + 1
                      ? styles.selectedWrapperHover
                      : ""
                  }`}
                >
                  <h5
                    className={`${styles.highlight} ${
                      lastSelectedAnswer === index + 1
                        ? styles.selectedHightlightHover
                        : ""
                    }`}
                  >
                    {selectAnwerContents[index]}
                  </h5>
                </button>
              ))}
            </div>

            {errorMessage && (
              <p
                style={{
                  marginBottom: "-25px",
                  color: "red",
                  justifyContent: "end",
                  fontSize: "12px",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button onClick={handleNextClick} className={styles.content_box2}>
              <div className={styles.flex_row2}>
                <h4 className={styles.highlight21}>次へ</h4>
                {/* <img
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

DiagnosisTwo.propTypes = {
  className: PropTypes.string,
};

export default withHeader(DiagnosisTwo);
