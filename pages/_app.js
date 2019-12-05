import React from "react";
import App from "next/app";
import Nav from "../components/nav";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";

export default class MyApp extends App {
  navRef = React.createRef();

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
        <Nav ref={this.navRef} />
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} navRef={this.navRef} key={router.route} />
        </PageTransition>
        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
          :root {
            --accent-color: #0d6cf6;
            --background-color: #16151b;
            --text-color: white;
            --disabled-text-color: #28242a;
          }
          * {
            box-sizing: border-box;
          }
          *:not(input) {
            user-select: none;
          }
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          body:after {
            content: "";
            position: fixed;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            z-index: -1;
            background: var(--background-color);
          }
          #__next {
            background-color: var(--background-color);
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
          }
          .page-transition-enter {
            opacity: 0;
            width: 100%;
            flex: 1;
            overflow: scroll;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
            width: 100%;
            flex: 1;
            overflow: scroll;
          }
          .page-transition-enter-done {
            width: 100%;
            flex: 1;
            overflow: scroll;
          }
          .page-transition-exit {
            opacity: 1;
            width: 100%;
            flex: 1;
            overflow: scroll;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
            width: 100%;
            flex: 1;
            overflow: scroll;
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
