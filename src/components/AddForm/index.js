import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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
};

const AddForm = ({ onSubmit, taskList }) => {
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
          <InputLabel id="demo-simple-select-label">
            List
          </InputLabel>
          <Select
            defaultValue=""
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="List"
            {...register("list_id")}
          >
            {taskList.map((list) => (
              <MenuItem value={list.tasklist_id} key={list.tasklist_id}>
                {list.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="date" {...register("due_date")} />

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
