import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'Dialog.component.html',
  })
  export class Dialog {
    constructor(
      public dialogRef: MatDialogRef<Dialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }  
      onNoClick(): void {
        
        this.dialogRef.close();
      }
  
  }