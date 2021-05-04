import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Flights} from '../models';
import {FlightsRepository} from '../repositories';

export class FlightsController {
  constructor(
    @repository(FlightsRepository)
    public flightsRepository : FlightsRepository,
  ) {}

  @post('/flights')
  @response(200, {
    description: 'Flights model instance',
    content: {'application/json': {schema: getModelSchemaRef(Flights)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flights, {
            title: 'NewFlights',
            exclude: ['flightNumber'],
          }),
        },
      },
    })
    flights: Omit<Flights, 'flightNumber'>,
  ): Promise<Flights> {
    return this.flightsRepository.create(flights);
  }

  @get('/flights/count')
  @response(200, {
    description: 'Flights model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Flights) where?: Where<Flights>,
  ): Promise<Count> {
    return this.flightsRepository.count(where);
  }

  @get('/flights')
  @response(200, {
    description: 'Array of Flights model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Flights, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Flights) filter?: Filter<Flights>,
  ): Promise<Flights[]> {
    return this.flightsRepository.find(filter);
  }

  @patch('/flights')
  @response(200, {
    description: 'Flights PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flights, {partial: true}),
        },
      },
    })
    flights: Flights,
    @param.where(Flights) where?: Where<Flights>,
  ): Promise<Count> {
    return this.flightsRepository.updateAll(flights, where);
  }

  @get('/flights/{id}')
  @response(200, {
    description: 'Flights model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Flights, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Flights, {exclude: 'where'}) filter?: FilterExcludingWhere<Flights>
  ): Promise<Flights> {
    return this.flightsRepository.findById(id, filter);
  }

  @patch('/flights/{id}')
  @response(204, {
    description: 'Flights PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Flights, {partial: true}),
        },
      },
    })
    flights: Flights,
  ): Promise<void> {
    await this.flightsRepository.updateById(id, flights);
  }

  @put('/flights/{id}')
  @response(204, {
    description: 'Flights PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() flights: Flights,
  ): Promise<void> {
    await this.flightsRepository.replaceById(id, flights);
  }

  @del('/flights/{id}')
  @response(204, {
    description: 'Flights DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.flightsRepository.deleteById(id);
  }
}
