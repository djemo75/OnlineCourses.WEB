import DOMPurify from "isomorphic-dompurify";
import { FC } from "react";

type Props = {
  html: string;
};

const InnerHTML: FC<Props> = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    ></div>
  );
};

export default InnerHTML;
