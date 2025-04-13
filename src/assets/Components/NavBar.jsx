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
                <a key={i} href={l.path}>
                  {l.name}
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
