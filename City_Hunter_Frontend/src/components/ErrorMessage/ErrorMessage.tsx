import { Alert } from "react-bootstrap";

const ErrorMessage = ({
  variant = "info",
  children,
}: {
  variant: any;
  children: any;
}) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
