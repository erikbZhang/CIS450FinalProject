import { NavLink } from 'react-router-dom';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text }) => {
  return (
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
  )
}

export default function Nav() {
  return(
    
    <header className="fixed top-0 left-0 w-full bg-green-200 p-4">
      <nav className="flex justify-between">
        <h1 className="text-2xl font-semibold"><NavText href="/" text="emotiplay" isMain /></h1>
        <ul className="flex space-x-4">
          <NavText href="/" text="Write!" isMain />
          <NavText href="/Choose" text="Choose!" />
          <NavText href="/Search" text="Search!" />
        </ul>
      </nav>
    </header>
  )
}