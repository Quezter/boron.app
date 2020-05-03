import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabsDataService {
    private indexSource = new BehaviorSubject(0);
    public currentIndex = this.indexSource.asObservable();

    constructor() { }

    changeIndex(index: number) {
        console.log('<<<CHANGE TAB INDEX>>>')
        this.indexSource.next(index)
    }
}
