import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import DeveloperPage from "main/pages/DeveloperPage";

describe("DeveloperPage tests", () => {
  const queryClient = new QueryClient();

  test("renders correctly", async () => {
    const axiosMock = new AxiosMockAdapter(axios);
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DeveloperPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(
      screen.getByText("Welcome to the Developer Page!"),
    ).toBeInTheDocument();
  });
});
