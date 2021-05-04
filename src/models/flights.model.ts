import {Entity, model, property} from '@loopback/repository';

@model()
export class Flights extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  flightNumber?: number;

  @property({
    type: 'string',
  })
  originCity?: string;

  @property({
    type: 'string',
  })
  destinationCity?: string;

  @property({
    type: 'string',
    required: true,
    format: 'date',
  })
  departureDate: Date;

  @property({
    type: 'string',
  })
  aircraftModel?: string;

  @property({
    type: 'number',
  })
  passengerCapacity?: number;


  constructor(data?: Partial<Flights>) {
    super(data);
  }
}

export interface FlightsRelations {
  // describe navigational properties here
}

export type FlightsWithRelations = Flights & FlightsRelations;
