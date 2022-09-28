import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import useFetch from "../../hooks/useFetch";

import { useNavigate, Link } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [regError, setRegError] = useState();

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  // console.log(files)

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dn7ewye5y/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      axios
        .post("/hotels", newhotel)
        .then((response) => {
          if (response) {
            swal("Hotel was created successfully! ", "success").then(
              (result) => {
                if (result) {
                  navigate("/hotels");
                }
              }
            );
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    } catch (err) {
      if (err) {
        setRegError(err.response.data.error);
        
      }
    }
  };
  // console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <div className="formInput">
              <label htmlFor="files">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="files"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            <form onChange={handleChange}>
              <div className="formInput">
                <label>Name</label>
                <input type="text" name="name" />
                

              </div>
              {/* <div className="formInput">
                <label>Type</label>
                <input type="text" name="type" />
              </div> */}
              {/* <div className="formInput">
                <label>Address</label>
                <input type="text" name="address" />
              </div> */}
              <div className="formInput">
                <label>distance from City center</label>
                <input type="text" name="distance" />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input type="text"  name="desc" />
              </div>

              <div className="formInput">
                <label>Price</label>
                <input type="text" name="cheapestPrice" />
              </div>
              <div className="formInput">
                <label>Rating</label>
                <input type="text" name="rating" />
              </div>
              <div className="formInput">
                <label>City</label>
                <input type="text" name="city" />
              </div>
              {/* <div className="formInput">
                <label>Country</label>
                <input type="text" name="country" />
              </div> */}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" name="featured">
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id} name="rooms">
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
