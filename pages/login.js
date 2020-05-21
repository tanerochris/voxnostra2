import AppHeader from './components/app_header';

export default function Login() {
  return (
  <div>
    <AppHeader />
    <section className="mt-4">
        <div className="container">
            <div className="row r-section">
                <div className="column column-40">
                    <form>
                        <div className="row">
                            <h4>Login to your Account</h4>
                        </div>
                        <hr/>
                        <fieldset>
                          <label htmlFor="email">Email <span className="red">*</span></label>
                          <input type="text" placeholder="Email" id="email"/>
                          <label htmlFor="password">Password <span className="red">*</span></label>
                          <input type="password" placeholder="Your Password" id="password"/>
                          <button className="btn button-primary" type="submit" value="Send">Login</button>
                          <div className="example-send-yourself-copy">
                            <p>Forgot Password? click <a href="#">here</a></p>
                          </div>
                        </fieldset>
                      </form>
                </div>
            </div>
        </div>
    </section>
  </div>
  );
}
