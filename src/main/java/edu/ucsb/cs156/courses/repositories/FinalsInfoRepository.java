package edu.ucsb.cs156.courses.repositories;

import edu.ucsb.cs156.courses.entities.FinalsInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinalsInfoRepository extends CrudRepository<FinalsInfo, Long> {
  public FinalsInfo findByExamDate(String examDate);
}
