package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PlayOff;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PlayOff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayOffRepository extends JpaRepository<PlayOff, Long> {

}
