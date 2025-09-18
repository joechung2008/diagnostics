import { byKey, isExtensionInfo, toNavLink } from "@/lib/utils";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  return (
    <nav
      aria-label="Extensions"
      className="flex flex-col gap-2 max-h-max overflow-y-auto p-2"
    >
      {links.map((link) => (
        <button
          className="extension-nav-button w-full min-h-[max-content] box-border cursor-pointer text-left px-2 py-1 rounded hover:bg-accent"
          key={link.key}
          onClick={(e) => onLinkClick?.(e, link)}
          tabIndex={0}
          type="button"
        >
          {link.name}
        </button>
      ))}
    </nav>
  );
};

export default Extensions;
