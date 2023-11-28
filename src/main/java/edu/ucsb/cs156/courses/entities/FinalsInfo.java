package edu.ucsb.cs156.courses.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "finals_info") // Assuming the table name is 'finals_info'
public class FinalsInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private boolean hasFinals;
    private String comments;
    private String examDay;
    private String examDate;
    private String beginTime;
    private String endTime;
}
