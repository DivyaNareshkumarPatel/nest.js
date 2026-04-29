import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  execute() {
    return 'This message comes from the lazy-loaded service!';
  }
}
