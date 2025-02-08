import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/login-registration.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

export type LoginFormData = {
  username: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<LoginFormData>();

  const { loading, userToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/home");
    }
  }, [navigate, userToken]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Log in</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            {loading ? "Loading" : "Log in"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
