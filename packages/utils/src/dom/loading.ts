import type { LoadingOptions } from 'element-plus';
import { ElLoading } from 'element-plus';

interface CloseAble {
  close(): void;
}

class Loading {
  private target: CloseAble | null;

  private count: number;

  constructor() {
    this.target = null;
    this.count = 0;
  }

  public start(options?: LoadingOptions) {
    this.count += 1;

    if (this.count === 1) {
      this.target = ElLoading.service(options);
    }
  }

  public end() {
    if (this.count > 0) {
      this.count -= 1;
    }

    if (this.count === 0) {
      this.target?.close();
      this.target = null;
    }
  }
}

export const loadingInstance = new Loading();
