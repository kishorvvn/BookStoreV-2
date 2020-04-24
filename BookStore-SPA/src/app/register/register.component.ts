import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter(); // from child to parent component. output emitts event
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(() => { // empty parenthesis to indicate success
      console.log('Registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false); // emitted for output property
    console.log('Cancelled');
  }
}
