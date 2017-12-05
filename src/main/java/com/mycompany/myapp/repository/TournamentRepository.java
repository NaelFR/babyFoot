package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tournament;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tournament entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

}
