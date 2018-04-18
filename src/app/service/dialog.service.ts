import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Dialog} from '../dynamic/dialog/Dialog.component';
@Injectable()
export class DialogService {
    constructor(public dialog: MatDialog) { }
    openDialog(title,data?){
        let dialogRef = this.dialog.open(Dialog, {
            width: '450px',
            data: {title : title,data : data},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log(result);
          });  
    }
}