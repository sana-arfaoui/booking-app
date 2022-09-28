import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";



const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const navigate = useNavigate();

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "upload");
  //   try {
  //     const uploadRes = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dn7ewye5y/image/upload",

  //       data
  //     );

  //     const { url } = uploadRes.data;

  //     const newUser = {
  //       ...info,
  //       img: url,
  //     };

  //     await axios.post("/auth/register", newUser);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log(info);
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dn7ewye5y/image/upload",

        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };
      await axios
            .post("/auth/register", newUser)
            .then((response) => {
              if (response) {
                  
                  swal(
                      "Welcome!",
                      "Your account was created successfully! Please check your email.",
                      "success"
                  ).then((result) => {
                      if (result) {
                          navigate("/login");
                      }
                  });
              }
          })
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onChange={handleChange}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>

                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>userName</label>
                <input type="text" placeholder="jane Doe" name="username" />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="email" placeholder="aaa@gmail.com" />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder="+216 23569874" />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input type="password" />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input type="text" placeholder="country" />
              </div>
              <div className="formInput">
                <label>City</label>
                <input type="text" placeholder="city" />
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
