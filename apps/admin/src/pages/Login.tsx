import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Lock } from "lucide-react";
import { Button, Input } from "@portfolio/ui";
import { useLoginMutation } from "../store/authApi";
import { setToken } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(setToken(result.data.token));
      navigate("/");
    } catch {
      // handled via `error` below
    }
  };

  return (
    <div className="flex min-h-screen bg-base">
      <div className="hidden w-1/2 flex-col justify-between bg-surface-alt p-10 md:flex">
        <p className="font-mono text-xs uppercase tracking-wide text-text-faint">Portfolio Admin</p>
        <div>
          <h1 className="text-3xl font-semibold leading-snug text-text">
            Manage your portfolio content from one place.
          </h1>
          <p className="mt-3 text-sm text-text-faint">
            Projects, skills, experience, and more — all backed by your own API.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-text-faint">
          Self-hosted · JSON Server · Express
        </p>
      </div>

      <div className="flex w-full items-center justify-center p-6 md:w-1/2">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-6 flex items-center gap-2">
            <div className="rounded-full bg-primary-950 p-2">
              <Lock size={16} className="text-primary-400" />
            </div>
            <h2 className="text-lg font-semibold text-text">Sign in</h2>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="mt-3 text-sm text-primary-400">Invalid credentials</p>}

          <Button type="submit" disabled={isLoading} className="mt-4 w-full">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
