import React, { useState } from "react";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-3xl font-bold mb-4">Auth Page</h1>
          <div className="space-y-8">
            {!showRegister ? (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Login</h2>
                <form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="username" className="mb-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Login
                  </button>
                </form>
                <button
                  onClick={() => setShowRegister(true)}
                  className="mt-4 text-blue-500"
                >
                  Register
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Register</h2>
                <form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="new-username" className="mb-1">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="new-username"
                      name="new-username"
                      required
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="new-password" className="mb-1">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      required
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Register
                  </button>
                </form>
                <button
                  onClick={() => setShowRegister(false)}
                  className="mt-4 text-blue-500"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;