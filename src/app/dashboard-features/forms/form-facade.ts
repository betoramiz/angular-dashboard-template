import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FormService } from './form-service';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { ActionStatus } from '@shared/models/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class FormFacade {
  private readonly formService: FormService = inject(FormService);
  private readonly destroyRef = inject(DestroyRef);

  actionStatus = signal<ActionStatus>('idle');
  errorMessage = signal<string>('');

  items = signal<string[]>([]);

  getAllItems(): Observable<string[]> {
    this.actionStatus.set('loading');

    return this.formService
      .getListOf<string>('list')
      .pipe(
        tap(() => this.actionStatus.set('success')),
        catchError(error => this.handleError(error))
      );
  }

  createItem(): void {
    this.actionStatus.set('loading');

    this.formService
      .create({name: 'test', email: ''})
      .pipe(
        switchMap(() => this.formService.getListOf<string>('list')),
        tap(() => this.actionStatus.set('success')),
        catchError(error => this.handleError(error)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  clearStatus(): void {
    this.actionStatus.set('idle');
    this.errorMessage.set('');
  }

  private handleError(error: any): Observable<never> {
    this.actionStatus.set('error');
    this.errorMessage.set(error.message);
    return throwError(() => error);
  }
}
