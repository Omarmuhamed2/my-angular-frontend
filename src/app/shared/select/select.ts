import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../products/service/products-service';

@Component({
   standalone: false,
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrls: ['./select.css']
})
export class Select implements OnInit {
  
 

  constructor(private prdservice: ProductsService) {}

  ngOnInit(): void {
    
  }

  
}
