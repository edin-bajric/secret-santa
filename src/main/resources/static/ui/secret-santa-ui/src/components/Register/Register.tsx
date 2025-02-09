import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/login-registration.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type RegisterFormData = {
  name: string;
  surname: string;
  username: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<RegisterFormData>();

  const { loading, success } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate("/login");
  }, [navigate, success]);

  const onSubmit = (data: RegisterFormData) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Register</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 d-flex">
            <Form.Control
              type="text"
              placeholder="Name"
              className="me-2"
              {...register("name")}
            />

            <Form.Control
              type="text"
              placeholder="Surname"
              {...register("surname")}
            />
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              {...register("username")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {loading ? "Loading" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
