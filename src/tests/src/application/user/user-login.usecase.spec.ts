import { LoginUseCase } from "../../../../application/user/user-login.usecase";
import { User } from "../../../../domain/user/user.entity";
import { UserRepository } from "../../../../domain/user/user.repository";
import bcrypt from "bcrypt";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";

jest.mock("bcrypt");

describe("LoginUseCase", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let usecase: LoginUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as any;

    usecase = new LoginUseCase(userRepository);

    jest.clearAllMocks();
  });

  test("Should effectuate the user login successfully", async () => {
    const requestDto = {
      email: "test@email.com",
      password: "plainPassword",
    };

    const user = new User({
      id: 1,
      name: "test",
      username: "test",
      email: requestDto.email,
      password: "hashedPassword",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    userRepository.findByEmail.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const mockJwtSign = jest.fn().mockReturnValue("mocked-jwt-token");

    const mockRequest = {
      server: {
        jwt: {
          sign: mockJwtSign,
        },
      },
    } as any;

    const res = await usecase.execute(mockRequest, requestDto);

    expect(res).toBeDefined();
    expect(res).toHaveProperty("jwt", "mocked-jwt-token");
    expect(mockJwtSign).toHaveBeenCalledWith(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      { expiresIn: "1d" }
    );
  });

  test("Should throw an exception when could not find any user with requested email", async () => {
    const requestDto = {
      email: "test@email.com",
      password: "plainPassword",
    };
    const mockRequest = {} as any;

    userRepository.findByEmail.mockResolvedValue(null);

    await expect(usecase.execute(mockRequest, requestDto)).rejects.toThrow(
      BadRequestException
    );
  });

  test("Should throw an exception when requested password is wrong", async () => {
    const requestDto = {
      email: "test@email.com",
      password: "plainPassword",
    };
    const user = new User({
      id: 1,
      name: "test",
      username: "test",
      email: requestDto.email,
      password: "hashedPassword",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    const mockRequest = {} as any;

    userRepository.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(usecase.execute(mockRequest, requestDto)).rejects.toThrow(
      BadRequestException
    );
  });
});
