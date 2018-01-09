import { ChangeEvent } from 'angular2-virtual-scroll';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import {Gallery} from '../../../shared/model/gallery.model';

@Component({
  selector: 'app-galleries-list-scroller',
  templateUrl: './galleries-list-scroller.component.html',
  styleUrls: ['./galleries-list-scroller.component.scss']
})
export class GalleriesListScrollerComponent implements OnChanges {

  @Input()
  items: Gallery[];
  scrollItems: Gallery[];

  indices: ChangeEvent;
  buffer: Gallery[] = [];
  readonly bufferSize: number = 10;
  timer;
  loading: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  reset() {
    this.fetchNextChunk(0, this.bufferSize, {}).then(chunk => this.buffer = chunk);
  }

  fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.fetchNextChunk(this.buffer.length, this.bufferSize, event).then(chunk => {
        this.buffer = this.buffer.concat(chunk);
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  fetchNextChunk(skip: number, limit: number, event?: any): Promise<Gallery[]> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (skip < this.items.length) {
          return resolve(this.items.slice(skip, skip + limit));
        }
        reject();
      }, 1000 + Math.random() * 1000);
    });
  }
  deleteResource(id: number) {
    this.scrollItems.splice(id,1);
    this.items.splice(id,1);
    this.reset();
    console.log(id);
    console.log("click");
  }


}
