import Head from 'next/head';
import { Component } from 'react';
import Link from 'next/link';

export default class UserHeader extends Component {
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
            <svg className="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" />
            </svg>
            <input type="search" className="left" placeholder="Search Voxnostra" />
            <div className="dropdown right">
              <input type="checkbox" id="ct2" />
              <label htmlFor="ct2" className="right"></label>
              <div id="profile" className="right">
                <img src="/assets/images/avatar-1.png" alt="userprofilepic" />
              </div>
              <ul>
                <li>
                  <a href="#username">Cliffordten</a>
                </li>
                <li>
                  <a href="#organisation">Your Organisations</a>
                </li>
                <li>
                  <a href="#projects">Your Projects</a>
                </li>
                <li>
                  <Link href="/page/user/profile">
                    <a href="#projects">Profile settings</a>
                  </Link>
                </li>
                <li>
                  <a href="#projects">Sign out</a>
                </li>
              </ul>
            </div>
            <div className="dropdown right">
              <input type="checkbox" id="ct1" />
              <label htmlFor="ct1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
                </svg>
              </label>
              <ul>
                <li>
                  <a href="#username">Cliffordten</a>
                </li>
                <li>
                  <a href="#organisation">Create Organisations</a>
                </li>
                <li>
                  <a href="/page/project/create">Create Projects</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
