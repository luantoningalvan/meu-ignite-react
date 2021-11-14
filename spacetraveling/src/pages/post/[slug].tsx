import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import Header from "../../components/Header";
import Head from "next/head";
import Link from "next/link";

import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

import styles from "./post.module.scss";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FiCalendar, FiUser, FiClock } from "react-icons/fi";
import { useRouter } from "next/router";
import { UtterancesComments } from "../../components/Comments";

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

function calculateTime(content) {
  const allWords: string[] = content.reduce(
    (acc: any, c) => [
      ...acc,
      ...String(c.heading + " " + RichText.asText(c.body)).split(" "),
    ],
    []
  );

  const minutes = Math.ceil(allWords.length / 200);
  return minutes;
}

export default function Post(props: PostProps) {
  const { post } = props;
  const estimatedTime = post ? calculateTime(post.data.content) : 0;
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Carregando | spacetraveling</title>
        </Head>
        <div>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <Header />
      <img
        className={styles.headerBanner}
        src={post.data.banner.url}
        alt={post.data.title}
      />
      <div className={styles.postContainer}>
        <h2>{post.data.title}</h2>

        <div className={styles.postInfo}>
          <span>
            <FiCalendar size={20} />
            <time>
              {format(new Date(post.first_publication_date), "d LLL Y", {
                locale: ptBR,
              })}
            </time>
          </span>
          <span>
            <FiUser size={20} />
            {post.data.author}
          </span>
          <span>
            <FiClock size={20} />
            {estimatedTime} min
          </span>
        </div>

        {post.last_publication_date &&
          post.first_publication_date !== post.last_publication_date && (
            <span className={styles.editDate}>
              {format(
                new Date(post.last_publication_date),
                "'* editado em ' d LLL Y', às 'hh:mm'h'",
                {
                  locale: ptBR,
                }
              )}
            </span>
          )}

        <div>
          {post.data.content.map((section) => (
            <>
              <h4>{section.heading}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(section.body),
                }}
              />
            </>
          ))}
        </div>

        <footer className={styles.postNavigation}>
          <Link href="">
            <a>
              <span>Como utilizar Hooks</span>
              <strong>Post anterior</strong>
            </a>
          </Link>
          <Link href="">
            <a>
              <span>Criando um app CRA do Zero</span>
              <strong>Próximo post</strong>
            </a>
          </Link>
        </footer>

        <UtterancesComments />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "como-utilizar-hooks",
        },
      },
      {
        params: {
          slug: "criando-um-app-cra-do-zero",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data?.title,
      subtitle: response.data?.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map((piece) => ({
        heading: piece.heading,
        body: piece.body,
      })),
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60,
  };
};
