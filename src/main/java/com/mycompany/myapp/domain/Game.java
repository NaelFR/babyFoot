package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "score_1")
    private Integer score1;

    @Column(name = "score_2")
    private Integer score2;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @ManyToOne
    private PlayOff playOff;

    @ManyToOne
    private Tournament tournament;

    @ManyToOne(optional = false)
    @NotNull
    private Team team1;

    @ManyToOne(optional = false)
    @NotNull
    private Team team2;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore1() {
        return score1;
    }

    public Game score1(Integer score1) {
        this.score1 = score1;
        return this;
    }

    public void setScore1(Integer score1) {
        this.score1 = score1;
    }

    public Integer getScore2() {
        return score2;
    }

    public Game score2(Integer score2) {
        this.score2 = score2;
        return this;
    }

    public void setScore2(Integer score2) {
        this.score2 = score2;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Game startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public PlayOff getPlayOff() {
        return playOff;
    }

    public Game playOff(PlayOff playOff) {
        this.playOff = playOff;
        return this;
    }

    public void setPlayOff(PlayOff playOff) {
        this.playOff = playOff;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public Game tournament(Tournament tournament) {
        this.tournament = tournament;
        return this;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Team getTeam1() {
        return team1;
    }

    public Game team1(Team team) {
        this.team1 = team;
        return this;
    }

    public void setTeam1(Team team) {
        this.team1 = team;
    }

    public Team getTeam2() {
        return team2;
    }

    public Game team2(Team team) {
        this.team2 = team;
        return this;
    }

    public void setTeam2(Team team) {
        this.team2 = team;
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
        Game game = (Game) o;
        if (game.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), game.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", score1=" + getScore1() +
            ", score2=" + getScore2() +
            ", startDate='" + getStartDate() + "'" +
            "}";
    }
}
