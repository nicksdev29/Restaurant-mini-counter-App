import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import items from '../../models/table-items.json';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  menuColumns: string[] = [
    'index',
    'name',
    'category',
    'price',
    'description',
    'image',
    'ID'
  ];

  menuDataSource: MatTableDataSource<any> = new MatTableDataSource( JSON.parse( JSON.stringify( items ) ) );

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuDataSource = new MatTableDataSource( JSON.parse( JSON.stringify( items ) ) );
  }

  loadAllMenuItems() {
    this.menuService.getAllMenuItems().subscribe( (res) => {
      console.log('response: ', res);
    })
  }

  addNewMenu() {}
  deleteMenu() {}
  editMenu() {}
}
