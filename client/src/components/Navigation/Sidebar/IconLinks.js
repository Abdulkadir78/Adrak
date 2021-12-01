import { useLocation, useHistory } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import { colors } from "../../../constants";
import useThemeSelector from "../../../hooks/selectors/useThemeSelector";

function Icons({ open, handleDrawerToggle }) {
  const { isDark } = useThemeSelector();
  const location = useLocation();
  const history = useHistory();

  const iconStyles = {
    size: 24,
    style: { color: isDark ? colors.light : colors.secondary },
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <MdOutlineDashboard {...iconStyles} />,
      path: "/dashboard",
    },
    {
      text: "Projects",
      icon: <AiOutlineFundProjectionScreen {...iconStyles} />,
      path: "/projects",
    },
  ];

  const handleClick = (path) => {
    handleDrawerToggle && handleDrawerToggle();
    history.push(path);
  };

  return (
    <List sx={{ mt: 3 }}>
      {menuItems.map((item, index) => (
        <ListItemButton
          title={!open ? item.text : ""}
          key={index}
          disableRipple
          selected={location.pathname === item.path}
          onClick={() => {
            handleClick(item.path);
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}

      {/* This is outside the map because it has a wildcard in it's path */}
      <ListItemButton
        title={!open ? "Manage" : ""}
        disableRipple
        selected={location.pathname.includes("/project/")}
        onClick={() => {
          handleClick("/project/no-project-selected");
        }}
      >
        <ListItemIcon>
          <AiOutlineFolderOpen {...iconStyles} />
        </ListItemIcon>
        <ListItemText primary="Manage" />
      </ListItemButton>
    </List>
  );
}

export default Icons;
