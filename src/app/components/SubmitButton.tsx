import { Button } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
};

export const SubmitButton: FC<Props> = ({ children }) => {
  const status = useFormStatus();

  return (
    <Button
      variant="outline"
      type="submit"
      loading={status.pending}
      disabled={status.pending}
    >
      {children}
    </Button>
  );
};
