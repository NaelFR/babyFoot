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
 * A Tournament.
 */
@Entity
@Table(name = "tournament")
public class Tournament implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "tournament_name", nullable = false)
    private String tournamentName;

    @NotNull
    @Column(name = "nb_team_max", nullable = false)
    private Integer nbTeamMax;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @OneToMany(mappedBy = "tournament")
    @JsonIgnore
    private Set<Game> games = new HashSet<>();

    @ManyToMany(mappedBy = "tournaments")
    @JsonIgnore
    private Set<Team> teams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTournamentName() {
        return tournamentName;
    }

    public Tournament tournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
        return this;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }

    public Integer getNbTeamMax() {
        return nbTeamMax;
    }

    public Tournament nbTeamMax(Integer nbTeamMax) {
        this.nbTeamMax = nbTeamMax;
        return this;
    }

    public void setNbTeamMax(Integer nbTeamMax) {
        this.nbTeamMax = nbTeamMax;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Tournament startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Tournament endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Set<Game> getGames() {
        return games;
    }

    public Tournament games(Set<Game> games) {
        this.games = games;
        return this;
    }

    public Tournament addGame(Game game) {
        this.games.add(game);
        game.setTournament(this);
        return this;
    }

    public Tournament removeGame(Game game) {
        this.games.remove(game);
        game.setTournament(null);
        return this;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public Tournament teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public Tournament addTeams(Team team) {
        this.teams.add(team);
        team.getTournaments().add(this);
        return this;
    }

    public Tournament removeTeams(Team team) {
        this.teams.remove(team);
        team.getTournaments().remove(this);
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
        Tournament tournament = (Tournament) o;
        if (tournament.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tournament.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tournament{" +
            "id=" + getId() +
            ", tournamentName='" + getTournamentName() + "'" +
            ", nbTeamMax=" + getNbTeamMax() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
