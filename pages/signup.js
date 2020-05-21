import AppHeader from './components/app_header';

export default function Signup() {
  return (
  <div>
    <AppHeader />
    <section className="mt-4">
      <div className="container">
          <div className="row r-section">
              <div className="column column-40">
                  <form>
                      <div className="row">
                          <h4>Create an Account</h4>
                      </div>
                      <hr/>
                      <fieldset>
                        <label htmlFor="name">Name <span className="red">*</span></label>
                        <input type="text" placeholder="Full Name" id="name"/>
                        <label htmlFor="email">Email <span className="red">*</span></label>
                        <input type="text" placeholder="Email" id="email"/>
                        <div className="row">
                            <div className="column">
                              <label htmlFor="town">Town <span className="red">*</span></label>
                              <input type="text" placeholder="Town" id="town"/>
                            </div>
                            <div className="column">
                              <label htmlFor="tel">Phone Number <span className="red">*</span></label>
                              <input type="text" placeholder="Tel" id="tel"/>
                            </div>
                        </div>
                        <label htmlFor="password">Password <span className="red">*</span></label>
                        <input type="password" placeholder="Your Password" id="password"/>
                        <label htmlFor="password">Confirm Password <span className="red">*</span></label>
                        <input type="password" placeholder="Re-Enter Password" id="password"/>
                        <div className="float-left">
                          <input type="checkbox" id="terms"/>
                          <label className="label-inline" htmlFor="terms">Agree to terms and conditions</label>
                        </div>
                        <button className="button-primary" type="submit" value="Send">Create Account</button>
                      </fieldset>
                    </form>
              </div>
          </div>
      </div>
  </section>
  </div>
  );
}
