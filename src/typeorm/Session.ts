import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({name: 'sessions'})
export class SessionEntity implements ISession{
    @Index()
    @Column({ type: 'timestamptz' })
    expiredAt = Date.now();

    @PrimaryColumn('varchar', {length: 255})
    id = ''

    @Column('text')
    json = ''
    
}