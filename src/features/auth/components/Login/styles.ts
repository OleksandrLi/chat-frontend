import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

const Wrapper = styled(Box)`
  width: 100%;
  min-height: calc(88vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SingUpLabel = styled(Typography)`
  font-weight: bold;
`;

const PasswordTitleContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { Wrapper, SingUpLabel, PasswordTitleContainer };
