/**
 * PLEASE BE MIND THAT YOU COULD NOT COPY, MODIFY OR SHARE THIS PROJECT IF YOU ARE NOT GET PERMISSION.
 * @samjayhk
 */


import {  Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { RestService } from '../service';
import { ActivatedRoute, Router } from '@angular/router';
import { UniService } from '../uni.services';
import { faUser, faCalendarDay, faPassport, faCommentAlt, faTag } from '@fortawesome/free-solid-svg-icons'
import { isUndefined } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  page = this.actRoute.snapshot.params['page'];
  tid = this.actRoute.snapshot.params['tid'];

  faTag = faTag;
  faComment = faCommentAlt;
  faUser = faUser;
  faCalendarDay = faCalendarDay;
  session:boolean;
  localSession:string;

  tags: any;
  threadList: any;

  currentTags = 0;
  _subscriptionViewPage1;
  _subscriptionViewPage2;

  constructor(private location: Location, public rest:RestService, public uni: UniService, public actRoute: ActivatedRoute, public router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (uni.pageViewChange2.observers.length === 0) {
      this._subscriptionViewPage1 = uni.pageViewChange2.subscribe((value) => {
          this.page = value;
          if (this.currentTags === 0) {
            this.getThreadList();
          } else {
            this.getThreadListWithTags(this.currentTags, value)
          }
      });
    }
    if (uni.listViewRefreshChange.observers.length === 0) {
      this._subscriptionViewPage2 = uni.listViewRefreshChange.subscribe((value) => {
        if (value) {
          if (this.currentTags === 0) {
            this.getThreadList();
          } else {
            this.getThreadListWithTags(this.currentTags, this.page)
            
          }
          this.uni.setListViewRefreshChange(false)
        }
        
      });
    }
  }

  ngOnDestroy() {
    this._subscriptionViewPage1.unsubscribe();
    this._subscriptionViewPage2.unsubscribe();
  }


  ngOnInit() {
    this.uni.setCurrentViewPage(this.page)
    this.loadSession();
    this.getTags();
    if (this.tid === undefined) {
      this.getThreadList();
    } else {
      this.getThreadListWithTags(this.tid, this.page)
    }
  }

  loadSession() {
    if (localStorage.getItem('traveldiaryv1')) {
      this.session = true;
      this.localSession = JSON.parse(localStorage.getItem('traveldiaryv1'));
    } else {
      localStorage.removeItem('traveldiaryv1');
      this.session = false;
    }
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  public getTags() {
    return this.rest.getTags().subscribe(
      tags => {
        this.tags = tags;
      }
    );
  }

  public getThreadList() {
    return this.rest.getThreadList(this.page, 0).subscribe(
      threadList => {
        if (threadList.result) {
          this.threadList = threadList.thread;
          this.uni.setCurrentPageRangeChange(threadList.sum);
        } else {
          this.threadList = null
          this.uni.setCurrentPageRangeChange(1);
        }
      }
    );
  }

  public getThreadListWithTags(tags, page) {
    return this.rest.getThreadList(page, tags).subscribe(
      threadList => {
        console.log(threadList)
        if (threadList.result) {
          this.threadList = threadList.thread;
          this.uni.setCurrentPageRangeChange(threadList.sum);
        } else {
          this.threadList = null
          this.uni.setCurrentPageRangeChange(1);
        }
      }
    );
  }

  public chageDefaultTags() {
    this.currentTags = 0;
    this.location.go( 'thread/1' );
    this.getThreadListWithTags(0, 1);
    this.uni.setCurrentTagsChange(0);
  }

  public chageTags(tid, page) {
    this.currentTags = tid;
    this.location.go('thread/tag/' + tid + '/' + page)
    this.uni.setCurrentViewPage(page)
    this.getThreadListWithTags(tid, page);
    this.uni.setCurrentTagsChange(tid);
  }

  public dateDiff(time) {
    // time difference
    const cal = Math.abs(Date.now() - time);
    const minsDiff = Math.ceil(cal / (1000 * 60))
    const hoursDiff = Math.ceil(cal / (1000 * 3600))
    // days difference
    const diffDays = Math.ceil(cal / (1000 * 3600 * 24));

    if (minsDiff-1 < 60) {
      return minsDiff-1 + "m";
    } else if (hoursDiff-1 < 24) {
      return hoursDiff-1 + "h";
    } else if (diffDays-1 < 30) {
      return diffDays-1 + "d";
    } else {
      return (diffDays-1/30) + "m";
    }
  }

  public ascii2native(str) {
      var character = str.split("\\u");
      var native = character[0];
      for (var i = 1; i < character.length; i++) {
          var code = character[i];
          native += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
          if (code.length > 4) {
              native += code.substring(4, code.length);
          }
      };
      return native;
  }
  
  arr(number) {
    var i:number; 
    var arrys = [];
    for(i = 0; i<number; i++) {
      arrys.push(i)
    }
    return arrys;
  }

  viewThread(pid, page) {
    this.router.navigate(['thread/' + pid + '/' + page])
  }
}
