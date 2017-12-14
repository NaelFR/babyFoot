package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "team_name", nullable = false)
    private String teamName;

    @OneToMany(mappedBy = "team1")
    @JsonIgnore
    private Set<Game> teamName1S = new HashSet<>();

    @OneToMany(mappedBy = "team2")
    @JsonIgnore
    private Set<Game> teamName2S = new HashSet<>();

    @OneToMany(mappedBy = "team")
    @JsonIgnore
    private Set<Player> teamNames = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "team_tournaments",
               joinColumns = @JoinColumn(name="teams_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tournaments_id", referencedColumnName="id"))
    private Set<Tournament> tournaments = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "team_play_offs",
               joinColumns = @JoinColumn(name="teams_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="play_offs_id", referencedColumnName="id"))
    private Set<PlayOff> playOffs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public Team teamName(String teamName) {
        this.teamName = teamName;
        return this;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Set<Game> getTeamName1S() {
        return teamName1S;
    }

    public Team teamName1S(Set<Game> games) {
        this.teamName1S = games;
        return this;
    }

    public Team addTeamName1(Game game) {
        this.teamName1S.add(game);
        game.setTeam1(this);
        return this;
    }

    public Team removeTeamName1(Game game) {
        this.teamName1S.remove(game);
        game.setTeam1(null);
        return this;
    }

    public void setTeamName1S(Set<Game> games) {
        this.teamName1S = games;
    }

    public Set<Game> getTeamName2S() {
        return teamName2S;
    }

    public Team teamName2S(Set<Game> games) {
        this.teamName2S = games;
        return this;
    }

    public Team addTeamName2(Game game) {
        this.teamName2S.add(game);
        game.setTeam2(this);
        return this;
    }

    public Team removeTeamName2(Game game) {
        this.teamName2S.remove(game);
        game.setTeam2(null);
        return this;
    }

    public void setTeamName2S(Set<Game> games) {
        this.teamName2S = games;
    }

    public Set<Player> getTeamNames() {
        return teamNames;
    }

    public Team teamNames(Set<Player> players) {
        this.teamNames = players;
        return this;
    }

    public Team addTeamName(Player player) {
        this.teamNames.add(player);
        player.setTeam(this);
        return this;
    }

    public Team removeTeamName(Player player) {
        this.teamNames.remove(player);
        player.setTeam(null);
        return this;
    }

    public void setTeamNames(Set<Player> players) {
        this.teamNames = players;
    }

    public Set<Tournament> getTournaments() {
        return tournaments;
    }

    public Team tournaments(Set<Tournament> tournaments) {
        this.tournaments = tournaments;
        return this;
    }

    public Team addTournaments(Tournament tournament) {
        this.tournaments.add(tournament);
        tournament.getTeams().add(this);
        return this;
    }

    public Team removeTournaments(Tournament tournament) {
        this.tournaments.remove(tournament);
        tournament.getTeams().remove(this);
        return this;
    }

    public void setTournaments(Set<Tournament> tournaments) {
        this.tournaments = tournaments;
    }

    public Set<PlayOff> getPlayOffs() {
        return playOffs;
    }

    public Team playOffs(Set<PlayOff> playOffs) {
        this.playOffs = playOffs;
        return this;
    }

    public Team addPlayOffs(PlayOff playOff) {
        this.playOffs.add(playOff);
        playOff.getTeams().add(this);
        return this;
    }

    public Team removePlayOffs(PlayOff playOff) {
        this.playOffs.remove(playOff);
        playOff.getTeams().remove(this);
        return this;
    }

    public void setPlayOffs(Set<PlayOff> playOffs) {
        this.playOffs = playOffs;
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
        Team team = (Team) o;
        if (team.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), team.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", teamName='" + getTeamName() + "'" +
            "}";
    }
}
