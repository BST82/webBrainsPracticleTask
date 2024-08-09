import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
   data:any[]=[];
   currentData:any = null ;
   newData:any = {name:'',email:'',password:'',address:''};
   editBlog = false;

   constructor(private blogservice:DataService){}

   ngOnInit(){
    this.loadBlog();
   }


   // read and load data function
   loadBlog(){
    this.blogservice.getBlog().subscribe((dataCollection)=>{
      this.data=dataCollection;
    })
   }

   //inseert data in database
   addData(){
    if(this.newData.name && this.newData.email && this.newData.password && this.newData.address){
      this.blogservice.addBlog(this.newData).subscribe((dataCollection)=>{
        this.data.push(dataCollection);
        this.newData = {name:'',email:'',password:'',address:''};
      })
    }
   }

   //edit the table 
   editData(editblogdata:any){
this.editBlog=true;
this.currentData={...editblogdata}
   }

   //  update data from database 
   updateData(){
 if(this.currentData){
  this.blogservice.updateBlog(this.currentData._id, this.currentData).subscribe((updateData)=>{
   const index = this.data.findIndex((i)=>i._id===updateData._id)
   if(index!==-1){
    this.data[index]=updateData;
   }
   this.currentData=null;
  })
 }
   }


  //delete user from databse
  deleteData(id:string){
this.blogservice.deleteBlog(id).subscribe(()=>{
  this.data=this.data.filter((i)=>{i._id!==id});
})
  }

}
