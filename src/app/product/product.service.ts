import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

    constructor() { }
    public sorting(table, index, reverse) {
        let tbody = table.querySelectorAll('tbody');
        let tr = [].slice.call(tbody[0].rows);
        let test = tr.sort((a, b) => {
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
