import { ActionIcon, ActionIconProps } from "@mantine/core";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = ActionIconProps & {
  children: ReactNode;
};

export const SubmitIconButton: FC<Props> = ({ children, ...props }) => {
  const status = useFormStatus();

  return (
    <ActionIcon
      type="submit"
      loading={status.pending}
      disabled={status.pending}
      {...props}
    >
      {children}
    </ActionIcon>
  );
};
