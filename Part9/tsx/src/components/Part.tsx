import { CoursePart } from "../App";
import { assertNever } from "../utils";

interface PartProps {
  part: CoursePart;
}

function Part(partProps: PartProps) {
  const { part } = partProps;
  let kindSpecificContent;
  switch (part.kind) {
    case "basic":
      kindSpecificContent = <p>{part.description}</p>;
      break;
    case "group":
      kindSpecificContent = <p>project exercises {part.groupProjectCount}</p>;
      break;
    case "background":
      kindSpecificContent = (
        <>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
      break;
    case "special":
      kindSpecificContent = (
        <>
          <p>
            <i>{part.description}</i>
          </p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </>
      );
      break;
    default:
      return assertNever(part);
  }

  return (
    <>
      <b>
        {part.name} {part.exerciseCount}
      </b>
      {kindSpecificContent}
    </>
  );
}

export default Part;
