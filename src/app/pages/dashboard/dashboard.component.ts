import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  data: any[] = []
  
  constructor(private webService: WebService){}

  ngOnInit(): void {
      this.data = this.webService.getItems()
  }

  remove(item: any){
    this.webService.handleItems('delete', item)

    this.data = this.data.filter(i => i.id != item.id)
  }
}
