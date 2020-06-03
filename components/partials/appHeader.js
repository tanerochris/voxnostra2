import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';

export default class AppHeader extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <header>
        <Head>
          <title>Home Page</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css" />
          <link rel="stylesheet" href="/assets/css/styles.css" />
        </Head>
        <nav className="bar default">
          <div className="container">
            <Link href="/index">
              <a className="navigation-title" href="">
                <span className="title">&nbsp;Voxnostra</span>
              </a>
            </Link>
            <Link href="/signup">
              <a href="#" className="right up">
                Sign up
              </a>
            </Link>
            <Link href="/login">
              <a href="#" className="right">
                Sign in
              </a>
            </Link>
            <svg className="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" />
            </svg>
            <input type="search" className="right" placeholder="Search Voxnostra" />
          </div>
        </nav>
      </header>
    );
  }
}
