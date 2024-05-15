import React, { useState } from "react";
import "./listing.css";
import data from "../../Mockdata/StudentData.json";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validateStudentData } from "../../Utils/validation";
import { Toaster } from "../../Utils/toaster";
import PersonIcon from "@mui/icons-material/Person";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

const StudentListing = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(data);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [StudentID, setStudentID] = useState("");
  const [individualData, setIndividualData] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      marks: "",
    },
    validationSchema: validateStudentData,
    onSubmit: () => {
      addnewStudent();
    },
  });

  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: individualData.name,
      subject: individualData.subject,
      marks: individualData.marks,
    },
    validationSchema: validateStudentData,
    onSubmit: (value) => {
      console.log(value);
      updateStudentData(StudentID);
    },
  });

  //   update individual student data
  const updateStudentData = (id) => {
    // console.log(id);
    setStudentData(
      studentData.map((student, i) =>
        student.id === id
          ? {
              ...student,
              name: editFormik.values.name || individualData.name,
              subject: editFormik.values.subject || individualData.subject,
              marks: editFormik.values.marks || individualData.marks,
            }
          : student
      )
    );
    Toaster("success", "Updated Successfully");
    setOpenEdit(false);
  };

  //   add new student data into list
  const addnewStudent = () => {
    let id = studentData.length + 1;
    let newStudent = {
      id: id,
      name: formik.values.name,
      subject: formik.values.subject,
      marks: formik.values.marks,
    };
    setStudentData([...studentData, newStudent]);
    setOpen(false);
  };

  //delete student data from list
  const deleteStudent = (index) => {
    setStudentData(studentData.filter((c, i) => index !== i));
    Toaster("success", "Deleted Successfully");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center px-10">
        <p className="font-semibold text-[30px] text-red-600">tailwebs.</p>
        <div className="flex items-center gap-10">
          <p className="font-semibold text-[18px] cursor-pointer">Home</p>
          <p
            className="font-semibold text-[18px] cursor-pointer"
            onClick={() => {
              navigate("/");
              Toaster("success", "Logged Out Successfully");
            }}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="bg-gray-100 mt-2 p-6 rounded">
        <div className="bg-white p-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="w-[25%] text-gray-400 text-start px-4 font-normal">
                Name
              </p>
              <p className="w-[46%] text-gray-400 text-start px-5 font-normal">
                Subject
              </p>
              <p className=" text-gray-400 text-start px-5 font-normal">Mark</p>
              <p className=" text-gray-400 text-start px-4 font-normal">
                Action
              </p>
            </div>
          </div>
        </div>
        {studentData?.map((item, i) => (
          <div className="bg-white px-3" key={i}>
            <div className=" border-t-[2px] border-gray-200">
              <div className="flex justify-between items-center h-14">
                <p className="w-[25%] text-gray-500 text-start px-4 font-normal">
                  {item?.name}
                </p>
                <p className="w-[46%] text-gray-500 text-start px-5 font-normal">
                  {item?.subject}
                </p>
                <p className=" text-gray-500 text-start px-5 font-normal">
                  {item?.marks}
                </p>
                <p className=" text-black cursor-pointer text-start px-4 font-normal">
                  <PopupState popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button
                          sx={{ color: "black" }}
                          {...bindTrigger(popupState)}
                        >
                          <ArrowDropDownCircleIcon />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem
                            onClick={() => {
                              popupState.close();
                              setIndividualData(item);
                              setStudentID(item.id);
                              setOpenEdit(true);
                              console.log(item);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              popupState.close();
                              deleteStudent(i);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </p>
              </div>
            </div>
          </div>
        ))}
        <button
          className="add-btn mt-10"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>

      {/* Add User popup */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          formik.resetForm({});
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "600px",
              minHeight: "420px",
            },
          },
        }}
      >
        <div className="pt-12 px-[120px]">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <p>Name</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <PersonIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="addUser-inputs pl-3"
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 font-normal">{formik.errors.name}</p>
              )}
            </div>
            <div className="mt-2">
              <p>Subject</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <SpeakerNotesIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  className="addUser-inputs pl-3"
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.subject && formik.errors.subject && (
                <p className="text-red-500 font-normal">
                  {formik.errors.subject}
                </p>
              )}
            </div>
            <div className="mt-2">
              <p>Marks</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <TurnedInNotIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="marks"
                  placeholder="Enter Marks"
                  className="addUser-inputs pl-3"
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.marks && formik.errors.marks && (
                <p className="text-red-500 font-normal">
                  {formik.errors.marks}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center mt-10">
              <button className="addUser-btn" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Edit User popup */}
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          editFormik.resetForm({});
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "600px",
              minHeight: "420px",
            },
          },
        }}
      >
        <div className="pt-14 px-[120px]">
          <form onSubmit={editFormik.handleSubmit}>
            <div>
              <p>Name</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <PersonIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="addUser-inputs pl-3"
                  defaultValue={individualData.name}
                  onChange={editFormik.handleChange}
                />
              </div>
              {editFormik.touched.name && editFormik.errors.name && (
                <p className="text-red-500 font-normal">
                  {editFormik.errors.name}
                </p>
              )}
            </div>
            <div className="mt-2">
              <p>Subject</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <SpeakerNotesIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  className="addUser-inputs pl-3"
                  defaultValue={individualData.subject}
                  onChange={editFormik.handleChange}
                />
              </div>
              {editFormik.touched.subject && editFormik.errors.subject && (
                <p className="text-red-500 font-normal">
                  {editFormik.errors.subject}
                </p>
              )}
            </div>
            <div className="mt-2">
              <p>Marks</p>
              <div className="mt-2 px-2 rounded h-[40px] flex items-center border-[1px] border-solid border-[#cfcfcf]">
                <span className="icons pr-[6px]">
                  <TurnedInNotIcon
                    sx={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      color: "#979595",
                    }}
                  />
                </span>
                <input
                  type="text"
                  name="marks"
                  placeholder="Enter Marks"
                  className="addUser-inputs pl-3"
                  defaultValue={individualData.marks}
                  onChange={editFormik.handleChange}
                />
              </div>
              {editFormik.touched.marks && editFormik.errors.marks && (
                <p className="text-red-500 font-normal">
                  {editFormik.errors.marks}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center mt-10">
              <button className="addUser-btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default StudentListing;
