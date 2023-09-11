import { styled } from "@mui/system";
import { Paper as MaterialPaper } from "@mui/material";

const Paper = styled(MaterialPaper)`
  border: 1px solid #ededed;
  border-radius: 8px;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.08),
    0px 2px 4px -2px rgba(0, 0, 0, 0.04);
`;

export { Paper };
