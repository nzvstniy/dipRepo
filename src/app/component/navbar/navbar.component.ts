import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'dipApp';
  url = "/assets/nav.js";
  private cookieValue: any;
  loadAPI:any;
  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });

  }
  public loadScript() {
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    document.getElementsByTagName("head")[0].appendChild(node);
}

}
