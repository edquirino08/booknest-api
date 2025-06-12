export type BookProps = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  copies: number;
  description?: string | null;
  publishedAt?: Date | null;
  genre?: string | null;
  pages?: number | null;
  language?: string | null;
  available: boolean;
  rating?: number | null;
  dateReg: Date;
};

export class Book {
  private readonly props: BookProps;

  constructor(props: BookProps) {
    this.props = props;
  }

  get id(): number {
    return this.props.id;
  }
  set id(value: number) {
    this.props.id = value;
  }

  get name(): string {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }

  get author(): string {
    return this.props.author;
  }
  set author(value: string) {
    this.props.author = value;
  }

  get publisher(): string {
    return this.props.publisher;
  }
  set publisher(value: string) {
    this.props.publisher = value;
  }

  get copies(): number {
    return this.props.copies;
  }
  set copies(value: number) {
    this.props.copies = value;
  }

  get description(): string | null | undefined {
    return this.props.description;
  }
  set description(value: string | null | undefined) {
    this.props.description = value;
  }

  get publishedAt(): Date | null | undefined {
    return this.props.publishedAt;
  }
  set publishedAt(value: Date | null | undefined) {
    this.props.publishedAt = value;
  }

  get genre(): string | null | undefined {
    return this.props.genre;
  }
  set genre(value: string | null | undefined) {
    this.props.genre = value;
  }

  get pages(): number | null | undefined {
    return this.props.pages;
  }
  set pages(value: number | null | undefined) {
    this.props.pages = value;
  }

  get language(): string | null | undefined {
    return this.props.language;
  }
  set language(value: string | null | undefined) {
    this.props.language = value;
  }

  get available(): boolean {
    return this.props.available;
  }
  set available(value: boolean) {
    this.props.available = value;
  }

  get rating(): number | null | undefined {
    return this.props.rating;
  }
  set rating(value: number | null | undefined) {
    this.props.rating = value;
  }

  get dateReg(): Date {
    return this.props.dateReg;
  }
  set dateReg(value: Date) {
    this.props.dateReg = value;
  }
}
