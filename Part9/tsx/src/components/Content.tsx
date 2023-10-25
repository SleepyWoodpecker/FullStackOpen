import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

function Content(contentProps: ContentProps) {
  const { courseParts } = contentProps;

  return courseParts.map((coursePart) => <Part part={coursePart} />);
}

export default Content;
