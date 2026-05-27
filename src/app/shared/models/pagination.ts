import { HttpParams } from '@angular/common/http';

export interface PaginationRequest {
  page: number,
  pageSize: number
}

export interface PaginationResponse<T> {
  hasNext: boolean,
  hasPrevious: boolean,
  currentPage: number,
  totalPages: number,
  totalItems: number,
  items: T[],
}

export class Pagination {
  private page: number = 1;
  private pageSize: number = 10;

  constructor(pageData?: { page: number, pageSize: number }) {
    this.page = pageData?.page ?? 1;
    this.pageSize = pageData?.pageSize ?? 10;
  }

  setPaginationRequest(request: PaginationRequest) {
    this.page = request.page;
    this.pageSize = request.pageSize;
  }

  getPaginationRequest(): PaginationRequest {
    return {
      page: this.page,
      pageSize: this.pageSize,
    }
  }

  get Page(): number {
    return this.page;
  }

  get PageSize(): number {
    return this.pageSize;
  }

  getHttpParameters(): HttpParams {
    return new HttpParams()
      .set('page', this.page.toString())
      .set('pageSize', this.pageSize.toString());
  }
}
