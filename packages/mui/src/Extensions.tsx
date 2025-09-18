import { Button, Grid, List, ListItem } from "@mui/material";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  return (
    <Grid className="extension-root" size="auto">
      <List aria-label="Extensions">
        {links.map((link) => (
          <ListItem key={link.key}>
            <Button
              className="nav-button"
              sx={{ justifyContent: "flex-start" }}
              onClick={(e) => onLinkClick?.(e, link)}
            >
              {link.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Extensions;
