import React, { useState, KeyboardEvent } from "react";
import { Box, Input, FormControl, Button } from "@mui/material";

type MessageFormProps = {
  sendMessage: (message: string) => void;
};

export const MessageForm: React.FC<MessageFormProps> = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text) {
      sendMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "calc(100% - 20px)",
        position: "absolute",
        bottom: "10px",
        left: "10px",
      }}
    >
      <FormControl
        sx={{
          width: "100%",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          id="input"
          placeholder="Type message..."
          sx={{
            width: "100%",
            borderColor: "#1976d2",
            "&:before": {
              borderBottom: "1px solid #1976d2",
            },
          }}
        />
        <Box>
          <Button
            variant="outlined"
            sx={{
              height: "30px",
              fontSize: "14px",
              textTransform: "none",
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
