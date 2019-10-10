import React from "react";
import App from "next/app";
import Nav from "../components/nav";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/static/favicon.ico" importance="low" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <Nav />
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
        <style jsx global>{`
          :root {
            --accent-color: #05cfd8;
          }
          * {
            box-sizing: border-box;
          }
          body {
            background-color: #353d4a;
            margin: 0;
          }
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
          }
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
          .montserrat {
            font-family: "Montserrat";
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
      </>
    );
  }
}
