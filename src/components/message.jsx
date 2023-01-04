import { Alert } from "react-bootstrap";

export const Message = ({ variant, children, setMessage }) => {
  return (
    <Alert
      className={`border-0 bg-${variant} text-white`}
      onClose={() =>
        setMessage({
          text: "",
          type: "",
        })
      }
      dismissible
    >
      {children}
    </Alert>
  );
};
