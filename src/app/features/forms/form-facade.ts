import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseCrudFacade } from '@shared/services/base-crud-facade';
import { FormService } from './form-service';

@Injectable()
export class FormFacade extends BaseCrudFacade {
  protected readonly service = inject(FormService);
  activeItems = signal<string[]>([]);

  getAllItems(): void {
    this.runQuery(
      this.service.getListOf<string>('list'),
      (users) => this.activeItems.set(users)
    );
  }

  createAndRefresh(body: string): void {
    const creteItem$ = this.service.create<string, string>(body, 'test')
      .pipe(
        switchMap(() => this.service.getListOf<string>('list'))
      );

    this.runQuery(creteItem$, (users) => this.activeItems.set(users));
  }
}

