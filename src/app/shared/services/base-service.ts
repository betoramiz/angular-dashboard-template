import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Pagination, PaginationResponse } from '@shared/models/pagination';
import { environment } from '../../../environments/environment';

export class BaseService {
  private baseUlr = `${environment.apiUrl}`;

  protected httpClient: HttpClient = inject(HttpClient);

  constructor(endpointName: string) {
    this.baseUlr = `${this.baseUlr}/${endpointName}`;
  }

  protected get baseUrl(): string {
    return this.baseUlr;
  }


  /**
   * Retrieves an entity by its unique identifier from the specified endpoint.
   *
   * @param {string | number} id - The unique identifier of the entity to retrieve.
   * @param {string} [endpointName] - Optional endpoint name to append to the base URL.
   * @return {Observable<T>} An observable containing the retrieved entity of type T.
   */
  getById<T>(id: string | number, endpointName: string = ''): Observable<T> {
    const url = endpointName !== '' ? `${this.baseUrl}/${endpointName}/${id}` : `${this.baseUrl}/${id}`;
    return this.httpClient.get<T>(url).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a list of items from the specified endpoint.
   *
   * @param {string} [endpointName=''] The name of the endpoint to fetch the list from. Defaults to an empty string.
   * @return {Observable<T[]>} An observable containing the list of items of type T.
   */
  getListOf<T>(endpointName: string = ''): Observable<T[]> {
    const url = endpointName !== '' ? `${this.baseUrl}/${endpointName}` : `${this.baseUrl}`
    return this.httpClient.get<T[]>(url).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves paginated results from the specified endpoint.
   *
   * @param {Pagination} pagination - An object containing pagination parameters such as page number and size.
   * @param {string} [endpointName] - The optional name of the endpoint to append to the base URL. If not provided, the base URL will be used.
   * @return {Observable<PaginationResponse<T>>} An observable containing the paginated response data.
   */
  getPaginatedResults<T>(pagination: Pagination, endpointName?: string): Observable<PaginationResponse<T>> {
    const parameters = pagination.getHttpParameters();
    const url = endpointName !== '' && endpointName !== undefined && endpointName !== null
      ? `${this.baseUrl}/${endpointName}`
      : `${this.baseUrl}`;

    return this.httpClient.get<PaginationResponse<T>>(url, { params: parameters });
  }

  /**
   * Deletes a resource from the specified endpoint by its ID.
   *
   * @param {string} [endpointName=''] - The optional name of the endpoint. If not provided, the base URL will be used.
   * @param {number|string} id - The unique identifier of the resource to delete.
   * @return {Observable<T>} An observable of the deleted resource or confirmation of deletion.
   */
  delete<T>(id: number | string, endpointName?: string):Observable<T> {
    const url = (endpointName !== '' && endpointName !== null && endpointName !== undefined)
      ? `${this.baseUrl}/${endpointName}/${id}`
      : `${this.baseUrl}/${id}`;

    return this.httpClient.delete<T>(url).pipe(catchError(this.handleError));
  }

  /**
   * Sends an HTTP POST request to create a resource.
   *
   * @param {U} request - The request body to be sent.
   * @param {string} [endpointName] - Optional endpoint name to append to the base URL.
   * @return {Observable<T>} An observable of the HTTP response containing the created resource.
   */
  create<T, U>(request: U, endpointName?: string):Observable<T> {
    const url = endpointName !== '' && endpointName !== undefined && endpointName !== null ? `${this.baseUrl}/${endpointName}` : `${this.baseUrl}`
    return this.httpClient.post<T>(url, request).pipe(catchError(this.handleError));
  }

  /**
   * Sends an HTTP PUT request to update a resource at a specified endpoint.
   *
   * @param {U} request - The data to be sent in the body of the request.
   * @param {string} [endpointName=''] - The name of the endpoint to update. Defaults to an empty string, which uses the base URL.
   * @return {Observable<T>} - An observable that emits the response of the updated resource.
   */
  update<T, U>(request: U, endpointName: string= ''):Observable<T> {
    const url = endpointName !== '' && endpointName !== null && endpointName !== undefined ? `${this.baseUrl}/${endpointName}` : `${this.baseUrl}`
    return this.httpClient.put<T>(url, request).pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Service Base - Error en la llamada API:', error);
    return throwError(() => error);
  }
}
