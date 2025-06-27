import { Book } from "../book/book.entity";
import { User } from "../user/user.entity";

export type BookRentalProps = {
  id: string;
  book: Book;
  book_id: number;
  user: User;
  user_id: number;
  returned: boolean;
  rental_time: number;
  date_reg: Date;
  return_date?: Date | null;
};

export class BookRental {
  constructor(private readonly props: BookRentalProps) {}

  get id() {
    return this.props.id;
  }

  get book() {
    return this.props.book;
  }

  get bookId() {
    return this.props.book_id;
  }

  get user() {
    return this.props.user;
  }

  get userId() {
    return this.props.user_id;
  }

  get returned() {
    return this.props.returned;
  }

  get rentalTime() {
    return this.props.rental_time;
  }

  get dateReg() {
    return this.props.date_reg;
  }

  get returnDate() {
    return this.props.return_date;
  }
}
