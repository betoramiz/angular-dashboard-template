import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { BaseService } from './base-service';
import { ActionStatus } from '@shared/models/types';

export abstract class BaseCrudFacade {
  protected readonly destroyRef = inject(DestroyRef);

  readonly actionStatus = signal<ActionStatus>('idle');
  readonly errorMessage = signal<string>('');

  protected abstract readonly service: BaseService;

  /**
   * Ejecuta de forma segura cualquier flujo de consulta asíncrono,
   * controlando automáticamente las señales de estado y de error,
   * y garantizando la desuscripción automática al destruir el componente/servicio.
   */
  protected runQuery<R>(observable$: Observable<R>, onSuccess: (data: R) => void): void {
    this.setLoading();

    observable$
      .pipe(
        tap((data) => {
          onSuccess(data);
          this.setSuccess();
        }),
        catchError((error) => this.handleError(error)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /**
   * Crea un nuevo registro.
   * Retorna un Observable para que el componente pueda coordinar acciones de UI.
   */
  create<T, U>(body: U, endpointName: string = ''): Observable<T> {
    this.setLoading();

    return this.service
      .create<T, U>(body, endpointName)
      .pipe(
        tap(() => this.setSuccess()),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Actualiza un registro existente.
   * Retorna un Observable para que el componente pueda coordinar acciones de UI.
   */
  update<T, U>(id: string | number, body: U, endpointName: string = '', reloadListEndpoint?: string): Observable<T> {
    this.setLoading();

    return this.service
      .update<T, U>(body, id, endpointName)
      .pipe(
        tap(() => this.setSuccess()),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Elimina un registro.
   * Retorna un Observable para que el componente pueda coordinar acciones de UI.
   */
  delete<T>(id: string | number, endpointName: string = '', reloadListEndpoint?: string): Observable<T> {
    this.setLoading();

    return this.service
      .delete<T>(id, endpointName)
      .pipe(
        tap(() => this.setSuccess()),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Restablece los estados de acción y error.
   */
  clearStatus(): void {
    this.actionStatus.set('idle');
    this.errorMessage.set('');
  }

  // --- Helpers de estado interno ---

  protected setLoading(): void {
    this.actionStatus.set('loading');
    this.errorMessage.set('');
  }

  protected setSuccess(): void {
    this.actionStatus.set('success');
    this.errorMessage.set('');
  }

  protected handleError(error: any): Observable<never> {
    this.actionStatus.set('error');
    this.errorMessage.set(error?.message || 'Ha ocurrido un error inesperado');
    return throwError(() => error);
  }
}
