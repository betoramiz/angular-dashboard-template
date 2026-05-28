# Service & REST API Patterns

This document details the architectural design patterns, conventions, and practices utilized for Angular services. Follow these guidelines when creating or refactoring services in the codebase.

---

## 1. Directory Structure for Services

Services are organized based on their scope of usage:

### A. Shared / Infrastructure Services
Common services used across multiple features (e.g. authentication, theme-switching, global notifications, modal dialog trigger services) are located under `@shared/services/`.
```
src/app/shared/services/
├── base-service.ts
├── modal-service.ts
└── theme.service.ts
```

### B. Feature-Specific Services
Services that deal specifically with a single feature module are kept under their respective feature directories inside `src/app/dashboard-features/<feature-name>/`.
```
src/app/dashboard-features/forms/
├── form-service.ts          # Feature-specific REST service
├── components/
└── forms.ts
```

---

## 2. CRUD Operations with `BaseService`

When extending `BaseService`, the service inherits standard asynchronous HTTP methods. You can call these directly from components or inside custom methods:

```typescript
// Inside a component
private readonly userService = inject(FormService);

loadUsers() {
  this.userService.getListOf<User>().subscribe({
    next: (users) => this.usersList.set(users),
    error: (err) => this.notificationService.showError('Failed to load users')
  });
}
```

---

## 3. Extending Service URLs & Custom Endpoints

### URL Construction Helpers (`BaseService`):
1. **Base URL Getter**: The internal member is named `_baseUrl` (the old typo `baseUlr` is fully resolved). You can access the configured base URL via the protected getter `this.baseUrl`.
2. **Safe URL Construction**: Instead of manual string manipulation or concatenation, use the inherited `buildUrl(endpointName?, id?)` helper. This method generates clean URLs, preventing double-slash issues or nullability bugs:
   - `this.buildUrl('active')` -> `${this.baseUrl}/active`
   - `this.buildUrl(undefined, id)` -> `${this.baseUrl}/${id}`
   - `this.buildUrl(`${id}/status`)` -> `${this.baseUrl}/${id}/status`

```typescript
import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor() {
    super('users');
  }

  // Passing the sub-endpoint name to standard methods:
  getActiveUsers(): Observable<User[]> {
    // This will fetch from: `${this.baseUrl}/active`
    return this.getListOf<User>('active');
  }

  // Writing a completely custom HTTP request using buildUrl:
  updateUserStatus(id: string, active: boolean): Observable<void> {
    const url = this.buildUrl(`${id}/status`);
    return this.httpClient.patch<void>(url, { active });
  }
}
```

---

## 4. RxJS Best Practices in Services

- **Keep Subscriptions Out of Services**: Services should return `Observable<T>` streams. Never call `.subscribe()` inside the service itself unless you are doing local state buffering/caching. Let facades or components subscribe to the returned Observables.
- **Error Handling**: Standard REST errors are globally captured by the inherited `catchError(this.handleError)` handler in `BaseService`. If you write custom fetch/patch/post methods, always add `catchError(this.handleError)` to ensure error tracking and formatting:
```typescript
import { catchError } from 'rxjs/operators';

customCall() {
  const url = this.buildUrl('custom');
  return this.httpClient.get(url).pipe(
    catchError(this.handleError) // Reuses standard error reporting
  );
}
```

