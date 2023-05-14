import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Verification() {
  const navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:2000/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <div>
      <p>Thank you for register, have fun!</p>
    </div>
  );
}

export default Verification;
