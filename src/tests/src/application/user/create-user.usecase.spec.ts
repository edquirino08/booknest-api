import CreateUserUseCase from "../../../../application/user/create-user.usecase";
import { User } from "../../../../domain/user/user.entity";
import { UserRepository } from "../../../../domain/user/user.repository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";
jest.mock("bcrypt");

describe("CreateUserUseCase", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let usecase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByUsername: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    usecase = new CreateUserUseCase(userRepository);
  });

  test("Should create the user successfully", async () => {
    const requestDto = {
      name: "Eduardo",
      username: "edu_quirino",
      email: "eduardo@example.com",
      password: "secure123",
    };

    const user = new User({
      id: 1,
      name: requestDto.name,
      username: requestDto.username,
      email: requestDto.email,
      password: requestDto.password,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.create.mockResolvedValue(user);

    const response = await usecase.execute(requestDto);

    expect(response).toBeDefined;
    expect(response).toHaveProperty("name", user.name);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });

  test("Should throw an exception when requested email and username are alerady registered", async () => {
    const requestDto = {
      name: "Eduardo",
      username: "edu_quirino",
      email: "eduardo@example.com",
      password: "secure123",
    };

    const user = new User({
      id: 1,
      name: requestDto.name,
      username: requestDto.username,
      email: requestDto.email,
      password: requestDto.password,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    userRepository.findByEmail.mockResolvedValue(user);

    await expect(usecase.execute(requestDto)).rejects.toThrow(
      BadRequestException
    );

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.findByUsername.mockResolvedValue(user);

    await expect(usecase.execute(requestDto)).rejects.toThrow(
      BadRequestException
    );
  });
});
