package edu.ucsb.cs156.courses.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.repositories.FinalsInfoRepository;
import edu.ucsb.cs156.courses.testconfig.TestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = {FinalsInfoController.class})
@Import(TestConfig.class)
@AutoConfigureDataJpa
public class FinalsInfoControllerTests extends ControllerTestCase {

  @MockBean FinalsInfoRepository finalsInfoRepository;

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @Test
  public void logged_out_exception() throws Exception {
    mockMvc.perform(get("/api/finalsInfo?quarter=f23&enrollCd=12345")).andExpect(status().is(403));
  }

  @Test
  @WithMockUser(roles = {"USER"})
  public void logged_in_success() throws Exception {
    mockMvc.perform(get("/api/finalsInfo?quarter=f23&enrollCd=12345")).andExpect(status().is(200));
  }
}
