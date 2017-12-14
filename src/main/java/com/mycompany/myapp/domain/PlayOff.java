package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PlayOff.
 */
@Entity
@Table(name = "play_off")
public class PlayOff implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "play_off_name", nullable = false)
    private String playOffName;

    @NotNull
    @Column(name = "nb_team_max", nullable = false)
    private Integer nbTeamMax;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @OneToMany(mappedBy = "playOff")
    @JsonIgnore
    private Set<Game> games = new HashSet<>();

    @ManyToMany(mappedBy = "playOffs")
    @JsonIgnore
    private Set<Team> teams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayOffName() {
        return playOffName;
    }

    public PlayOff playOffName(String playOffName) {
        this.playOffName = playOffName;
        return this;
    }

    public void setPlayOffName(String playOffName) {
        this.playOffName = playOffName;
    }

    public Integer getNbTeamMax() {
        return nbTeamMax;
    }

    public PlayOff nbTeamMax(Integer nbTeamMax) {
        this.nbTeamMax = nbTeamMax;
        return this;
    }

    public void setNbTeamMax(Integer nbTeamMax) {
        this.nbTeamMax = nbTeamMax;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public PlayOff startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public PlayOff endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Set<Game> getGames() {
        return games;
    }

    public PlayOff games(Set<Game> games) {
        this.games = games;
        return this;
    }

    public PlayOff addGame(Game game) {
        this.games.add(game);
        game.setPlayOff(this);
        return this;
    }

    public PlayOff removeGame(Game game) {
        this.games.remove(game);
        game.setPlayOff(null);
        return this;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public PlayOff teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public PlayOff addTeams(Team team) {
        this.teams.add(team);
        team.getPlayOffs().add(this);
        return this;
    }

    public PlayOff removeTeams(Team team) {
        this.teams.remove(team);
        team.getPlayOffs().remove(this);
        return this;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PlayOff playOff = (PlayOff) o;
        if (playOff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), playOff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlayOff{" +
            "id=" + getId() +
            ", playOffName='" + getPlayOffName() + "'" +
            ", nbTeamMax=" + getNbTeamMax() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
