import { Link } from "react-router-dom";

function StyledLink({ to, children, ...props }) {
  return (
    <Link to={to} className="no-click-overlay" {...props}>
      {children}
    </Link>
  );
}

export default StyledLink;
