import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MzToastService]
})
export class AdminComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mzToast: MzToastService
  ) { }

  showToast(toastMessage) {
    this.mzToast.show(toastMessage, 4000, 'blue');
  }

  ngOnInit() {
    const { toastMessage } = this.route.snapshot.queryParams;
    const toaster = toastMessage ? this.showToast(toastMessage) : null;
  }

}
