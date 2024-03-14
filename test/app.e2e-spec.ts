import { INestApplication } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum'
import { CreateUserDto } from "src/user/dto";
import { EditUserDto } from "src/user/dto/edit-user.dto";
import { LoginDto } from "src/auth/dto/login.dto";

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userId: number;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication()

    await app.init()
    await app.listen(3131)

    prisma = app.get(PrismaService)
    await prisma.deleteDbData()
    pactum.request.setBaseUrl('http://localhost:3131')
  })

  afterAll(async () => {
    await app.close()
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
      role: "admins"
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

  describe('Get All Users', () => {
    it('should get all user', async () => {
      return await pactum
      .spec()
      .get('/user')
      .expectStatus(200)
    })
  })

  describe('Authentication', () => {
    describe('Login', () => {
      it('shound login and return token', async () => {
        const dto: LoginDto = {
          email: 'test@gmail.com',
          hashPwd: '123'
        }

        const response = await pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200);

          token = response.body.access_token;
      })
    })
  })

  describe('Delete User With Token', () => {
    it('should delete an user with token', () => {
      return pactum
      .spec()
      .delete('/user/{id}')
      .withPathParams('id', userId)
      .withHeaders({
        Authorization: `Bearer ${token}`
      })
      .expectStatus(204)
    })
  })
})