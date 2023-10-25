interface HeaderProps {
  courseName: string;
}

function Header(headerProps: HeaderProps) {
  const { courseName } = headerProps;
  return <h1>{courseName}</h1>;
}

export default Header;
