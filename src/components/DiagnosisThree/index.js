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

function DiagnosisThree(props) {
  const questions = ["1", "2", "3", "4"];
  const selectAnwerContents = ["60%以上", "40~60%", "30~40%", "30%以下"];
  const navigate = useNavigate();
  const [chartData, setChartData] = useRecoilState(userAnswerState);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  useEffect(() => {
    // コンポーネントがマウントされたときにローカルストレージからデータを読み込む
    const savedChartData = localStorage.getItem("userAnswerChartData");
    console.log("save", savedChartData);
    if (savedChartData) {
      const savedData = JSON.parse(savedChartData);
      if (savedData) {
        setChartData(savedData); // Recoilステートを更新
        if (savedData.fifthAnswer) {
          setLastSelectedAnswer(savedData.fifthAnswer.lastSelectedAnswer); // ローカルステートを更新
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
      fifthAnswer: { lastSelectedAnswer: lastSelectedAnswer },
    };

    setChartData(updatedChartData);

    // ローカルストレージに保存
    localStorage.setItem(
      "userAnswerChartData",
      JSON.stringify(updatedChartData)
    );
    console.log("質問3で保持されているデータ", lastSelectedAnswer);

    if (lastSelectedAnswer != null) {
      navigate("/diagnosisfour");
    } else {
      setErrorMessage("解答を選択してください");
    }
  };

  console.log(chartData);
  return (
    <>
      {isMobile && (
        <div className={cn(styles.root, props.className, "diagnosisthree")}>
          <img
            src="/assets/background-image.svg"
            alt=""
            className={styles.fixed_image}
          />

          <div className={styles.flex_col}>
            <div className={styles.content_box1}>
              <div
                className={styles.wrapper3}
                style={{
                  "--src": `url(${"/assets/number-circle-icon.svg"})`,
                }}
              >
                <h4 className={styles.highlight3}>3/5</h4>
              </div>

              <div className={styles.flex_col1}>
                <h3 className={styles.subtitle}>
                  ホーム率はどのくらいですか？
                </h3>

                <div className={styles.content_box}>
                  <div
                    className={styles.wrapper2}
                    style={{
                      "--src": `url(${"/assets/comment-icon-home.svg"})`,
                    }}
                  >
                    <div className={styles.text}>ホーム率って？</div>
                  </div>

                  <div className={styles.flex_col2}>
                    <div className={styles.flex_row}>
                      <div className={styles.rect5} />
                      <h5 className={styles.highlight1}>
                        フォロワーのうちどれくらいの人が投稿を見てくれたかの指標
                      </h5>
                    </div>

                    <div className={styles.flex_row1}>
                      <div className={styles.rect51} />
                      <h5 className={styles.highlight11}>
                        「アカウントの質」を表します
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
                        ホーム率＝フォロワーリーチ数÷投稿÷フォロワー数
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

DiagnosisThree.propTypes = {
  className: PropTypes.string,
};

export default withHeader(DiagnosisThree);
