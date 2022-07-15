import { Component ,OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD';
  displayedColumns:string[]=["productName","category","freshness","price","comment","date", "action"];

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  constructor(private dialog:MatDialog, private api:ApiService){


  }
  ngOnInit():void{
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
       width:'40%',
       
    }).afterClosed().subscribe(val=>{
       
      if(val==='Save'){
        this.getAllProducts();
      }
    }
      
      )
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{ this.dataSource=new MatTableDataSource(res) ;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
      error:(err)=>{
        console.log("Error while Fectching List");
      }
    })
    

  }

  editProduct(row: any){
this.dialog.open(DialogComponent,{
width:'30%',
data:row
}).afterClosed().subscribe(val=>{
 
  if(val==='Update'){
    this.getAllProducts();
  }
})
}
deleteProduct(id:number){
  
  this.api.deleteProduct(id)
     
  .subscribe({
    next:(res)=>{
      alert('Product deleted sucessfully.');
      this.getAllProducts();
    },
      error:(err)=>{
        console.log("Error while delete.");
      }
  })
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
