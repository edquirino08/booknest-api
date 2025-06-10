export type UserProps = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }
}

export function toUser(prismaUser: any): User {
  return new User({
    id: prismaUser.id,
    name: prismaUser.name,
    username: prismaUser.username,
    email: prismaUser.email,
    password: prismaUser.password,
    createdAt: prismaUser.created_at,
    updatedAt: prismaUser.updated_at,
    deletedAt: prismaUser.deleted_at,
  } as UserProps);
}
