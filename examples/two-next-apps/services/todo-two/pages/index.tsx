import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const todoData = [{
    id: 1,
    title: "Todo Two"
  }];
  return (
    <>
      <Head>
        <title>Todo Two</title>
        <meta name="description" content="Todo Two Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ul>
          {todoData.map((todo: any) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
        </ul>
      </main>
    </>
  );
}
