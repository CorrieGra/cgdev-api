/* eslint-disable prettier/prettier */
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { ProjectEntity } from '@entities/project.entity';

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<ProjectEntity> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return ProjectEntity;
    }

    afterInsert(event: InsertEvent<ProjectEntity>){
        console.log(`AFTER INSERT: ${event.entity}`)
    }
}