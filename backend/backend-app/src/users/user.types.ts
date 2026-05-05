export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export type User = CreateUserDto;
