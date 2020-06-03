import AppHeader from '../components/partials/appHeader';

export default function Home() {
  return (
    <div>
      <AppHeader />
      <section className="mt-5">
        <div className="container">
          <div className="row r-section">
            <div className="column column-40">
              <h1>Help our Society Grow</h1>
              <p>
                Voxnostra is platform that permits citzens in Cameroon to keep track of government public project. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              </p>
            </div>
            <div className="column column-40">
              <form>
                <fieldset>
                  <input type="text" name="username" placeholder="Username" id="username" />
                  <input type="text" name="email" placeholder="Email" id="email" />
                  <input type="text" name="password" placeholder="Password" id="password" />
                  <button className="button-primary" type="submit" value="Send">
                    Sign in
                  </button>
                  <div className="example-send-yourself-copy">
                    <p>
                      Forgot Password? click <a href="#">here</a>
                    </p>
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
