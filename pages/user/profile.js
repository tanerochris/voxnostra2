import React from 'react';
import AppHeader from '../../components/partials/AppHeader';
import SettingNav from '../../components/partials/settingNav';
import { SessionType } from '../../components/propTypes';
import { isAuthenticated } from '../../helpers/auth-helpers';
import getSession from '../../helpers/session-helpers';

const chooseFile = () => {
  document.getElementById('fileInput').click();
};

const ProfilePage = ({ session }) => {
  return (
    <div>
      <AppHeader user={session.user} />
      <section className="mt-3 mt-4">
        <div className="container">
          <div className="row u-section">
            <div className="column column-25 f">
              <div className="current m settings">
                <div className="row r">
                  <h5>Settings</h5>
                </div>
                <hr className="hr" />
                <SettingNav />
              </div>
            </div>
            <div className="column column-40 m">
              <form>
                <div className="row">
                  <h4>Update Profile</h4>
                </div>
                <hr className="hr" />
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input type="text" defaultValue={session.user.name} placeholder="Full Name" id="name" />
                  <label htmlFor="email">Email</label>
                  <input type="text" placeholder="Email" id="email" defaultValue={session.user.email} />
                  {/* <div className="row">
                    <div className="column">
                      <label htmlFor="town">Town</label>
                      <input type="text" placeholder="Town" id="town" />
                    </div>
                    <div className="column">
                      <label htmlFor="tel">Phone Number</label>
                      <input type="text" placeholder="Tel" id="tel" />
                    </div>
                  </div>
                  <label htmlFor="profession">Profession</label>
                  <input type="text" placeholder="Your profession" id="profession" />
                  <label htmlFor="url">Your Website</label>
                  <input type="text" placeholder="Enter url" id="url" />
                  <label htmlFor="address">Address</label>
  <input type="text" placeholder="Enter your address" id="address" /> */}
                  <button className="button-primary" type="submit" value="Send">
                    Update Profile
                  </button>
                </fieldset>
              </form>
            </div>

            <div className="column column-25 f">
              <div className="current m project">
                <div className="row ">
                  <h5>Profile Picture</h5>
                </div>
                <hr className="hr" />
                <div className="row r">
                  <img src="/assets/images/avatar-1.png" alt="project-logo" />
                </div>
                <div className="row edit-button">
                  <button className="button-primary" type="button" onClick={chooseFile}>
                    Change Picture
                  </button>
                </div>
                <div style={{ height: '0', overflow: 'hidden' }}>
                  <input type="file" id="fileInput" name="fileInput" />
                </div>
              </div>
              <div className="complete m">
                <div className="row pr project">
                  <form>
                    <div className="row r">
                      <h5>Change Password</h5>
                    </div>
                    <hr className="hr" />
                    <fieldset>
                      <label htmlFor="password">
                        Old Password <span className="red">*</span>
                      </label>
                      <input type="password" placeholder="Your Password" id="password" />
                      <label htmlFor="npassword">
                        New Password <span className="red">*</span>
                      </label>
                      <input type="password" placeholder="New Password" id="npassword" />
                      <label htmlFor="cpassword">
                        Confirm Password <span className="red">*</span>
                      </label>
                      <input type="password" placeholder="Re-Enter Password" id="cpassword" />
                      <button className="button-primary" type="submit" value="Send">
                        Change Password
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ProfilePage.propTypes = {
  session: SessionType
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  if (!isAuthenticated(req)) {
    res.writeHead(302, { location: '/login' });
    res.end();
  }
  return { props: { session } };
};

export default ProfilePage;
