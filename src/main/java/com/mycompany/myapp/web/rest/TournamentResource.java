package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Tournament;

import com.mycompany.myapp.repository.TournamentRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tournament.
 */
@RestController
@RequestMapping("/api")
public class TournamentResource {

    private final Logger log = LoggerFactory.getLogger(TournamentResource.class);

    private static final String ENTITY_NAME = "tournament";

    private final TournamentRepository tournamentRepository;

    public TournamentResource(TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }

    /**
     * POST  /tournaments : Create a new tournament.
     *
     * @param tournament the tournament to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tournament, or with status 400 (Bad Request) if the tournament has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tournaments")
    @Timed
    public ResponseEntity<Tournament> createTournament(@Valid @RequestBody Tournament tournament) throws URISyntaxException {
        log.debug("REST request to save Tournament : {}", tournament);
        if (tournament.getId() != null) {
            throw new BadRequestAlertException("A new tournament cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tournament result = tournamentRepository.save(tournament);
        return ResponseEntity.created(new URI("/api/tournaments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tournaments : Updates an existing tournament.
     *
     * @param tournament the tournament to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tournament,
     * or with status 400 (Bad Request) if the tournament is not valid,
     * or with status 500 (Internal Server Error) if the tournament couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tournaments")
    @Timed
    public ResponseEntity<Tournament> updateTournament(@Valid @RequestBody Tournament tournament) throws URISyntaxException {
        log.debug("REST request to update Tournament : {}", tournament);
        if (tournament.getId() == null) {
            return createTournament(tournament);
        }
        Tournament result = tournamentRepository.save(tournament);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tournament.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tournaments : get all the tournaments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tournaments in body
     */
    @GetMapping("/tournaments")
    @Timed
    public List<Tournament> getAllTournaments() {
        log.debug("REST request to get all Tournaments");
        return tournamentRepository.findAll();
        }

    /**
     * GET  /tournaments/:id : get the "id" tournament.
     *
     * @param id the id of the tournament to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tournament, or with status 404 (Not Found)
     */
    @GetMapping("/tournaments/{id}")
    @Timed
    public ResponseEntity<Tournament> getTournament(@PathVariable Long id) {
        log.debug("REST request to get Tournament : {}", id);
        Tournament tournament = tournamentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tournament));
    }

    /**
     * DELETE  /tournaments/:id : delete the "id" tournament.
     *
     * @param id the id of the tournament to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tournaments/{id}")
    @Timed
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        log.debug("REST request to delete Tournament : {}", id);
        tournamentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
