import "./SignupPage.css";
import Logo from "../../components/Logo/Logo";
import { useRef, useState, JSX } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/animexpo/animexpo_requests";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import InlineSpinner from "../../components/Spinner/InlineSpinner";
import itachi from "../../components/Spinner/spinnerImages/itachi.png";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,24})/;

const SignupPage = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePwd, setRetypePwd] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>(false);
  const [isEmailTaken, setIsEmailTaken] = useState<boolean>(false);
  const [isValidUsername, seIisValidUsername] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [pwdMatch, setPwdMatch] = useState<boolean>(true);
  const [eyeIcon, setEyeIcon] = useState<"fa-eye" | "fa-eye-slash">("fa-eye");
  const pwdRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { saveUserToLocalStorage } = useLocalStorage();
  const { setLoggedInUser, socket } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isUsernameTaken) setIsUsernameTaken(false);
    USER_REGEX.test(username)
      ? seIisValidUsername(true)
      : seIisValidUsername(false);
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    PWD_REGEX.test(password)
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  }, [password]);

  useEffect(() => {
    if (retypePwd === "") return;
    retypePwd === password ? setPwdMatch(true) : setPwdMatch(false);
    // eslint-disable-next-line
  }, [retypePwd, password]);

  useEffect(() => {
    if (isEmailTaken) setIsEmailTaken(false);
    // eslint-disable-next-line
  }, [email]);

  const onSignUpSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;
    if (isValidUsername && isValidPassword && pwdMatch) {
      const user = {
        username,
        password,
        email,
        birthday,
      };
      try {
        setIsLoading(true);
        const createdUser = await createUser(user);
        if (createdUser) {
          setLoggedInUser({
            _id: createdUser.user._id,
            username: createdUser.user.username,
            email: createdUser.user.email,
            token: createdUser.token,
          });
          saveUserToLocalStorage(createdUser);
          socket.emit("new_user", { username: createdUser.user.username });
          navigate("/");
        }
      } catch (err) {
        setIsLoading(false);
        if (err === "UsernameAlreadyExists") {
          setIsUsernameTaken(true);
        }
        if (err === "EmailAlreadyExists") {
          setIsEmailTaken(true);
          setEmailError("Email already in use");
        }
        if (err === "InvalidEmail") {
          setIsEmailTaken(true);
          setEmailError("Invalid Email");
        }
        console.log(err);
      }
    }
  };

  const onEyeIconClick = () => {
    if (pwdRef.current?.getAttribute("type") === "password") {
      pwdRef.current.setAttribute("type", "text");
      setEyeIcon("fa-eye-slash");
    } else {
      pwdRef.current?.setAttribute("type", "password");
      setEyeIcon("fa-eye");
    }
  };

  return (
    <div className="signup-form-wrapper">
      <Logo secondColor={"#FF0000"} fontSize={"4rem"} />
      <form className="signup-form" onSubmit={onSignUpSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          {isUsernameTaken && (
            <span className="wrong-info-alert">Username already taken</span>
          )}
          <input
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          {username.length > 0 && !isValidUsername && (
            <span className="validty-message">
              <i className="fa-solid fa-circle-exclamation"></i> 4 to 24
              Characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed
            </span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          {isEmailTaken && (
            <span className="wrong-info-alert">{emailError}</span>
          )}
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password">
            <input
              ref={pwdRef}
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
            <i
              onClick={onEyeIconClick}
              className={`fa-solid ${eyeIcon} eye-icon`}
            ></i>
          </div>
          {password.length > 0 && !isValidPassword && (
            <span className="validty-message">
              <i className="fa-solid fa-circle-exclamation"></i> 8 to 24
              Characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              allowed special characters: !@#$%^&*
            </span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="retypePwd">Retype password</label>
          {!pwdMatch && (
            <span className="wrong-info-alert">Password does not match</span>
          )}
          <input
            id="retypePwd"
            type="password"
            value={retypePwd}
            placeholder="Retype password"
            onChange={({ target }) => setRetypePwd(target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            placeholder="Birthday"
            onChange={({ target }) => setBirthday(target.value)}
            max={new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
        <button className="btn">
          {isLoading ? (
            <InlineSpinner
              image={itachi}
              spinnerWidth={20}
              spinnerHeight={20}
            />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};
export default SignupPage;
