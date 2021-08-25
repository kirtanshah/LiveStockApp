import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  liveData = {};
  oldData = {};
  defaultDate = new Date().toLocaleString();
  constructor(private readonly service: WebsocketService) { }

  ngOnInit() {
    this.service.messages.subscribe(msg => {
      const currentData = JSON.parse(msg.data);
      this.oldData = Object.assign({}, this.liveData);
      this.map(currentData);
    });
  }

  private setDate(oldData, newData) {
    return new Date().toLocaleString();
  }

  private map = (array) => {
    var abc = array.reduce(
      (acc, curr) => {
        let key = curr[0];
        let value = curr[1];
        acc[key] = value;
        this.liveData = acc;
        return acc;
      },
      this.liveData
    );
  }
}
