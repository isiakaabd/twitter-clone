import Head from "next/head";
import "dotenv/config";
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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <main className="flex  min-h-screen  max-w-7xl mx-auto p-2">
        <Sidebar />
        <div className="md:ml-[80px] xl:ml-[150px] flex p-0 w-full">
          <Feed />
          <Widget data={data} news={news} />
          <CommentModal />
        </div>
      </main>
    </div>
  );
};
export default Home;

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
