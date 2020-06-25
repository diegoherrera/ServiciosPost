import { Component, OnInit } from '@angular/core';
import { MyservicioService } from './myservicio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from './books';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'servicio00';
  libros: any[];
  bookForm: FormGroup;
  

  AllCategory = [
    new Category('Drama', 'Drama'),
    new Category('Comedia', 'Comedia'),
    new Category('Acción', 'Acción'),
    new Category('Documental', 'Documental')
  ]


  constructor(private myservicioService: MyservicioService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getWriterWithFavBooks();
    this.initialForm();
  }

  initialForm() {
    this.bookForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      year: new FormControl(0, Validators.required),
      category: new FormControl(null, [Validators.required])
    });
  }

  onFormSubmit() {
    console.log(this.bookForm);
    console.log('Nombre:' + this.bookForm.get('name').value);
    console.log('Año :' + this.bookForm.get('year').value);
    console.log('Categoria:' + this.bookForm.get('category').value);
    let profile: Category = this.bookForm.get('category').value;
    console.log('Id: ' + profile.prName);
    console.log('Detalle: ' + profile.prId);

    let request = { 
      id: this.bookForm.get('id').value,
      name: this.bookForm.get('name').value
      , year:this.bookForm.get('year').value
      , category: profile.prId 
    };

    this.myservicioService.postWriterWithFavBooks(request).subscribe(
      data => {
        console.log(data);
        this.getWriterWithFavBooks();
        this.bookForm.reset({ name: '', year: '', id: '', category: '' });
      },
      (err: HttpErrorResponse) => {
        //si es un error de aplicacion
        if (err.error instanceof Error) {
          console.log('Error de aplicacion :', err.error.message);
        } else {
        // si es respuesta no valida del servicio
          console.log('Respuesta estado : ', err.status);
          console.log('Respuesta body:', err.error);
        }
      }

    );


  }

  getWriterWithFavBooks() {
    this.myservicioService.getWriterWithFavBooks().subscribe(
      data => {
        console.log(data);
        this.libros = data;
      },
      (err: HttpErrorResponse) => {
        //si es un error de aplicacion
        if (err.error instanceof Error) {
          console.log('Error de aplicacion :', err.error.message);
        } else {
        // si es respuesta no valida del servicio
          console.log('Respuesta estado : ', err.status);
          console.log('Respuesta body:', err.error);
        }
      }

    );
  }


}
