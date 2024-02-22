import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { userAnswerState } from "state/userAnswerState";

function Diagnosis1(props) {
  const questions = ["1", "2", "3", "4"];
  const selectAnwerContents = [
    "基準値の2倍以上",
    "基準値くらい",
    "基準値よりすこし少ない",
    "基準値の半分以下",
  ];
  const navigate = useNavigate();
  const [chartData, setChartData] = useRecoilState(userAnswerState);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState(null);

  useEffect(() => {
    // コンポーネントがマウントされたときにローカルストレージからデータを読み込む
    const savedChartData = localStorage.getItem("userAnswerChartData");
    console.log("save", savedChartData);
    if (savedChartData) {
      const savedData = JSON.parse(savedChartData);
      if (savedData && savedData.firstAnswer) {
        setChartData(savedData); // Recoilステートを更新
        setLastSelectedAnswer(savedData.firstAnswer.lastSelectedAnswer); // ローカルステートを更新
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
      firstAnswer: { lastSelectedAnswer: lastSelectedAnswer },
    };

    setChartData(updatedChartData);

    // ローカルストレージに保存
    localStorage.setItem(
      "userAnswerChartData",
      JSON.stringify(updatedChartData)
    );
    console.log("質問1で保持されているデータ", lastSelectedAnswer);

    navigate("/diagnosistwo");
  };

  console.log(chartData);
  return (
    <div className={cn(styles.root, props.className, "diagnosis1")}>
      <img
        src="/assets/background-image.svg"
        alt=""
        className={styles.fixed_image}
      />
      <div className={styles.flex_col}>
        <div className={styles.content_box3}>
          <div
            className={styles.wrapper4}
            style={{
              "--src": `url(${"/assets/number-circle-icon.svg"})`,
            }}
          >
            <h4 className={styles.highlight3}>1/5</h4>
          </div>

          <div className={styles.flex_col1}>
            <h3 className={styles.subtitle}>
              1投稿当たりの平均リーチ数は
              <br />
              基準値より多いですか？
            </h3>

            <div className={styles.content_box2}>
              <div className={styles.flex_col2}>
                <div className={styles.flex_row}>
                  <div className={styles.content_box}>
                    <div className={styles.text}>フォロワー数</div>
                  </div>

                  <div className={styles.content_box}>
                    <div className={styles.text1}>リーチ数</div>
                  </div>
                </div>

                <div className={styles.flex_row}>
                  <div className={styles.wrapper2}>
                    <h5 className={styles.highlight1}>0~1,000</h5>
                    <img
                      className={styles.image1}
                      src={"/assets/explain-vector.svg"}
                      alt=""
                    />
                  </div>

                  <div className={styles.wrapper21}>
                    <h5 className={styles.highlight11}>3,000</h5>
                  </div>
                </div>

                <div className={styles.flex_row}>
                  <div className={styles.wrapper2}>
                    <h5 className={styles.highlight1}>1,000~3,000</h5>
                    <img
                      className={styles.image1}
                      src={"/assets/explain-vector.svg"}
                      alt=""
                    />
                  </div>

                  <div className={styles.wrapper21}>
                    <h5 className={styles.highlight11}>8,000</h5>
                  </div>
                </div>

                <div className={styles.flex_row}>
                  <div className={styles.wrapper2}>
                    <h5 className={styles.highlight1}>3,000~1万人</h5>
                    <img
                      className={styles.image1}
                      src={"/assets/explain-vector.svg"}
                      alt=""
                    />
                  </div>

                  <div className={styles.wrapper21}>
                    <h5 className={styles.highlight11}>1.2万</h5>
                  </div>
                </div>

                <div className={styles.flex_row}>
                  <div className={styles.wrapper2}>
                    <h5 className={styles.highlight1}>1万人以上</h5>
                    <img
                      className={styles.image1}
                      src={"/assets/explain-vector.svg"}
                      alt=""
                    />
                  </div>

                  <div className={styles.wrapper21}>
                    <h5 className={styles.highlight12}>3万</h5>
                  </div>
                </div>
              </div>

              <div
                className={styles.wrapper5}
                style={{
                  "--src": `url(${"/assets/comment-icon-standard.svg"})`,
                }}
              >
                <div className={styles.text11}>基準値</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.flex_col3}>
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(question)}
              className={styles.btn}
            >
              <h5 className={styles.highlight}>{selectAnwerContents[index]}</h5>
            </button>
          ))}
        </div>

        <button onClick={handleNextClick} className={styles.wrapper3}>
          <div className={styles.flex_row1}>
            <h4 className={styles.highlight2}>次へ</h4>
            <img
              className={styles.image11}
              src={"/assets/vector-icon.svg"}
              alt=""
            />
          </div>
        </button>
      </div>
    </div>
  );
}

Diagnosis1.propTypes = {
  className: PropTypes.string,
};

export default withHeader(Diagnosis1);
