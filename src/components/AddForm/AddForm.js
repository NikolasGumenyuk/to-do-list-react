import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

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
  date: {
    marginTop: "10px",
    marginBottom: "10px",
  },
};

const AddForm = ({ onSubmit, taskList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div style={styles.container}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new task
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          {...register("title", {
            required: { value: true, message: "Ніхуя немає" },
          })}
        />
        {errors?.title && <span>{errors.title.message}</span>}
        <TextField
          margin="normal"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          {...register("description")}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">List</InputLabel>
          <Select
            defaultValue=""
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="List"
            {...register("list_id", {
              required: { value: true, message: "Select list please" },
            })}
          >
            {taskList.map((list) => (
              <MenuItem value={list.tasklist_id} key={list.tasklist_id}>
                {list.title}
              </MenuItem>
            ))}
          </Select>
          {errors?.list_id && <span>{errors.list_id.message}</span>}
        </FormControl>

        <input type="date" style={styles.date} {...register("due_date")} />

        <Button
          variant="contained"
          color="success"
          type="submit"
          margin="normal"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
