import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl
  implements OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'of';

  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'PAGINATOR.ITEMS_PER_PAGE',
        'PAGINATOR.NEXT_PAGE',
        'PAGINATOR.PREVIOUS_PAGE',
        'PAGINATOR.OF_LABEL',
        'PAGINATOR.LAST_PAGE',
        'PAGINATOR.FIRST_PAGE'
      ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((translation: { [x: string]: string; }) => {
        this.itemsPerPageLabel = 'Всего записей'
          translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.nextPageLabel = 'Следующая'
        translation['PAGINATOR.NEXT_PAGE'];
        this.previousPageLabel = 'Предыдущая'
          translation['PAGINATOR.PREVIOUS_PAGE'];
        this.OF_LABEL = 'из'
        translation['PAGINATOR.OF_LABEL'];
        this.firstPageLabel = 'Первая'
          translation['PAGINATOR.FIRST_PAGE'];
        this.lastPageLabel = 'Последняя'
          translation['PAGINATOR.LAST_PAGE'];
        this.itemsPerPageLabel = 'Всего записей'
          translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.changes.next();
      });
  }

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.OF_LABEL
    } ${length}`;
  };
}
