import { INestApplication } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum'
import { CreateUserDto } from "src/user/dto";
import { EditUserDto } from "src/user/dto/edit-user.dto";

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userId;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication()

    await app.init()
    await app.listen(3131)

    prisma = app.get(PrismaService)
    pactum.request.setBaseUrl('http://localhost:3131')
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Get All Users', () => {
    it('should get all user', () => {
      return pactum
      .spec()
      .get('/user')
      .expectStatus(200)
    })
  })

  describe('Create User', () => {
    const dto: CreateUserDto = {
      email: "test@gmail.com",
      userName: "test",
      role: "test",
      hashPwd: "123"
    }
    it('should create an user', async () => {
      const response = await pactum
      .spec()
      .post('/user')
      .withBody(dto)
      .expectStatus(201);
      userId = response.body.id;
      return response
    })
  })

  describe('Edit User', () => {
    // const userid = parseInt('$S{userid}')
    const dto: EditUserDto = {
      userName: "test",
      role: "edited"
    }
    it('should create edit an user', () => {
      return pactum
      .spec()
      .patch('/user/{id}')
      .withPathParams('id', userId)
      .withBody(dto)
      .expectStatus(200)
    })
  })

  describe('Delete User', () => {
    it('should delete an user', () => {
      return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', userId)
      .expectStatus(204)
    })
  })
})