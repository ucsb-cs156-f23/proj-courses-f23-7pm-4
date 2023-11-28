package edu.ucsb.cs156.courses.controllers;


import edu.ucsb.cs156.courses.repositories.FinalsInfoRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "Finals Information")
@RequestMapping("/api/finalsInfo")
@RestController
public class FinalsInfoController extends ApiController{
    
    @Autowired
    private FinalsInfoRepository finalsInfoRepository;

    @GetMapping("")
    @Operation(summary = "Get finals information for a specific course")
    public void getFinalsInfo(
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
            String enrollCd) 
            {}
}