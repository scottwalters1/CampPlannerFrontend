import React from "react";

interface ExampleProps {
  text: string;
}

const Example: React.FC<ExampleProps> = ({ text }) => {
  return (
    <div className="p-3 border rounded">
      <button className="btn btn-primary">{text}</button>
    </div>
  );
};

export default Example;
