import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

test("renderizo correctamente el login", () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ login: vi.fn() }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  );
});
