package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.BabyFootManagerApp;

import com.mycompany.myapp.domain.PlayOff;
import com.mycompany.myapp.repository.PlayOffRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlayOffResource REST controller.
 *
 * @see PlayOffResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BabyFootManagerApp.class)
public class PlayOffResourceIntTest {

    private static final String DEFAULT_PLAY_OFF_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PLAY_OFF_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_NB_TEAM_MAX = 1;
    private static final Integer UPDATED_NB_TEAM_MAX = 2;

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PlayOffRepository playOffRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlayOffMockMvc;

    private PlayOff playOff;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlayOffResource playOffResource = new PlayOffResource(playOffRepository);
        this.restPlayOffMockMvc = MockMvcBuilders.standaloneSetup(playOffResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayOff createEntity(EntityManager em) {
        PlayOff playOff = new PlayOff()
            .playOffName(DEFAULT_PLAY_OFF_NAME)
            .nbTeamMax(DEFAULT_NB_TEAM_MAX)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return playOff;
    }

    @Before
    public void initTest() {
        playOff = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayOff() throws Exception {
        int databaseSizeBeforeCreate = playOffRepository.findAll().size();

        // Create the PlayOff
        restPlayOffMockMvc.perform(post("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isCreated());

        // Validate the PlayOff in the database
        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeCreate + 1);
        PlayOff testPlayOff = playOffList.get(playOffList.size() - 1);
        assertThat(testPlayOff.getPlayOffName()).isEqualTo(DEFAULT_PLAY_OFF_NAME);
        assertThat(testPlayOff.getNbTeamMax()).isEqualTo(DEFAULT_NB_TEAM_MAX);
        assertThat(testPlayOff.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testPlayOff.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createPlayOffWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playOffRepository.findAll().size();

        // Create the PlayOff with an existing ID
        playOff.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayOffMockMvc.perform(post("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isBadRequest());

        // Validate the PlayOff in the database
        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPlayOffNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = playOffRepository.findAll().size();
        // set the field null
        playOff.setPlayOffName(null);

        // Create the PlayOff, which fails.

        restPlayOffMockMvc.perform(post("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isBadRequest());

        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbTeamMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = playOffRepository.findAll().size();
        // set the field null
        playOff.setNbTeamMax(null);

        // Create the PlayOff, which fails.

        restPlayOffMockMvc.perform(post("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isBadRequest());

        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = playOffRepository.findAll().size();
        // set the field null
        playOff.setStartDate(null);

        // Create the PlayOff, which fails.

        restPlayOffMockMvc.perform(post("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isBadRequest());

        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlayOffs() throws Exception {
        // Initialize the database
        playOffRepository.saveAndFlush(playOff);

        // Get all the playOffList
        restPlayOffMockMvc.perform(get("/api/play-offs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playOff.getId().intValue())))
            .andExpect(jsonPath("$.[*].playOffName").value(hasItem(DEFAULT_PLAY_OFF_NAME.toString())))
            .andExpect(jsonPath("$.[*].nbTeamMax").value(hasItem(DEFAULT_NB_TEAM_MAX)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }

    @Test
    @Transactional
    public void getPlayOff() throws Exception {
        // Initialize the database
        playOffRepository.saveAndFlush(playOff);

        // Get the playOff
        restPlayOffMockMvc.perform(get("/api/play-offs/{id}", playOff.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playOff.getId().intValue()))
            .andExpect(jsonPath("$.playOffName").value(DEFAULT_PLAY_OFF_NAME.toString()))
            .andExpect(jsonPath("$.nbTeamMax").value(DEFAULT_NB_TEAM_MAX))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingPlayOff() throws Exception {
        // Get the playOff
        restPlayOffMockMvc.perform(get("/api/play-offs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayOff() throws Exception {
        // Initialize the database
        playOffRepository.saveAndFlush(playOff);
        int databaseSizeBeforeUpdate = playOffRepository.findAll().size();

        // Update the playOff
        PlayOff updatedPlayOff = playOffRepository.findOne(playOff.getId());
        // Disconnect from session so that the updates on updatedPlayOff are not directly saved in db
        em.detach(updatedPlayOff);
        updatedPlayOff
            .playOffName(UPDATED_PLAY_OFF_NAME)
            .nbTeamMax(UPDATED_NB_TEAM_MAX)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restPlayOffMockMvc.perform(put("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlayOff)))
            .andExpect(status().isOk());

        // Validate the PlayOff in the database
        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeUpdate);
        PlayOff testPlayOff = playOffList.get(playOffList.size() - 1);
        assertThat(testPlayOff.getPlayOffName()).isEqualTo(UPDATED_PLAY_OFF_NAME);
        assertThat(testPlayOff.getNbTeamMax()).isEqualTo(UPDATED_NB_TEAM_MAX);
        assertThat(testPlayOff.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testPlayOff.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayOff() throws Exception {
        int databaseSizeBeforeUpdate = playOffRepository.findAll().size();

        // Create the PlayOff

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPlayOffMockMvc.perform(put("/api/play-offs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playOff)))
            .andExpect(status().isCreated());

        // Validate the PlayOff in the database
        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePlayOff() throws Exception {
        // Initialize the database
        playOffRepository.saveAndFlush(playOff);
        int databaseSizeBeforeDelete = playOffRepository.findAll().size();

        // Get the playOff
        restPlayOffMockMvc.perform(delete("/api/play-offs/{id}", playOff.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PlayOff> playOffList = playOffRepository.findAll();
        assertThat(playOffList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayOff.class);
        PlayOff playOff1 = new PlayOff();
        playOff1.setId(1L);
        PlayOff playOff2 = new PlayOff();
        playOff2.setId(playOff1.getId());
        assertThat(playOff1).isEqualTo(playOff2);
        playOff2.setId(2L);
        assertThat(playOff1).isNotEqualTo(playOff2);
        playOff1.setId(null);
        assertThat(playOff1).isNotEqualTo(playOff2);
    }
}
