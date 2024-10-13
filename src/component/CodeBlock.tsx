import * as React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language: string;
};
export default function CodeBlock({ code, language }: Props) {
  return (
    <SyntaxHighlighter
      style={dark}
      language={language}
      wrapLines={true}
      wrapLongLines={true}
      showLineNumbers={true}
      PreTag="div"
      showInlineLineNumbers={false}
      customStyle={{
        border: "1px solid #c3c3c3",
        borderRadius: "5px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
