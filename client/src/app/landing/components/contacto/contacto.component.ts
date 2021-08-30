
import { Component, OnInit } from '@angular/core';
import { ContactFormService } from 'src/app/core/services/contacto/contact-form.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(
    private contactFormService:ContactFormService) {

  }

  ngOnInit(): void {

  }

  public sendMessage(event:any) {

    event.preventDefault();
    let form= event.target.form;

    this.contactFormService.createMessage({

      "name": form.name.value,
      "email": form.email.value,
      "celular": form.number.value,
      "message": form.message.value

    }).subscribe( response => {

      form.title.value = "";
      form.name.value = "";
      form.email.value = "";
      form.number.value = "";
      form.message.value = "";
      alert( "Registro exitoso!" );

    })

  }

}
