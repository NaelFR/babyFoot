import { BaseEntity } from './../../shared';

export class Tournament implements BaseEntity {
    constructor(
        public id?: number,
        public tournamentName?: string,
        public nbTeamMax?: number,
        public startDate?: any,
        public endDate?: any,
        public games?: BaseEntity[],
        public teams?: BaseEntity[],
    ) {
    }
}
