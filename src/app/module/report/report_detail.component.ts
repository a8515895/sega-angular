import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { Subject }    from 'rxjs';
import { ReportService } from '../../service/report.service';
import { FunctionService } from '../../service/function.service';
import { Chart } from 'angular-highcharts';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
    selector: 'reportDetail',
    templateUrl: 'report_detail.component.html'
})

export class ReportDetailComponent implements OnInit {
    @Input() parentSubject:Subject<any>;
    href: any;
    time: any;
    chart : any;
    chart2 : any;
    table : any;
    isLoading : boolean = true;
    displayedColumns = ['id','customer','requester','status','address','total','create_at','payment_at'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public showSpanName = true;
    dataSource: MatTableDataSource<any>;
    constructor(private rp : ReportService,private fs : FunctionService) { }
    ngOnInit() {
        this.parentSubject.subscribe(event => {            
            this.href = event.href;
            this.time = event.time;            
            this.getData();
        });
    }
    getChart(category,total){
        this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: category
            },    
            yAxis: {
                title: null,
            },
            credits: {
                enabled: false
            },
            legend : {
                enabled : false,
            },
            series: [
                {
                    name : "Giờ",
                    data: total,
                }
            ]
        });
    }
    getTable(){
        this.dataSource = new MatTableDataSource(this.table);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    getData(){
        this.isLoading = true; 
        let category;
        let total = [];
        switch(this.href){
            case "doanhthu" :
                this.rp.getDoanhThu({time : this.time}).then(res=>{
                    category = res.category;
                    Object.keys(res.bill).forEach((e)=>{
                        total.push(Number(res.bill[e])-Number(res.import[e]));
                    })
                    this.getChart(category,total);
                    this.table = null;
                    this.isLoading = false;
                })
            break;
            case "bill" :
                this.rp.getBill({time : this.time}).then(res=>{
                    category = res.category;
                    Object.keys(res.bill).forEach((e)=>{
                        total.push(Number(res.bill[e]));
                    })
                    this.getChart(category,total);
                    this.table = res.listBill;
                    this.getTable();
                    this.isLoading = false;
                })
            break;
            case "import" :
                this.rp.getImport({time : this.time}).then(res=>{
                    category = res.category;
                    Object.keys(res.import).forEach((e)=>{
                        total.push(Number(res.import[e]));
                    })
                    this.getChart(category,total);
                    this.table = res.listImport;
                    console.log(this.table);
                    this.getTable();
                    this.isLoading = false;
                })
            break;
            case "product" :
                this.rp.getProduct({time : this.time}).then(res=>{
                    let bill_category = [];
                    let bill_total = [];
                    let bill_qty = [];
                    let import_category = [];
                    let import_total = [];
                    let import_qty = [];
                    res.bill.forEach((e)=>{
                        bill_category.push(e.name);
                        bill_total.push(Number(e.total));
                        bill_qty.push(Number(e.qty));
                    });
                    this.chart = new Chart({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: "Sản phẩm đã bán"
                        },
                        xAxis: {
                            categories: bill_category
                        },
                        yAxis: [{
                            min: 0,
                            title: {
                                text: 'Giá trị (VND)',                    
                            }
                        }, {
                            title: {
                                text: 'Số lượng'
                            },
                            opposite: true
                        }],
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            shared: true
                        },
                        plotOptions: {
                            bar: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled : true,
                                }
                            }
                        },
                        series: [{
                            name: 'Số lượng',
                            color: 'rgba(165,170,217,1)',
                            data: bill_qty,
                            yAxis: 1
                        }, {
                            name: 'Tổng tiền',
                            color: 'rgba(126,86,134,.9)',
                            data: bill_total,
                        }]
                    });
                    res.import.forEach((e)=>{
                        import_category.push(e.name);
                        import_total.push(Number(e.total));
                        import_qty.push(Number(e.qty));
                    });
                    this.chart2 = new Chart({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: "Sản phẩm đã nhập"
                        },
                        xAxis: {
                            categories: import_category
                        },
                        yAxis: [{
                            min: 0,
                            title: {
                                text: 'Giá trị (VND)',                    
                            }
                        }, {
                            title: {
                                text: 'Số lượng'
                            },
                            opposite: true
                        }],
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            shared: true
                        },
                        plotOptions: {
                            bar: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled : true,
                                }
                            }
                        },
                        series: [{
                            name: 'Số lượng',
                            color: 'rgba(165,170,217,1)',
                            data: import_qty,
                            yAxis: 1
                        }, {
                            name: 'Tổng tiền',
                            color: 'rgba(126,86,134,.9)',
                            data: import_total,
                        }]
                    });
                    this.table = null;
                    this.isLoading = false;
                })
            break;
        }                   
    }
}