import { Component, OnInit } from '@angular/core';
import { FileService } from '../../utils/file.service';
import { WebService } from '../../services/web.service';
import { Base } from '../../base/Base';


@Component({
  selector: 'app-direct-link',
  templateUrl: './direct-link.component.html',
  styleUrl: './direct-link.component.css',
})
export class DirectLinkComponent extends Base implements OnInit {

  

  constructor(
    protected override webService: WebService, 
    protected override fileService: FileService 
  ) {
    super(webService, fileService);
  }

  ngOnInit(): void {}


  
}
