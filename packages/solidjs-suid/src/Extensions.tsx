import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import { For, createMemo } from "solid-js";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

import "./styles.css";

function Extensions(props: ExtensionsProps) {
  const links = createMemo(() =>
    Object.values(props.extensions)
      .filter(isExtensionInfo)
      .map(toNavLink)
      .sort(byKey)
  );

  return (
    <Box
      aria-label="Extensions"
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <For each={links()}>
        {(link) => (
          <Button
            variant="text"
            onClick={(e) => props.onLinkClick?.(e, link)}
            sx={{
              justifyContent: "flex-start",
            }}
          >
            <span class="extension-link-text">{link.name}</span>
          </Button>
        )}
      </For>
    </Box>
  );
}

export default Extensions;
