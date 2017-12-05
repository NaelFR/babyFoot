import { BaseEntity } from './../../shared';

export class PlayOff implements BaseEntity {
    constructor(
        public id?: number,
        public playOffName?: string,
        public nbTeamMax?: number,
        public startDate?: any,
        public endDate?: any,
        public games?: BaseEntity[],
        public teams?: BaseEntity[],
    ) {
    }
}
