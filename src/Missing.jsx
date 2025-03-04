import { Link } from "react-router-dom";
const Missing = () => {
  return (
    <main className="Missing">
      <h2> 🚫 Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <p>
        <Link to='/'>Visit our Home Page</Link>
      </p>
    </main>
  )
}

export default Missing
