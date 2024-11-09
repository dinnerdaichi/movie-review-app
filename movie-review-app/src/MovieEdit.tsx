import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const MovieEdit: React.FC = () => {

  return (
    <>
      <div className="inner">
        <h1>ADD MOVIE</h1>
        <div>
          <Stack spacing={2}>
            <TextField
              label="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></TextField>
            <TextField
              label="imagePass"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            ></TextField>
          </Stack>
        </div>
        <Button
          sx={{ mt: 2, mr: 2 }}
          variant="contained"
          onClick={handleSubmit}
        >
          ADD MOVIE
        </Button>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => {
            BackBtn();
          }}
        >
          ⇐Back
        </Button>
      </div>
    </>
  );
}

export default MovieEdit;