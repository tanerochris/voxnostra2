import UserHeader from '../../../components/partials/userHeader';

export default function Signup() {
  return (
    <div>
      <UserHeader />
      <section className="sec-org">
        <div className="bg-org">
          <img src="/assets/images/org_bg_img.jpg" alt="organisation-image" />
        </div>
        <div className="info-org">
          <div className="row">
            <img src="/assets/images/avatar-1.png" alt="organisation-logo" />
          </div>
          <div className="row">
            <h3>Organization Name</h3>
          </div>
          <div className="row">
            <h4>Description</h4>
          </div>
          <div className="row">
            <p>2,343 Followers</p>
          </div>
        </div>
      </section>

      <section className="mt-3">
        <div className="container">
          <div className="row u-section">
            <div className="column column-25 f">
              <div className="current m">
                <div className="row r">
                  <h5>Organisation Projects</h5>
                </div>
                <hr className="hr" />
                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name 1</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="in-progress">In Progress</span>
                    </p>
                  </div>
                </div>

                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name 2</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="warning">Warning</span>
                    </p>
                  </div>
                </div>

                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name 3</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="danger">Danger</span>
                    </p>
                  </div>
                </div>

                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="in-progress">In Progress</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="complete m">
                <div className="row pr follow">
                  <input type="checkbox" id="checkbox" />
                  <p htmlFor="checkbox">Follow this Organization</p>
                </div>
              </div>
            </div>
            <div className="column column-40 m">
              <div className="row r">
                <h5>About Organization</h5>
              </div>
              <hr className="hr" />
              <div className="row d">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet, neque in consectetur imperdiet,
                  lacus sem lobortis enim, vitae accumsan ligula nulla ac lacus. Pellentesque in augue eget nuncdictum
                  sodales. In blandit pellentesque vestibulum. Interdum et malesuada fames ac ante ipsum primis in
                  faucibus. In vel sollicitudin leo.
                </p>
              </div>
              <div className="row comment">
                <p>12 Comments</p>
              </div>
              <div className="row comments">
                <div className="row cmt">
                  <div className="column column-20">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-80">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a sit excepturi quisquam ullam? Quia
                      inventore consectetur debitis, error voluptas officiis dolores excepturi consequuntur officia.
                    </p>
                    <div className="row post-time">
                      <em>posted 5h ago</em>
                    </div>
                  </div>
                </div>
                <div className="row cmt">
                  <div className="column column-20">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-80">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a sit excepturi quisquam ullam? Quia
                      inventore consectetur debitis, error voluptas officiis dolores excepturi consequuntur officia.
                    </p>
                    <div className="row post-time">
                      <em>posted 5h ago</em>
                    </div>
                  </div>
                </div>
                <div className="pos">
                  <div className="row cmt post">
                    <div className="column column-10">
                      <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                    </div>
                    <div className="column column-67">
                      <input type="text" name="write-comment" id="write-comment" placeholder="Write a comment" />
                    </div>
                    <div className="column column-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-25 m">
              <div className="row r">
                <h5>People in Organizations</h5>
              </div>
              <hr className="hr" />
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
