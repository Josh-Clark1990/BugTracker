import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (  
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <i className="bi bi-code-slash"></i>
          <span className="h4 mb-0">Bug Tracker</span>
        </a>
        <ul className="navbar-nav ms-3">
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Bugs</a>
          </li>
        </ul>
      </nav>  

      {/* Main content */}
      <main className="container d-flex justify-content-evenly my-4"> 
        <div className="d-flex justify-content-center border border-dark border-5 border-top-0 rounded-bottom px-5">
          <div className="vstack text-center">
            <h1>Users</h1>  
            <ul className="list-unstyled">
              <li>User 1</li>
              <li>User 2</li>
              <li>User 3</li>
              <li>User 4</li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-center border border-dark border-5 border-top-0 rounded-bottom px-5">
          <div className="vstack text-center">
            <h1>Bugs</h1>  
            <ul className="list-unstyled">
              <li>Bug 1</li>
              <li>Bug 2</li>
              <li>Bug 3</li>
              <li>Bug 4</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-light py-3">
        <div className="container">
          <h4 className="d-flex justify-content-center mb-0">@2025 Courtney Clark</h4>
        </div>
      </footer>
    </>
  );
}

export default App;
