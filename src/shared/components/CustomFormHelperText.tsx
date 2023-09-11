import React from "react";
import { styled } from "@mui/system";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FormHelperText, Typography } from "@mui/material";

interface CustomFormHelperTextProps {
  error: string;
}

const CustomFormHelperText = ({ error }: CustomFormHelperTextProps) => {
  return (
    <FormHelperTextErrorWrapper>
      <ErrorOutlineIcon fontSize="small" />
      <Typography
        paddingLeft={"5px"}
        variant="body2"
        sx={{ margin: "0px", fontSize: "122px" }}
      >
        <FormHelperText error>{error}</FormHelperText>
      </Typography>
    </FormHelperTextErrorWrapper>
  );
};

const FormHelperTextErrorWrapper = styled("div")`
  display: flex;
  align-items: center;

  .MuiFormHelperText-root {
    margin-top: 2px;
    font-size: 14px;
  }
`;

export default CustomFormHelperText;
