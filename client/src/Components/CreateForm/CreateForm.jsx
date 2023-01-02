// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments } from "../../redux/actions";
import axios from "axios";
import style from "./CreateForm.module.css";

const CreateForm = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });
  const [error, setError] = useState({
    name: "!  Missing name",
    WH: "!  Height, Weight and Life Span values must be a Number",
    Temperaments: "!  Must select at least one Temperament",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const nameHandler = (event) => {
    const name = event.target.value;
    if (!name || typeof name !== "string") {
      setError({ ...error, name: "Missing name" });
    } else {
      setError({ ...error, name: "" });
      setForm({ ...form, name });
    }
  };
  const HWHandler = (event) => {
    const value = parseInt(event.target.value);

    if (typeof value !== "number") {
      setError({
        ...error,
        WH: `Height, Weight and Life Span values must be a Number`,
      });
    } else if (value <= 0) {
      setError({
        ...error,
        WH: `Height, Weight and Life Span values must be greater than 0`,
      });
    } else {
      setError({ ...error, WH: "" });
      switch (event.target.name) {
        case "height":
          setForm({ ...form, height: value });
          break;
        case "weight":
          setForm({ ...form, weight: value });
          break;
        case "life_span":
          setForm({ ...form, life_span: value });
          break;
        default:
          setForm({ ...form });
          break;
      }
    }
  };

  const allTemps = [];
  const tempHandler = (event) => {
    const temp = event.target.value;

    if (event.target.checked) {
      allTemps.push(temp);
      setForm({ ...form, temperaments: [...form.temperaments, ...allTemps] });
    } else {
      const popped = [];
      // eslint-disable-next-line
      form.temperaments.map((each) => {
        if (each !== temp) {
          return popped.push(each);
        }
      });
      setForm({ ...form, temperaments: popped });
    }
    if (!allTemps.length) {
      setError({
        ...error,
        Temperaments: "Must select at least one Temperament",
      });
    } else {
      setError({ ...error, Temperaments: "" });
    }
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/dogs`, form);
      if (response.status === 201) {
        alert(response.data);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div className={style.createForm}>
      <h1>CREATE FORM</h1>
      <h3>Create your own breed!</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label className={style.label}>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={nameHandler}
            value={form.name}
            className={style.textInput}
          />
          {error.name && <p className={style.error}>{error.name}</p>}
        </div>
        <div>
          <label className={style.label}>Height</label>
          <input
            type="number"
            name="height"
            id="height"
            onChange={HWHandler}
            value={form.height}
            key="height"
            className={style.textInput}
          />
        </div>
        <div>
          <label className={style.label}>Weight</label>
          <input
            type="number"
            name="weight"
            id="weight"
            onChange={HWHandler}
            value={form.weight}
            key="weight"
            className={style.textInput}
          />
        </div>
        <div>
          <label className={style.label}>Life Span</label>
          <input
            type="number"
            name="life_span"
            id="life_span"
            onChange={HWHandler}
            value={form.life_span}
            key="life_span"
            className={style.textInput}
          />
        </div>
        {error.WH && <p className={style.error}>{error.WH}</p>}
        <div>
          <p>Temperaments</p>
          {error.Temperaments && (
            <p className={style.error}>{error.Temperaments}</p>
          )}
          <div className={style.tempContainer}>
            {temperaments.map((each) => {
              return (
                <span className={style.eachTemp}>
                  <input
                    type="checkbox"
                    name={each.name}
                    value={each.id}
                    id={each.id}
                    onChange={tempHandler}
                    key={each.id}
                    className={style.checkbox}
                  />
                  <label key={`${each.id}-label`} className={style.labelTemp}>
                    {each.name}
                  </label>
                </span>
              );
            })}
          </div>
        </div>
        <input
          type="submit"
          disabled={error.Temperaments || error.WH || error.name}
          key="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CreateForm;
