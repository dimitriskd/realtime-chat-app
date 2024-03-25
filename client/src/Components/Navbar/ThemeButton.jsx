import Theme from "../../utils/Theme";

export default function ThemeButton() {
  return (
    <div className="dropdown dropdown-right">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle p-2 rounded-full">
        <span className="material-symbols-outlined filled">dark_mode</span>
      </div>
      <ul
        tabIndex={0}
        className="nav-dropdown"
      >
        <li>
          <Theme />
        </li>
      </ul>
    </div>
  );
}
