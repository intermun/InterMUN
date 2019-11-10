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
            --accent-color: #0d6cf6;
            --background-color: #16151b;
            --text-color: white;
            --disabled-text-color: #28242a;
          }
          * {
            box-sizing: border-box;
          }
          html,
          body,
          #__next,
          .page-transition-enter-done {
            width: 100%;
            height: 100%;
            margin: 0;
          }
          #__next {
            background-color: var(--background-color);
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
          .montserrat-default {
            font-family: "Montserrat";
            color: var(--text-color);
            text-decoration: none;
            font-weight: 600;
          }
          .montserrat {
            font-family: "Montserrat";
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
      </>
    );
  }
}
