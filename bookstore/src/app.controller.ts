import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { BookDTO } from './book';

const delay = (ms?: number) => {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'new_book' })
  newBook(book: BookDTO): string {
    delay(10_000);
    const result = this.appService.createBook(book);
    return result || 'Book already exists';
  }

  @MessagePattern({ cmd: 'get_book' })
  getBook(bookId: string): BookDTO {
    return this.appService.getBookById(bookId);
  }

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): BookDTO[] {
    return this.appService.getAllBooks();
  }
}
