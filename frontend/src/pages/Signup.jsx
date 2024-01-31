import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useSignup()
  
  
  const handlesubmit = async(e) => {
    e.preventDefault();
      console.log(email, password);
      await signup(email,password)
  };

  return (
    <form action="" onSubmit={handlesubmit}>
      <h3>Sign up</h3>
      <label htmlFor="">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

          <button disabled={loading}>Sign up</button>
          {error && <div className="error">{error}</div> }
    </form>
  );
};

export default Signup;
