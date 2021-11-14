import { GetStaticProps } from "next";
import Header from "../components/Header";

import { getPrismicClient } from "../services/prismic";
import { FiCalendar, FiUser } from "react-icons/fi";
import styles from "./home.module.scss";
import Prismic from "@prismicio/client";
import Link from "next/link";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";
import Head from "next/head";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function mapData(data) {
  return data.map((result) => ({
    uid: result.uid,
    first_publication_date: result.first_publication_date,
    data: {
      title: result.data.title,
      subtitle: result.data.subtitle,
      author: result.data.author,
    },
  }));
}

export default function Home(props: HomeProps) {
  const [posts, setPosts] = useState(props.postsPagination);

  async function handleLoadMorePosts(link) {
    fetch(link)
      .then((res) => res.json())
      .then((res) => {
        setPosts({
          next_page: res.next_page,
          results: [...posts.results, ...mapData(res.results)],
        });
      });
  }

  return (
    <>
      <Head>
        <title>Início | spacetraveling</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <div className={styles.postsList}>
          {posts.results.map((post) => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a className={styles.post}>
                <h3>{post.data.title}</h3>
                <p>{post.data.subtitle}</p>
                <div>
                  <span>
                    <FiCalendar size={20} />
                    <time>
                      {format(
                        new Date(post.first_publication_date),
                        "d LLL Y",
                        {
                          locale: ptBR,
                        }
                      )}
                    </time>
                  </span>
                  <span>
                    <FiUser size={20} />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {posts.next_page !== null && (
          <a
            role="button"
            className={styles.loadMore}
            onClick={() => handleLoadMorePosts(props.postsPagination.next_page)}
          >
            Carregar mais posts
          </a>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.subtitle", "post.author"],
      pageSize: 10,
    }
  );

  const results = mapData(response.results);

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: results,
      },
    },
  };
};
