import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
  select: {
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
};

const AddForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          {...register("title")}
        />
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          {...register("description")}
        />
        <input type="date" {...register("due_date")} />
        <Button variant="contained" color="success" type="submit" margin="normal">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
