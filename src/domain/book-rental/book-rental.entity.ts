export type BookRentalProps = {
  uuid: string;
  idBook: number;
  idUser: number;
  returned: boolean;
  dateReg: string;
  returnDate: string;
};

export class BookRental {
  constructor(private readonly props: BookRentalProps) {}

  get uuid() {
    return this.props.uuid;
  }

  get idBook() {
    return this.props.idBook;
  }

  get idUser() {
    return this.props.idUser;
  }

  get returned() {
    return this.props.returned;
  }

  get dateReg() {
    return this.props.dateReg;
  }

  get returnDate() {
    return this.props.returnDate;
  }
}
