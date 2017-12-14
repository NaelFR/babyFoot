package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.PlayOff;

import com.mycompany.myapp.repository.PlayOffRepository;
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
 * REST controller for managing PlayOff.
 */
@RestController
@RequestMapping("/api")
public class PlayOffResource {

    private final Logger log = LoggerFactory.getLogger(PlayOffResource.class);

    private static final String ENTITY_NAME = "playOff";

    private final PlayOffRepository playOffRepository;

    public PlayOffResource(PlayOffRepository playOffRepository) {
        this.playOffRepository = playOffRepository;
    }

    /**
     * POST  /play-offs : Create a new playOff.
     *
     * @param playOff the playOff to create
     * @return the ResponseEntity with status 201 (Created) and with body the new playOff, or with status 400 (Bad Request) if the playOff has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/play-offs")
    @Timed
    public ResponseEntity<PlayOff> createPlayOff(@Valid @RequestBody PlayOff playOff) throws URISyntaxException {
        log.debug("REST request to save PlayOff : {}", playOff);
        if (playOff.getId() != null) {
            throw new BadRequestAlertException("A new playOff cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayOff result = playOffRepository.save(playOff);
        return ResponseEntity.created(new URI("/api/play-offs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /play-offs : Updates an existing playOff.
     *
     * @param playOff the playOff to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated playOff,
     * or with status 400 (Bad Request) if the playOff is not valid,
     * or with status 500 (Internal Server Error) if the playOff couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/play-offs")
    @Timed
    public ResponseEntity<PlayOff> updatePlayOff(@Valid @RequestBody PlayOff playOff) throws URISyntaxException {
        log.debug("REST request to update PlayOff : {}", playOff);
        if (playOff.getId() == null) {
            return createPlayOff(playOff);
        }
        PlayOff result = playOffRepository.save(playOff);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, playOff.getId().toString()))
            .body(result);
    }

    /**
     * GET  /play-offs : get all the playOffs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of playOffs in body
     */
    @GetMapping("/play-offs")
    @Timed
    public List<PlayOff> getAllPlayOffs() {
        log.debug("REST request to get all PlayOffs");
        return playOffRepository.findAll();
        }

    /**
     * GET  /play-offs/:id : get the "id" playOff.
     *
     * @param id the id of the playOff to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the playOff, or with status 404 (Not Found)
     */
    @GetMapping("/play-offs/{id}")
    @Timed
    public ResponseEntity<PlayOff> getPlayOff(@PathVariable Long id) {
        log.debug("REST request to get PlayOff : {}", id);
        PlayOff playOff = playOffRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(playOff));
    }

    /**
     * DELETE  /play-offs/:id : delete the "id" playOff.
     *
     * @param id the id of the playOff to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/play-offs/{id}")
    @Timed
    public ResponseEntity<Void> deletePlayOff(@PathVariable Long id) {
        log.debug("REST request to delete PlayOff : {}", id);
        playOffRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
