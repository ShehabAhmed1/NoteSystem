import { Link } from "react-router-dom";

const links = [
  {
    name: "ضيف ملحوظه",
    path: "/",
  },
  {
    name: "مخزن الملاحظات",
    path: "/shownotes",
  },
];

function NavBar() {
  return (
    <nav>
      <div className="main-container">
        <div className="nav-content">
          <ul>
            {links.map((l, i) => {
              return (
                <Link key={i} to={l.path}>
                  {l.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
