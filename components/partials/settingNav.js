import { Component } from 'react';
import Link from 'next/link';

export default class SettingNav extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="row pr">
        <div className="row active">
          <Link href="/user/setting">
            <a href="">Profile Settings</a>
          </Link>
        </div>
        <div className="row">
          <a href="">Your Organisation</a>
        </div>
        <div className="row">
          <a href="">Your Projects</a>
        </div>
      </div>
    );
  }
}
