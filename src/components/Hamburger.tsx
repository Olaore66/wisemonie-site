type HamburgerProps = {
  open: boolean;
  onClick: () => void;
};

function Hamburger({ open, onClick }: HamburgerProps) {
  return (
    <button
      className={`Hamburger ${open ? "open" : ""}`}
      onClick={onClick}
      aria-label="Toggle navigation"
      aria-expanded={open}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

export default Hamburger;
