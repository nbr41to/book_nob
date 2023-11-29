import { Button, ButtonProps } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = ButtonProps & {
  children: ReactNode;
};

export const SubmitButton: FC<Props> = ({ children, ...rest }) => {
  const status = useFormStatus();
  const disabled = status.pending || rest.disabled;

  return (
    <Button
      type="submit"
      loading={status.pending}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};
