import { GenericFilteringAndPaginationDto } from "../../interfaces/dto/utils/generic-filtering-pagination.dto";

export class PrismaFilteringService {
  static execute(args: GenericFilteringAndPaginationDto): PrismaFilteringData {
    const { sort, page, size, ...filters } = args;
    const filtering = this.applyFiltering(filters);
    const pageable = this.applyOrdering(args);
    return { ...pageable, where: filtering } as PrismaFilteringData;
  }

  private static applyFiltering(filters: any): PrismaFiltering {
    const filtering: Record<string, any> = {};
    for (const key in filters) {
      let value = filters[key];
      if (
        typeof value === "string" &&
        (value.trim().startsWith("{") || value.trim().startsWith("["))
      ) {
        try {
          value = JSON.parse(value);
        } catch {}
      }
      if (value !== undefined && value !== null && value !== "") {
        filtering[key] = value;
      }
    }
    return filtering;
  }

  private static applyOrdering(
    pageable: GenericFilteringAndPaginationDto
  ): PrismaPageable {
    const orderBy = pageable.sort.map((order: string) => {
      const [field, direction] = order.split(",");
      return { [field]: direction };
    });
    return {
      skip: (pageable.page - 1) * pageable.size,
      take: pageable.size,
      orderBy,
    };
  }
}

export type PrismaPageable = {
  skip?: number;
  take?: number;
  orderBy?: object;
};

export type PrismaFiltering = Record<string, any>;

export class PrismaFilteringData {
  skip?: number;
  take?: number;
  orderBy?: object;
  where?: PrismaFiltering;
}
