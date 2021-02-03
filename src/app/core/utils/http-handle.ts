import { HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';

export function HandleHttpResponseError(error: HttpErrorResponse) {
    return throwError(`Mi mensaje de error: ${error.message}`);
}
