import PropTypes from 'prop-types';
import { withSession } from 'next-session';
import jsHttpCookie from 'cookie';
import UserHeader from '../../../components/partials/userHeader';
import SettingNav from '../../../components/partials/settingNav';

const chooseFile = () => {
  document.getElementById('fileInput').click();
};

const Profile = function Profile({ user }) {
  return (
    <div>
      <UserHeader />
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
                  <input type="text" defaultValue={user.name} placeholder="Full Name" id="name" />
                  <label htmlFor="email">Email</label>
                  <input type="text" placeholder="Email" id="email" defaultValue={user.email} />
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
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let user = null;
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === 'string') {
      const cookiesJson = jsHttpCookie.parse(cookies);
      user = JSON.parse(cookiesJson.user);
    }
  }

  let errorCode = null;
  if (!user) errorCode = 404;
  return {
    props: {
      user,
      errorCode
    } // will be passed to the page component as props
  };
}
Profile.propTypes = {
  user: PropTypes.object,
  errorCode: PropTypes.number
};
export default withSession(Profile, {});
