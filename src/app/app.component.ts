import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { BlogsComponent } from "./components/blogs/blogs.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BlogsComponent,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularTest';
}
