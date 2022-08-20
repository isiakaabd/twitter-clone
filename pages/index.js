import Head from "next/head";
import "dotenv/config";
import { memo } from "react";
import { Sidebar, Feed, CommentModal, Widget } from "components/pages";
const Home = ({ data, news }) => {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta
          name="description"
          content="Twitter clone App Created by Isiaka Abdulahi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar />
        <Feed />
        <Widget data={data} news={news} />
        <CommentModal />
      </main>
    </div>
  );
};
export default memo(Home);

export const getServerSideProps = async () => {
  const data = await fetch("https://randomuser.me/api/?results=500")
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const news = await fetch(
    `https://newsapi.org/v2/everything?q=manchester-united&apiKey=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      data: data?.results,
      news: news?.articles,
    },
  };
};
