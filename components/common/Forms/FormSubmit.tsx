import { useFormikContext } from "formik";
import Button from "../Button";
import { ReactNode } from "react";

const FormSubmit = ({ children, isLoading = false }: { children: ReactNode; isLoading?: boolean }) => {
  const { handleSubmit } = useFormikContext<any>();

  return (
    <Button type="button" disabled={isLoading} click={handleSubmit}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
};

export default FormSubmit;
