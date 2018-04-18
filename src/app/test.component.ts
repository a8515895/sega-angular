import { Component } from '@angular/core';
import { ProductService } from './service/product.service';
@Component({
  selector: 'app-test',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class TestComponent {
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
