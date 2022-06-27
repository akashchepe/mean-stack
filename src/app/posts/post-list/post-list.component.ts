import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import * as sorter from 'sort-nested-json';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  newList =[];
  lastlySortTenor = '';
  sortingFlag = 0;
  bankNameSortingFlag = 0;
  list = [
    {
      'bankCode': 'ABCD',
      '1W': '0.14',
      '1M': '0.14',
      '3M': '-2.14',
      '6M': '0.14',
      '12M': '-0.14',
      'tenorData': [
        {
          'tenorName': '1W',
          'bankRate': '0.14'
        },
        {
          'tenorName': '1M',
          'bankRate': '1.14'
        },
        {
          'tenorName': '3M',
          'bankRate': '-2.14'
        },
        {
          'tenorName': '6M',
          'bankRate': '0.14'
        },
        {
          'tenorName': '12M',
          'bankRate': '-0.14'
        }
      ]
    },
    {
      'bankCode': 'CGD',
      '1W': '7.14',
      '1M': '3.14',
      '3M': '-3.14',
      '6M': '-1.14',
      '12M': '7.14',
      'tenorData': [
        {
          'tenorName': '1W',
          'bankRate': '7.14',
        },
        {
          'tenorName': '1M',
          'bankRate': '3.14'
        },
        {
          'tenorName': '3M',
          'bankRate': '-3.14'
        },
        {
          'tenorName': '6M',
          'bankRate': '-1.14'
        },
        {
          'tenorName': '12M',
          'bankRate': '7.14'
        }
      ]
    },
    {
      'bankCode': 'INSP',
      '1W': '0.14',
      '1M': 'l3req',
      '3M': '0.44',
      '6M': '-6.14',
      '12M': '4.74',
      'tenorData': [
        {
          'tenorName': '1W',
          'bankRate': '0.14'
        },
        {
          'tenorName': '1M',
          'bankRate': 'l3req'
        },
        {
          'tenorName': '3M',
          'bankRate': '0.44'
        },
        {
          'tenorName': '6M',
          'bankRate': '-6.14'
        },
        {
          'tenorName': '12M',
          'bankRate': '4.74'
        }
      ]
    },
    {
      'bankCode': 'QWER',
      '1W': '2.14',
      '1M': '3.14',
      '3M': '-',
      '6M': '0.14',
      '12M': '9.74',
      'tenorData': [
        {
          'tenorName': '1W',
          'bankRate': '2.14'
        },
        {
          'tenorName': '1M',
          'bankRate': '3.14'
        },
        {
          'tenorName': '3M',
          'bankRate': '-'
        },
        {
          'tenorName': '6M',
          'bankRate': '0.14'
        },
        {
          'tenorName': '12M',
          'bankRate': '9.74'
        }
      ]
    },
    {
      'bankCode': 'BELF',
      '1W': '2.14',
      '1M': '-',
      '3M': 'l3req',
      '6M': '3.14',
      '12M': '6.74',
      'tenorData': [
        {
          'tenorName': '1W',
          'bankRate': '2.14'
        },
        {
          'tenorName': '1M',
          'bankRate': '-'
        },
        {
          'tenorName': '3M',
          'bankRate': 'l3req'
        },
        {
          'tenorName': '6M',
          'bankRate': '3.14'
        },
        {
          'tenorName': '12M',
          'bankRate': '6.74'
        }
      ]
    },
  ]
  
  // list = [
  //   {
  //     id: 1,
  //     bankname: "CGD",
  //     tenorData: 
  //       {
  //         '1W':'1',
  //         '1M': '-0.15', 
  //         '3M': '2', 
  //         '6M': '-5.90', 
  //         '12M': '0.41'
  //       }
  //     ,
  //   },
  //   {
  //     id: 2,
  //     bankname: "ABCD",
  //     tenorData: 
  //       {
  //         '1W':'2',
  //         '1M': '3.15', 
  //         '3M': '-111.18', 
  //         '6M': '2.0', 
  //         '12M': '6.41'
  //       }
  //     ,
  //   },
  //   {
  //     id: 3,
  //     bankname: "INSP",
  //     tenorData: 
  //       {
  //         '1W': '3',
  //         '1M': '4.15', 
  //         '3M': '0', 
  //         '6M': '3.0', 
  //         '12M': '1.41'
  //       }
  //     ,
  //   },
  // ];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    // this.postService.getPosts();
    // this.postsSub = this.postService.getPostUpdateListner()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //   });
    this.sortAscDesc('1W');
    console.log(this.list);
  }

  sortAscDesc(tenor) {
    // this.newList = sorter.sort(this.list).desc('tenorData.'+tenor);
    // console.log(this.newList);
    if (this.lastlySortTenor !== tenor) {
      this.newList = sorter.sort(this.list).desc(tenor);
      this.sortingFlag = 0;
    } else {
      if(this.sortingFlag === 0) {
        this.newList = sorter.sort(this.list).asc(tenor);
        this.sortingFlag = 1;
      } else {
        this.newList = sorter.sort(this.list).desc(tenor);
        this.sortingFlag = 0;
      }
    }
    this.lastlySortTenor = tenor;
  }

  sortBankNameAscDesc() {
      if(this.bankNameSortingFlag === 0) {
        this.newList = sorter.sort(this.list).asc("bankCode");
        this.bankNameSortingFlag = 1;
      } else {
        this.newList = sorter.sort(this.list).desc("bankCode");
        this.bankNameSortingFlag = 0;
      }
    
  }


  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
function includes(arg0: string) {
  throw new Error('Function not implemented.');
}

