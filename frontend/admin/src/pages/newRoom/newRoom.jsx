import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { roomInputs } from "../../formSource";

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState();
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers })
      .then((response) => {
        if (response) {
          swal("Hotel was created successfully! ", "success").then(
            (result) => {
              if (result) {
                navigate("/rooms");
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };



  // console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onChange={handleChange}>
              {/* {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))} */}
              <div className="formInput">
                <label>Title</label>
                <input type="text" name="title"/>
              </div>
              <div className="formInput">
                <label>Price</label>
                <input type="text" name="price"/>
              </div>
              {/* <div className="formInput">
                <label>Max People</label>
                <input type="text" name="maxPeople"/>
              </div> */}
              <div className="formInput">
                <label>Description</label>
                <input type="text" name="desc"/>
              </div>
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                  name="roomNumbers"
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
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

export default NewRoom;
