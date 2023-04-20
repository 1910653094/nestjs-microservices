import { Injectable } from '@nestjs/common';
import { BookDTO } from './book';

const bookStore: BookDTO[] = [];

@Injectable()
export class AppService {
  getBookById(id: string): BookDTO {
    return bookStore.find((book: BookDTO) => book.id === id);
  }

  getAllBooks(): BookDTO[] {
    return bookStore;
  }

  createBook(book: Omit<BookDTO, 'id'>): string | null {
    const existingBook = bookStore.find(
      (b: BookDTO) =>
        b.title === book.title &&
        b.author === book.author &&
        b.release_date === book.release_date,
    );

    if (existingBook) {
      return null;
    }

    const newID = `Book_${bookStore.length}`;
    bookStore.push({ ...book, id: newID });
    return newID;
  }
}
