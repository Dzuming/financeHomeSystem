import { Directive, OnInit } from '@angular/core';

@Directive({
    selector: '[appTableSort]'
})
export class TableSortDirective implements OnInit {

    constructor() { }
    ngOnInit() {
        this.tableSort();
    }
    private tableSort(): void {
        const table = document.querySelector('.table'),
            thead = table.querySelectorAll('thead'),
            tr = [].slice.call(thead[0].rows, 0),
            th = [].slice.call(tr[0].cells, 0);
        let isClicked;
        th.map((element: HTMLTableCellElement): void => {
            element.addEventListener('click', () => {
                if (element.cellIndex >= th.length - 1) {
                    return 0;
                } else {
                    isClicked = isClicked === false ? true : false;
                    this.sorting(table, element.cellIndex, isClicked);
                }
            }, true);
        });
    }
    sorting(table: NodeSelector, index: number, reverse: boolean): void {
        const tbody = table.querySelectorAll('tbody');
        const tr = [].slice.call(tbody[0].rows);
        const test = tr.sort((a, b) => {
            if (!isNaN(parseFloat(a.cells[index].textContent))) {
                return parseFloat(a.cells[index].textContent) - parseFloat(b.cells[index].textContent);
            }
            if (a.cells[index].textContent.trim() < b.cells[index].textContent.trim()) {
                return -1;
            }
            if (a.cells[index].textContent.trim() > b.cells[index].textContent.trim()) {
                return 1;
            }
            return 0;
        });
        if (reverse) {
            tr.reverse();
        }
        for (let i = 0; i < tr.length; ++i) {
            tbody[0].appendChild(tr[i]);
        }
    }
}
