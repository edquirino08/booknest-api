import { PageableRequestDto } from "../../interfaces/dto/pageable/global-pageable.dto";

export class Pageable {
  static execute(args: any): PrismaPageable {
    const data = args as PageableRequestDto;
    const orderBy = data.sort.map((order: string) => {
      const [field, direction] = order.split(",");
      return { [field]: direction };
    });
    return {
      skip: (data.page - 1) * data.size,
      take: data.size,
      orderBy,
    };
  }
}

export type PrismaPageable = {
  skip?: number;
  take?: number;
  orderBy?: object;
};
