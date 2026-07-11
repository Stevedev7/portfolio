import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/authApi";
import { setToken } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(setToken(result.data.token));
      navigate("/");
    } catch {
      // error state already handled via the `error` variable below
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-80 rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        {error && <p className="mb-3 text-sm text-red-600">Invalid credentials</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
