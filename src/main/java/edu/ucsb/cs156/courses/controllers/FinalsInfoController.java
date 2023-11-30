package edu.ucsb.cs156.courses.controllers;

import edu.ucsb.cs156.courses.repositories.FinalsInfoRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Finals Information")
@RequestMapping("/api/finalsInfo")
@RestController
public class FinalsInfoController extends ApiController {

  @Autowired private FinalsInfoRepository finalsInfoRepository;
  @Autowired private UCSBCurriculumService UCS;

  @GetMapping("")
  @PreAuthorize("hasRole('ROLE_USER')")
  @Operation(summary = "Get finals information for a specific course")
  public String getFinalsInfo(
      @Parameter(
              name = "quarter",
              description = "Quarter identifier, e.g., 'f23' for Fall 2023",
              example = "f23",
              required = true)
          @RequestParam
          String quarter,
      @Parameter(
              name = "enrollCd",
              description = "Enrollment code for the course",
              example = "12345",
              required = true)
          @RequestParam
          String enrollCd) {
    return UCS.getFinalsJSON("f23", "12345");
  }
}
