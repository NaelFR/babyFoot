import { BaseEntity } from './../../shared';

export class Game implements BaseEntity {
    constructor(
        public id?: number,
        public score1?: number,
        public score2?: number,
        public startDate?: any,
        public playOff?: BaseEntity,
        public tournament?: BaseEntity,
        public team1?: BaseEntity,
        public team2?: BaseEntity,
    ) {
    }
}
