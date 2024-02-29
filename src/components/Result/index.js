import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import withHeader from "components/withHeader";
import styles from "./index.module.scss";
import { Radar, Bar } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { userAnswerState } from "state/userAnswerState";
import { useMediaQuery } from "react-responsive";
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
  const message = [
    "あなたのアカウントは、全体のインスタアカウントの中でも0.001%以内に入っています。アカウントの状態は非常に良く、リーチ数の増加に伴いフォロワーも増えていくでしょう。さらなる成長を目指すためには、安定してリーチを取ることができる『質の高い投稿』の作成に取り組む必要があります。『質の高い投稿とはどうやって作成するのか』『最終成果地点でもある収益化はどのように確立していくのか』など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で23%以内に入っています。各指標が基準値を満たしており、アカウントの状態は非常に良いです。フォロワーを増やすためには、リーチしたユーザーを取りこぼさないための施策を実行する必要があります。そのために、『そもそもリーチを倍増させる仕組み』『”バズ投稿”を意図的に生み出す投稿作成』『ジャンルに応じたユーザーの目を惹くデザインの構築』に取り組んでください。実際にインスタのプロであるSAKIYOMIが実践している投稿作成の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で74%以内に入っています。各指標が基準値を満たしておらず、アカウントの状態は良いとは言えません。だたし、まだまだ伸び代のあるフェーズであり、投稿の見直しを徹底して行う必要があります。そのために、まずは『”バズ投稿”を意図的に生み出す投稿作成』『リーチを倍増させるためのキャッチコピーの作成』に取り組んでください。実際にSAKIYOMIが実践している投稿作成のフローやキャッチコピーの作り方など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で97%以内に入っています。各指標が基準値を大きく下回り、アカウントの状態は危険だと考えられます。リーチ数などの指標を追い求めるのではなく、まずはアカウントのコンセプトから見直す必要があります。そのために、『便益性（誰のどんな困りごとを解決するアカウントなのか）』『独自性（他のアカウントとは何がどう違うのか）』を徹底的に考えてください。この2つが揃っていないアカウントは今後絶対に伸びません。実際にアカウントコンセプトをどうやって考えていくのかや、フォロワーを着実に増やしていくためのロードマップなど、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    // 76~99点お最も項目別で点数が低かった指標
    "あなたのアカウントは、全体のインスタアカウントの中で9%以内に入っています。アカウントの状態は非常に良いですが、そもそも投稿にリーチするユーザーの数が少ない傾向にあります。そのため、ユーザーが他の投稿ではなくあなたの投稿を選択するための施策を実行する必要があります。『実例をベースにした投稿戦略の分析と検証』『”バズ投稿”を意図的に生み出す投稿作成』『リーチを倍増させるためのキャッチコピーの作成』に取り組んでください。実際に3ヶ月で1万フォロワーを増やしたバズ投稿の戦略や、SAKIYOMIが実践する投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で9%以内に入っています。アカウントの状態は非常に良いですが、コンテンツ内容がユーザーに刺さっていないため、投稿の質が低いと判断されている傾向にあります。そのため、ユーザーが後で見返したくなるような投稿を作成する必要があります。『ニーズではなくジョブ機転のコンテンツ作成』『ジャンルに応じた見返したくなる投稿の要因分析』に取り組んでください。実際にアカウント運用のプロがコンサルしたアカウント添削会のライブ映像や、SAKIYOMIが実践するジョブ理論を用いた投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で9%以内に入っています。アカウントの状態は非常に良いですが、ユーザーとのコミュニケーションが取れておらず、ファンが少ない傾向にあります。そのため、ユーザーからのリアクションをUPさせる施策を実行する必要があります。『ストーリーズからバズ投稿を生み出す方法の検討』『バズるストーリーズの型の確立』に取り組んでください。実際にSAKIYOMIが実践しているファン化&ユーザー育成の教科書や、ストーリーズ施策の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で9%以内に入っています。アカウントの状態は非常に良いですが、質の高い投稿を発信してもプロフィールに遷移してもらえない傾向にあります。そのため、ユーザーがプロフィールに遷移する魅力づけが必要になります。『アカウントコンセプトの見直し』『コンセプトに沿ったユーザーがプロフィールに飛びやすい投稿の作成』『ユーザーが離脱しない投稿デザインの作成』に取り組んでください。実際にSAKIYOMIが作成したデザインテンプレートや、アカウントコンセプトの見直しから渡航作成の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で9%以内に入っています。アカウントの状態は非常に良いですが、プロフィールに訪れたユーザーにアカウントの魅力を伝えられていない傾向にあります。そのため、ユーザーがこのアカウントを見て3秒でフォローしたいと思うプロフィールを作る必要があります。『アカウントの便益性/独自性を出すためのコンセプト設計』『5つのセオリーを抑えたプロフィール設計』に取り組んでください。今日から実践できるプロフィール設計の教科書や、抑えるべき5つのセオリーなど、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    // 51~74点お最も項目別で点数が低かった指標
    "あなたのアカウントは、全体のインスタアカウントの中で46%以内に入っています。アカウントの状態は非常に良いですが、そもそも投稿にリーチするユーザーの数が少ない傾向にあります。そのため、ユーザーが他の投稿ではなくあなたの投稿を選択するための施策を実行する必要があります。『実例をベースにした投稿戦略の分析と検証』『”バズ投稿”を意図的に生み出す投稿作成』『リーチを倍増させるためのキャッチコピーの作成』に取り組んでください。実際に3ヶ月で1万フォロワーを増やしたバズ投稿の戦略や、SAKIYOMIが実践する投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で46%以内に入っています。アカウントの状態は非常に良いですが、コンテンツ内容がユーザーに刺さっていないため、投稿の質が低いと判断されている傾向にあります。そのため、ユーザーが後で見返したくなるような投稿を作成する必要があります。『ニーズではなくジョブ機転のコンテンツ作成』『ジャンルに応じた見返したくなる投稿の要因分析』に取り組んでください。実際にアカウント運用のプロがコンサルしたアカウント添削会のライブ映像や、SAKIYOMIが実践するジョブ理論を用いた投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で46%以内に入っています。アカウントの状態は非常に良いですが、ユーザーとのコミュニケーションが取れておらず、ファンが少ない傾向にあります。そのため、ユーザーからのリアクションをUPさせる施策を実行する必要があります。『ストーリーズからバズ投稿を生み出す方法の検討』『バズるストーリーズの型の確立』に取り組んでください。実際にSAKIYOMIが実践しているファン化&ユーザー育成の教科書や、ストーリーズ施策の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で46%以内に入っています。アカウントの状態は非常に良いですが、質の高い投稿を発信してもプロフィールに遷移してもらえない傾向にあります。そのため、ユーザーがプロフィールに遷移する魅力づけが必要になります。『アカウントコンセプトの見直し』『コンセプトに沿ったユーザーがプロフィールに飛びやすい投稿の作成』『ユーザーが離脱しない投稿デザインの作成』に取り組んでください。実際にSAKIYOMIが作成したデザインテンプレートや、アカウントコンセプトの見直しから渡航作成の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で46%以内に入っています。アカウントの状態は非常に良いですが、プロフィールに訪れたユーザーにアカウントの魅力を伝えられていない傾向にあります。そのため、ユーザーがこのアカウントを見て3秒でフォローしたいと思うプロフィールを作る必要があります。『アカウントの便益性/独自性を出すためのコンセプト設計』『5つのセオリーを抑えたプロフィール設計』に取り組んでください。今日から実践できるプロフィール設計の教科書や、抑えるべき5つのセオリーなど、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    // 26~49点お最も項目別で点数が低かった指標
    "あなたのアカウントは、全体のインスタアカウントの中で81%以内に入っています。アカウントの状態は非常に良いですが、そもそも投稿にリーチするユーザーの数が少ない傾向にあります。そのため、ユーザーが他の投稿ではなくあなたの投稿を選択するための施策を実行する必要があります。『実例をベースにした投稿戦略の分析と検証』『”バズ投稿”を意図的に生み出す投稿作成』『リーチを倍増させるためのキャッチコピーの作成』に取り組んでください。実際に3ヶ月で1万フォロワーを増やしたバズ投稿の戦略や、SAKIYOMIが実践する投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で81%以内に入っています。アカウントの状態は非常に良いですが、コンテンツ内容がユーザーに刺さっていないため、投稿の質が低いと判断されている傾向にあります。そのため、ユーザーが後で見返したくなるような投稿を作成する必要があります。『ニーズではなくジョブ機転のコンテンツ作成』『ジャンルに応じた見返したくなる投稿の要因分析』に取り組んでください。実際にアカウント運用のプロがコンサルしたアカウント添削会のライブ映像や、SAKIYOMIが実践するジョブ理論を用いた投稿作成など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で81%以内に入っています。アカウントの状態は非常に良いですが、ユーザーとのコミュニケーションが取れておらず、ファンが少ない傾向にあります。そのため、ユーザーからのリアクションをUPさせる施策を実行する必要があります。『ストーリーズからバズ投稿を生み出す方法の検討』『バズるストーリーズの型の確立』に取り組んでください。実際にSAKIYOMIが実践しているファン化&ユーザー育成の教科書や、ストーリーズ施策の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で81%以内に入っています。アカウントの状態は非常に良いですが、質の高い投稿を発信してもプロフィールに遷移してもらえない傾向にあります。そのため、ユーザーがプロフィールに遷移する魅力づけが必要になります。『アカウントコンセプトの見直し』『コンセプトに沿ったユーザーがプロフィールに飛びやすい投稿の作成』『ユーザーが離脱しない投稿デザインの作成』に取り組んでください。実際にSAKIYOMIが作成したデザインテンプレートや、アカウントコンセプトの見直しから渡航作成の教科書など、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
    "あなたのアカウントは、全体のインスタアカウントの中で81%以内に入っています。アカウントの状態は非常に良いですが、プロフィールに訪れたユーザーにアカウントの魅力を伝えられていない傾向にあります。そのため、ユーザーがこのアカウントを見て3秒でフォローしたいと思うプロフィールを作る必要があります。『アカウントの便益性/独自性を出すためのコンセプト設計』『5つのセオリーを抑えたプロフィール設計』に取り組んでください。今日から実践できるプロフィール設計の教科書や、抑えるべき5つのセオリーなど、『課題解決のためのコンテンツを見る』を押すと、LINEで参考ノウハウをお送りするので、プロのノウハウを学んでみてください。",
  ];
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

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

  //   最小値の格納されているインデックスの取得
  const minValueIndex = dataValues.length
    ? dataValues.indexOf(Math.min(...dataValues)) + 1 // 配列は0から始まるので、人が読みやすいように1を足す
    : null;

  // 合計値の算出
  const totalValue = dataValues.reduce((acc, value) => acc + value, 0);
  //   偏差値の算出
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

        grid: {
          lineWidth: 1, // グリッド線の太さを2pxに設定
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
    labels: ["熟練度"],
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
    <>
      {isMobile && (
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
                    <h5 className={styles.highlight2}>
                      あなたのアカウント状態
                    </h5>
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
                  {totalValue === 100
                    ? message[0]
                    : totalValue === 75
                    ? message[1]
                    : totalValue === 50
                    ? message[2]
                    : totalValue === 25
                    ? message[3]
                    : totalValue >= 76 &&
                      totalValue <= 99 &&
                      minValueIndex === 1
                    ? message[4]
                    : totalValue >= 76 &&
                      totalValue <= 99 &&
                      minValueIndex === 2
                    ? message[5]
                    : totalValue >= 76 &&
                      totalValue <= 99 &&
                      minValueIndex === 3
                    ? message[7]
                    : totalValue >= 76 &&
                      totalValue <= 99 &&
                      minValueIndex === 4
                    ? message[8]
                    : totalValue >= 76 &&
                      totalValue <= 99 &&
                      minValueIndex === 5
                    ? message[6]
                    : totalValue >= 51 &&
                      totalValue <= 74 &&
                      minValueIndex === 1
                    ? message[9]
                    : totalValue >= 51 &&
                      totalValue <= 74 &&
                      minValueIndex === 2
                    ? message[10]
                    : totalValue >= 51 &&
                      totalValue <= 74 &&
                      minValueIndex === 3
                    ? message[12]
                    : totalValue >= 51 &&
                      totalValue <= 74 &&
                      minValueIndex === 4
                    ? message[13]
                    : totalValue >= 51 &&
                      totalValue <= 74 &&
                      minValueIndex === 5
                    ? message[11]
                    : totalValue >= 26 &&
                      totalValue <= 49 &&
                      minValueIndex === 1
                    ? message[14]
                    : totalValue >= 26 &&
                      totalValue <= 49 &&
                      minValueIndex === 2
                    ? message[15]
                    : totalValue >= 26 &&
                      totalValue <= 49 &&
                      minValueIndex === 3
                    ? message[17]
                    : totalValue >= 26 &&
                      totalValue <= 49 &&
                      minValueIndex === 4
                    ? message[18]
                    : totalValue >= 26 &&
                      totalValue <= 49 &&
                      minValueIndex === 5
                    ? message[16]
                    : message[0]}
                </div>
              </div>

              <img
                className={styles.image}
                src={"/assets/final-arrow.svg"}
                alt=""
              />

              <button
                className={styles.wrapper}
                onClick={() => (window.location.href = "/")}
              >
                <div className={styles.wrapper1}>
                  課題解決のためのコンテンツを見る
                </div>
              </button>
            </div>
          </section>
        </div>
      )}
      {!isMobile && (
        <div className={cn(styles.main, props.className, "fv")}>
          モバイル機種でのみ診断可能です。
        </div>
      )}
    </>
  );
}

Result.propTypes = {
  className: PropTypes.string,
};

export default withHeader(Result);
