import { Component, OnInit, ViewChild, Output, EventEmitter,ElementRef } from '@angular/core';
import { ProductService } from '../../service/product.service';
import * as jQuery from 'jquery';
import "datatables.net";
@Component({
    selector: 'product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit {
    product : any;
    constructor(private ps : ProductService) { 

    }
    ngOnInit() { 
        this.ps.getProduct().then(
            res => {
                this.product = res
                console.log(res);
            },
            err => {
                console.log(err);
            }
        )
    }
}