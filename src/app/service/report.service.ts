import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class ReportService {    
    private missionAnnouncedSource = new Subject<string>();
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    constructor() {    
    }
    announceMission(mission: string) {
        this.missionAnnouncedSource.next(mission);
    }
}