import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from './users.schema';
import { Category, CategorySchema } from './../category/category.schema';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

describe('UsersRepository', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
      exports: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('유저 연속성 업데이트 ', () => {
    it('유저 가져오기', async () => {
      const user = await repository.findUserByIdWithoutPassword(
        '621ee1a5390d37226f828631',
      );
      expect(user._id).toBe('621ee1a5390d37226f828631');
    });
    const user = {
      _id: '5112312112sd1',
      continuous: 0,
    };
    const dataFalse = {
      userId: '1111',
      isContinuous: false,
    };
    const dataTrue = {
      userId: '1111',
      isContinuous: false,
    };
  });
});
