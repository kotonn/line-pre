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

function DiagnosisFour(props) {
  const questions = ["4", "3", "2", "1"];
  const selectAnwerContents = ["5%以上", "3~5%", "1~3%", "1%以下"];
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
    console.log("save", savedChartData);
    if (savedChartData) {
      const savedData = JSON.parse(savedChartData);
      if (savedData) {
        setChartData(savedData); // Recoilステートを更新
        if (savedData.thirdAnswer) {
          setLastSelectedAnswer(savedData.thirdAnswer.lastSelectedAnswer); // ローカルステートを更新
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
      thirdAnswer: { lastSelectedAnswer: lastSelectedAnswer },
    };

    setChartData(updatedChartData);

    // ローカルストレージに保存
    localStorage.setItem(
      "userAnswerChartData",
      JSON.stringify(updatedChartData)
    );
    console.log("質問4で保持されているデータ", lastSelectedAnswer);

    if (lastSelectedAnswer != null) {
      navigate("/diagnosisfive");
    } else {
      setErrorMessage("解答を選択してください");
    }
  };

  console.log(chartData);
  return (
    <>
      {isMobile && (
        <div className={cn(styles.root, props.className, "diagnosisfour")}>
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
                <h4 className={styles.highlight3}>4/5</h4>
              </div>

              <div className={styles.flex_col1}>
                <h3 className={styles.subtitle}>
                  プロフィールアクセス率は
                  <br />
                  どのくらいですか？
                </h3>

                <div className={styles.content_box}>
                  <div
                    className={styles.wrapper2}
                    style={{
                      "--src": `url(${"/assets/comment-icon-profile.svg"})`,
                    }}
                  >
                    <div className={styles.text}>
                      プロフィールアクセス率って？
                    </div>
                  </div>

                  <div className={styles.flex_col2}>
                    <div className={styles.flex_row}>
                      <div className={styles.rect5} />
                      <h5 className={styles.highlight1}>
                        投稿を見てくれた人がどのくらいプロフィールまで訪れたかを表す指標
                      </h5>
                    </div>

                    <div className={styles.group}>
                      <div
                        className={styles.wrapper21}
                        style={{
                          "--src": `url(${"/assets/comment-icon-home.svg"})`,
                        }}
                      >
                        <div className={styles.text1}>計算式</div>
                      </div>

                      <h5 className={styles.highlight4}>
                        プロフィールアクセス率＝ プロフィール閲覧数÷リーチ数
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
                    lastSelectedAnswer === Number(question)
                      ? styles.selectedWrapperHover
                      : ""
                  }`}
                >
                  <h5
                    className={`${styles.highlight} ${
                      lastSelectedAnswer === Number(question)
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

DiagnosisFour.propTypes = {
  className: PropTypes.string,
};

export default withHeader(DiagnosisFour);
