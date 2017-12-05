import { BaseEntity } from './../../shared';

export class Team implements BaseEntity {
    constructor(
        public id?: number,
        public teamName?: string,
        public teamName1S?: BaseEntity[],
        public teamName2S?: BaseEntity[],
        public teamNames?: BaseEntity[],
        public tournaments?: BaseEntity[],
        public playOffs?: BaseEntity[],
    ) {
    }
}
