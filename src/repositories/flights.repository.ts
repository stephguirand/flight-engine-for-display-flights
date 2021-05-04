import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Flights, FlightsRelations} from '../models';

export class FlightsRepository extends DefaultCrudRepository<
  Flights,
  typeof Flights.prototype.flightNumber,
  FlightsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Flights, dataSource);
  }
}
