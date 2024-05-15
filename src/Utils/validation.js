import * as yup from "yup";

export const validateStudentData = yup.object({
  name: yup.string().required("Name is required!"),
  subject: yup.string().required("Subject is required!"),
  marks: yup.string().required("Marks is required"),
});

export const validateLogin = yup.object({
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
});
