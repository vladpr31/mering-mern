import React, { useState, useEffect } from "react";

import ApotroposModal from "../../../Modals/ApotroposModal";
import { useDispatch } from "react-redux";
import { register } from "../../../../Redux/Actions/authActions";
import { useNavigate } from "react-router";
import { checkInputs } from "../../../../utils/utils";
const PatientRegister = () => {
  const navigate = useNavigate();

  const [hasApotropos, setHasApotropos] = useState(false);
  const [passwordValid, setPasswordValid] = useState();
  const [newPatient, setnewPatient] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    illnesses: [],
    Apotropos: null,
    gender: "",
    dateOfBirth: new Date(),
  });
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [apotropos, setApotropos] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const formHandler = (e) => {
    if (e?.target) {
      const { id, value } = e.target;
      setError("");
      switch (id) {
        case "first_name":
          setnewPatient((prevState) => ({
            ...prevState,
            firstName: value,
          }));
          break;
        case "last_name":
          setnewPatient((prevState) => ({
            ...prevState,
            lastName: value,
          }));
          break;
        case "email":
          setNewUser((prevState) => ({
            ...prevState,
            email: value,
          }));
          break;
        case "password":
          setNewUser((prevState) => ({
            ...prevState,
            password: value,
          }));
          break;
        case "confirm_password":
          setPasswordValid(value);
          break;
        case "city":
          setnewPatient((prevState) => ({
            ...prevState,
            city: value,
          }));
          break;
        case "address":
          setnewPatient((prevState) => ({
            ...prevState,
            address: value,
          }));
          break;
        case "phone_number":
          setnewPatient((prevState) => ({
            ...prevState,
            phoneNumber: value,
          }));
          break;
        case "patient_gender_male":
        case "patient_gender_female":
          setnewPatient((prevState) => ({
            ...prevState,
            gender: value,
          }));
          break;
        case "dateOfBirth":
          setnewPatient((prevState) => ({
            ...prevState,
            dateOfBirth: new Date(value),
          }));
        case "close_pressed":
          setApotropos({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            city: "",
            phoneNumber: "",
          });
          break;
      }
    }
  };
  console.log(newPatient);
  const registerHandler = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    let err;
    const notEmpty = checkInputs(newUser, newPatient);
    if (typeof notEmpty !== "object") {
      if (hasApotropos) {
        err = await dispatch(
          register({ newUser, newPatient, apotropos }, navigate)
        );
      } else {
        err = await dispatch(register({ newUser, newPatient }, navigate));
      }
    }
    if (err === "Email Already In Use") {
      setError((prevState) => ({ ...prevState, email: err }));
    } else {
      setError(notEmpty);
    }
  };
  return (
    <div className="py-4 px-8 min-h-screen">
      <form>
        <div className="flex justify-evenly mb-8">
          <div className="flex items-center">
            <input
              type="radio"
              name="radio"
              className="radio radio-accent mr-2"
              checked={newPatient.gender === "Male"}
              onChange={formHandler}
              id="patient_gender_male"
              value="Male"
            />{" "}
            <label>Male</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="radio"
              className="radio radio-accent mr-2"
              checked={newPatient.gender === "Female"}
              onChange={formHandler}
              id="patient_gender_female"
              value="Female"
            />
            <label>Female</label>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              First Name
              <input
                className={`${
                  error !== "" && error.firstName ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="first_name"
                type="text"
                placeholder="Your first name"
                required
                onChange={formHandler}
              />
            </label>
            {error !== "" && error.firstName ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.firstName}
              </span>
            ) : null}
          </div>
          <div className="w-1/2 ml-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Last Name
              <input
                className={`${
                  error !== "" && error.lastName ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="last_name"
                type="text"
                placeholder="Your last name"
                required
                onChange={formHandler}
              />
            </label>
            {error !== "" && error.lastName ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.lastName}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Date Of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            onChange={formHandler}
            className="outline-blue-400 border-2 border-blue-400 px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Email Address
            <input
              className={`${
                error !== "" && error.email ? "bg-red-200  " : ""
              } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
              id="email"
              type="email"
              placeholder="Your email address"
              required
              onChange={formHandler}
            />
          </label>
          {error !== "" && error.email != "" ? (
            <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
              {error.email}
            </span>
          ) : null}
        </div>
        <div className="flex">
          <div className="w-1/2 mr-1 mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Password
              <input
                className={`${
                  error !== "" && error.password ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="password"
                type="password"
                placeholder="Your secure password"
                required
                onChange={formHandler}
              />
            </label>
            {error !== "" && error.password ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.password}
              </span>
            ) : null}
          </div>

          <div className="w-1/2 ml-1 mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Confirm Password
              <input
                className={`${
                  error !== "" && error.password ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="confirmed_password"
                type="password"
                placeholder="Your secure password"
                required
              />
            </label>
            {error !== "" && error.password ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.password}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 w-1/2 mr-1">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              City:
              <input
                className={`${
                  error !== "" && error.city ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="city"
                type="text"
                placeholder="Your City"
                required
                onChange={formHandler}
              />
            </label>
            {error !== "" && error.city ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.city}
              </span>
            ) : null}
          </div>
          <div className="mb-4 ml-1 w-1/2">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Address:
              <input
                className={`${
                  error !== "" && error.address ? "bg-red-200  " : ""
                } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
                id="address"
                type="text"
                placeholder="Your Address"
                required
                onChange={formHandler}
              />
            </label>
            {error !== "" && error.address ? (
              <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
                {error.address}
              </span>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Phone Number:
            <input
              className={`${
                error !== "" && error.phoneNumber ? "bg-red-200  " : ""
              } appearance-none border rounded w-full py-2 px-3 text-grey-darker`}
              id="phone_number"
              type="number"
              placeholder="Your Phone Number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              onChange={formHandler}
            />
          </label>
          {error !== "" && error.phoneNumber ? (
            <span className="text-red-400 bg-gray-100 font-bold w-fit rounded-2xl p-1">
              {error.phoneNumber}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col justify-center text-center">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Have An Apotropos?(Disabled For Now)
          </label>
          <input
            type="checkbox"
            disabled={true}
            className="toggle toggle-success self-center "
            checked={hasApotropos}
            onChange={() => setHasApotropos(!hasApotropos)}
            onClick={() => window.my_modal_1.showModal()}
          />
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            className="bg-black text-white font-bold py-2 px-4 w-full rounded-full hover:bg-blue-400"
            type="submit"
            onClick={registerHandler}
          >
            {buttonLoading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
      <dialog id="my_modal_1" className="modal">
        <ApotroposModal
          props={{ hasApotropos, setHasApotropos, setApotropos, formHandler }}
        />
      </dialog>
    </div>
  );
};

export default PatientRegister;
