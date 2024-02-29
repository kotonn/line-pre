import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";

import styles from "./index.module.scss";

import { Radar, Bar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { userAnswerState } from "state/userAnswerState";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Result(props) {
  const [chartData, setChartData] = useRecoilState(userAnswerState);

  useEffect(() => {
    const savedChartData = localStorage.getItem("userAnswerChartData");
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData);
      // データ形式の確認を追加
      const isValidData =
        parsedData &&
        Object.keys(parsedData).every(
          (key) =>
            parsedData[key] !== null &&
            typeof parsedData[key] === "object" &&
            "lastSelectedAnswer" in parsedData[key]
        );

      if (isValidData) {
        setChartData(parsedData);
      } else {
        // ローカルストレージのデータが無効な場合、何らかのエラーハンドリングを行う
        console.error("Invalid data format in localStorage");
      }
      console.log("Parsed data:", parsedData);
    }
  }, [setChartData]);

  useEffect(() => {
    // chartDataが有効なデータを持っているかチェック
    const isValidChartData =
      chartData && Object.values(chartData).every((value) => value !== null);

    if (isValidChartData) {
      // chartDataが更新されるたびにローカルストレージに保存
      localStorage.setItem("userAnswerChartData", JSON.stringify(chartData));
      console.log("Saved chartData to localStorage:", chartData);
    }
  }, [chartData]);

  if (
    !chartData ||
    Object.values(chartData).some((answer) => answer === null)
  ) {
    return <div>Loading or invalid data...</div>;
  }

  const radarDataValue = Object.values(chartData).map(
    (item) => item.lastSelectedAnswer
  );

  const dataValues = Object.values(chartData).map(
    (item) => (item ? item.lastSelectedAnswer * 5 : 0) // nullチェックを追加
  );
  console.log("chart", chartData);
  const totalValue = dataValues.reduce((acc, value) => acc + value, 0);
  const deviationValue = 50 + 10 * ((totalValue - 62.5) / 18.75);

  const radarData = {
    labels: [
      "リーチ数",
      "保存率",
      ["プロフィール", "アクセス率  "],
      ["フォロワー", "転換率　"],
      "ホーム率",
    ],
    datasets: [
      {
        data: radarDataValue,
        fill: true,
        backgroundColor: "rgba(251, 216, 129, 0.7)",
        borderColor: "rgba(249, 210, 99, 1)",
        pointBackgroundColor: "rgba(249, 210, 99, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(249, 210, 99, 1)",
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
        fill: false,
      },
      point: {
        radius: 2.5,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 4,
        ticks: {
          font: {
            size: 7,
          },
          stepSize: 1,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
          //   display: false,
        },
        pointLabels: {
          font: {
            size: 8,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barData = {
    labels: ["合計値の偏差値"],
    datasets: [
      {
        label: "偏差値",
        data: [deviationValue],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: 100,
      },
    },
  };
  return (
    <div className={cn(styles.main, props.className, "result")}>
      <section className={styles.section1}>
        <img
          src="/assets/background-image.svg"
          alt=""
          className={styles.fixed_image}
        />

        <div className={styles.flex_col}>
          <div className={styles.wrapper7}>
            <div className={styles.wrapper8}>
              <h2 className={styles.wrapper81}>診断結果</h2>
            </div>
          </div>

          <div className={styles.content_box4}>
            <div className={styles.wrapper2}>
              <div className={styles.content_box2}>
                <h5 className={styles.highlight2}>あなたのアカウント状態</h5>
              </div>
            </div>

            <div className={styles.wrapper3}>
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          <div className={styles.content_box3}>
            <div className={styles.wrapper5}>
              <div className={styles.content_box1}>
                <h5 className={styles.highlight}>あなたの運用偏差値</h5>
              </div>
            </div>
            {/* <Bar data={barData} options={barOptions} /> */}
            <article className={styles.content_box5}>
              <div className={styles.info}>【熟練度】</div>
              <p className={styles.desc}>
                「リーチ数」「保存率」「ホーム率」「プロフィールアクセス率」「フォロワー転換率」を総体的に評価し、今のあなたがどれだけInstagramの運用ノウハウをインプットできているのかを判断します。
              </p>
            </article>
          </div>

          <div className={styles.content_box4}>
            <div className={styles.wrapper2}>
              <div className={styles.content_box2}>
                <h5 className={styles.highlight2}>あなたの運用レベル</h5>
              </div>
            </div>

            <div className={styles.wrapper31}>
              あなたのアカウントは、全体のインスタアカウントの中で97%以内に入っています。アカウントの状態は、決して良い状態であるとは言えません。プロフィールに訪れたユーザーにアカウントの魅力を伝えられていない傾向にあります。そのため、ユーザーがこのアカウントを見て3秒でフォローしたいと思うプロフィールを作る必要があります。「5つのセオリーを抑えたプロフィール設計」「アカウントの便益性/独自性を出すためのコンセプト設計」に取り組んでください。LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。
            </div>
          </div>

          <img
            className={styles.image}
            src={"/assets/final-arrow.svg"}
            alt=""
          />

          <div className={styles.wrapper}>
            <div className={styles.wrapper1}>
              課題解決のためのコンテンツを見る
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Result.propTypes = {
  className: PropTypes.string,
};

export default withHeader(Result);
