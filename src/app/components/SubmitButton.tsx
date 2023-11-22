import { Button, ButtonProps, LoadingOverlay } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = ButtonProps & {
  children: ReactNode;
};

export const SubmitButton: FC<Props> = ({ children, ...rest }) => {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      loading={status.pending}
      disabled={status.pending}
      {...rest}
    >
      {children}
    </Button>
  );
};
