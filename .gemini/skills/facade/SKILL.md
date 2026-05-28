---
name: angular-facade
description: Build or refactor Angular feature facades for this project. Use when adding component-scoped state controllers, orchestrating Angular service calls, managing signals for UI state, handling RxJS pipelines, or using takeUntilDestroyed with feature lifecycle cleanup.
---

# Angular Facades

Facades are feature-local state controllers between components and REST services. They own UI state, orchestration, and internal subscriptions.

## Core Rules

- Decorate facades with `@Injectable()` only; do not use `providedIn: 'root'`.
- Provide the facade in the owning component's `providers` array.
- Use `signal()` for UI state such as `actionStatus`, `errorMessage`, lists, selected item, filters, and pagination.
- Keep service classes stateless and let the facade coordinate multi-step flows.
- Use `takeUntilDestroyed(this.destroyRef)` for internal subscriptions.
- Return `Observable<T>` when the caller should decide when to subscribe; subscribe internally only for self-contained commands.
- Centralize repeated error handling in a private helper that updates facade state and returns `throwError`.

```typescript
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { ActionStatus } from '@shared/models/types';
import { UserService } from './user-service';
import { UserDto, UserFormValue } from './models/user-models';

@Injectable()
export class UserFacade {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  actionStatus = signal<ActionStatus>('idle');
  errorMessage = signal<string>('');
  users = signal<UserDto[]>([]);

  loadUsers(): Observable<UserDto[]> {
    this.actionStatus.set('loading');

    return this.userService.getActiveUsers().pipe(
      tap((users) => {
        this.users.set(users);
        this.actionStatus.set('success');
      }),
      catchError((error) => this.handleError(error)),
    );
  }

  createUser(value: UserFormValue): void {
    this.actionStatus.set('loading');

    this.userService
      .create<UserDto, UserFormValue>(value)
      .pipe(
        switchMap(() => this.userService.getActiveUsers()),
        tap((users) => {
          this.users.set(users);
          this.actionStatus.set('success');
        }),
        catchError((error) => this.handleError(error)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private handleError(error: Error): Observable<never> {
    this.actionStatus.set('error');
    this.errorMessage.set(error.message || 'An error occurred');
    return throwError(() => error);
  }
}
```

Read [references/facade-patterns.md](references/facade-patterns.md) for full facade/component integration and RxJS orchestration examples.
