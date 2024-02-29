import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";
import styles from "./index.module.scss";
import { Radar, Bar } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { userAnswerState } from "state/userAnswerState";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// 全ての必要なコンポーネントを登録
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

function Result(props) {
  const [chartData, setChartData] = useRecoilState(userAnswerState);

  useEffect(() => {
    // ローカルストレージからデータの読み込みと検証
    const loadData = () => {
      const savedChartData = localStorage.getItem("userAnswerChartData");
      if (!savedChartData) return;

      try {
        const parsedData = JSON.parse(savedChartData);
        const isValidData =
          parsedData &&
          Object.values(parsedData).every(
            (data) => data && "lastSelectedAnswer" in data
          );

        if (isValidData) {
          setChartData(parsedData);
        } else {
          console.error("Invalid data format in localStorage");
        }
      } catch (error) {
        console.error("Error parsing chart data from localStorage:", error);
      }
    };

    loadData();
  }, [setChartData]);

  useEffect(() => {
    // データの有効性を確認し、ローカルストレージに保存
    const isValidChartData =
      chartData && Object.values(chartData).every((value) => value !== null);
    if (isValidChartData) {
      localStorage.setItem("userAnswerChartData", JSON.stringify(chartData));
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
    labels: ["偏差値"],
    datasets: [
      {
        // labelプロパティを削除するか、空文字に設定して非表示に
        data: [deviationValue],
        backgroundColor: "rgba(251, 216, 129, 0.7)",
        borderColor: "rgba(249, 210, 99, 1)",
        barThickness: 20, // バーの幅を指定する（ピクセルまたは比率）
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 9,
          },
        },
        min: 0,
        max: 100,
      },
      y: {
        ticks: {
          font: {
            size: 9,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // datasetsのlabelを非表示に
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

            <div className={styles.wrapper3_bar}>
              <Bar data={barData} options={barOptions} />
            </div>

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
